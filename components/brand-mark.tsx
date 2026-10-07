/** Monochrome OpenStore bag; inherits the text color so it is black in light mode and white in dark mode. */
export function BrandMark({ className = 'brand-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" width={32} height={32} fill="none" stroke="currentColor" strokeWidth={9.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M42 46v-7c0-19 9-29 22-29s22 10 22 29v7" />
      <path d="M75 92 43 100c-12 3-19-5-19-18V59c0-8 5-13 13-13h53c9 0 14 5 14 14v21c0 12-7 19-18 19h-4" />
    </svg>
  );
}
