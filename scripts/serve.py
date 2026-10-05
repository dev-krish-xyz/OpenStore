from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os, sys
os.chdir(Path(__file__).resolve().parent.parent)
port = int(os.environ.get('PORT', '5173'))
class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()
print(f'OpenStore is ready at http://localhost:{port}', flush=True)
ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
