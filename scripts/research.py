"""Refresh bundled metadata and original assets without replacing project branding."""
import urllib.request, json, pathlib, concurrent.futures, re, datetime, sys, subprocess, shutil, hashlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'assets'
snapshot = json.loads((ASSETS / 'github-snapshot.json').read_text())
sources = json.loads((ASSETS / 'asset-sources.json').read_text())
icons = json.loads((ASSETS / 'official-icons.json').read_text())
def request(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'OpenStore-research'}), timeout=30).read()
def api(repo):
    if shutil.which('gh'):
        result = subprocess.run(['gh', 'api', 'repos/' + repo], capture_output=True, text=True)
        if result.returncode == 0:
            return json.loads(result.stdout)
    return json.loads(request('https://api.github.com/repos/' + repo))
if '--refresh-metadata' in sys.argv:
    keys = ['full_name','html_url','description','homepage','stargazers_count','forks_count','license','pushed_at','created_at','default_branch','topics','archived']
    failures = []
    def refresh(repo):
        try:
            data = api(repo)
            return repo, {key: data.get(key) for key in keys}
        except Exception as error:
            failures.append(repo)
            print('Retaining previous snapshot:', repo, str(error))
            return repo, snapshot['repositories'][repo]
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        snapshot['repositories'] = dict(pool.map(refresh, snapshot['repositories']))
    if not failures:
        snapshot['fetchedAt'] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    (ASSETS / 'github-snapshot.json').write_text(json.dumps(snapshot, indent=2))
# Only download assets used by the app. Sources stay attached to their original project.
required = set(icon['file'] for icon in icons.values())
for file, record in sources.items():
    if '-screen.' in file or file in ['openobserve-logs.png','speedtest-screen.png','webui-screen.png']:
        if not record.get('error'):
            required.add(file)
def download(file):
    record = sources[file]
    try:
        content = request(record['source'])
        valid = (content.startswith(b'\x89PNG') or content.startswith(b'\xff\xd8') or content.startswith(b'GIF') or content.startswith(b'RIFF') or content.startswith(b'\x00\x00\x01\x00') or b'<svg' in content)
        if not valid:
            raise ValueError('Source returned no image; retaining the existing asset')
        (ASSETS / file).write_bytes(content)
        record.pop('error', None)
        record.update(bytes=len(content), sha256=hashlib.sha256(content).hexdigest())
        return file, record
    except Exception as error:
        print('Retaining existing asset:', file, str(error))
        return file, record
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    sources.update(dict(pool.map(download, sorted(required))))
for icon in icons.values():
    icon.update(bytes=sources[icon['file']]['bytes'], sha256=hashlib.sha256((ASSETS / icon['file']).read_bytes()).hexdigest())
(ASSETS / 'official-icons.json').write_text(json.dumps(icons, indent=2))
(ASSETS / 'asset-sources.json').write_text(json.dumps(sources, indent=2))
if '--refresh-trending' in sys.argv:
    try:
        html = request('https://github.com/trending?since=weekly').decode()
        trending = []
        for article in re.findall(r'<article\b.*?</article>', html, re.S):
            match = re.search(r'<h2.*?href="/([^"?]+)"', article, re.S)
            growth = re.search(r'([\d,]+) stars this week', article)
            if match:
                trending.append({'repo': match.group(1), 'weeklyStars': int(growth.group(1).replace(',', '')) if growth else None})
        if not trending:
            raise ValueError('No observed repositories; retaining previous trending snapshot')
        (ASSETS / 'trending-snapshot.json').write_text(json.dumps({'fetchedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'source':'https://github.com/trending?since=weekly', 'repositories':trending}, indent=2))
    except Exception as error:
        print('Retaining previous trending snapshot:', str(error))
print('Research assets preserved. Customer-review scores require manual source verification.')
