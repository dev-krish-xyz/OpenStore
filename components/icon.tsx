import type { ReactNode, SVGProps } from 'react';

const paths = {
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
  moon: <><path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
  github: <><path d="M9 19c-4.5 1.3-4.5-2.2-6.3-2.6M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.4 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13 13 0 0 0-6.8 0C5.6 1.2 4.4 1.6 4.4 1.6a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 2.9 9c0 5.2 3.1 6.3 6.2 6.7a3.4 3.4 0 0 0-.9 2.5V22"/></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
  chevron: <><path d="m9 5 7 7-7 7"/></>,
  back: <><path d="m14 5-7 7 7 7"/></>,
  external: <><path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/></>,
  star: <><path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z"/></>,
  sparkles: <><path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3ZM20 2v4m-2-2h4M4 18v4m-2-2h4"/></>,
  code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/></>,
  pen: <><path d="m16 3 5 5-11 11-7 2 2-7L16 3Zm-3 3 5 5M3 21l4-4"/></>,
  video: <><rect x="3" y="5" width="14" height="14" rx="3"/><path d="m17 9 5-3v12l-5-3"/></>,
  layers: <><path d="m12 3 10 6-10 6L2 9l10-6Zm-10 12 10 6 10-6M2 12l10 6 10-6"/></>,
  wallet: <><path d="M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6m18 7h-5v4h5"/><path d="M16 15h1"/></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></>,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
  sliders: <><path d="M4 4v4m0 5v7M12 4v9m0 5v2M20 4v2m0 5v9"/><path d="M1 8h6v5H1zM9 13h6v5H9zM17 6h6v5h-6z"/></>,
  terminal: <><rect x="2" y="3" width="20" height="18" rx="3"/><path d="m6 8 4 4-4 4m7 0h5"/></>,
  scissors: <><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.5 7.5 13 13m-13-4 13-13M12 12l-3-3"/></>,
  hands: <><path d="m6 12-3-3a2 2 0 0 0-1 3l5 8h4V8a2 2 0 0 0-4 0v6M18 12l3-3a2 2 0 0 1 1 3l-5 8h-4V8a2 2 0 0 1 4 0v6M6 2l2 2m10-2-2 2M12 1v3"/></>,
  chat: <><path d="M21 11a8 8 0 0 1-8 8H6l-5 3 2-6a8 8 0 0 1-1-5 9 9 0 0 1 19 0Z"/><path d="M7 10h10M7 14h6"/></>,
  project: <><path d="M3 4h5v5H3zM14 4h7v5h-7zM3 15h7v5H3zM16 15h5v5h-5zM8 6h6M6 9v6m4 2h6M18 9v6"/></>,
  tofu: <><path d="m3 7 9-4 9 4v11l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v11M7 12v3m10-3v3M10 17h4"/></>,
  observe: <><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7M6 10l3 3 5-6"/></>,
  refine: <><path d="M4 3h16v4l-6 6v6l-4 2v-8L4 7V3Z"/></>,
  board: <><rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 23l4-5 4 5M6 8h9m-9 5h12"/></>,
  speed: <><path d="M3 19a10 10 0 1 1 18 0M4 11l2 1m2-7 1 2m7-2-1 2m5 4-2 1M12 16l4-7"/><circle cx="12" cy="16" r="2"/></>,
  penpot: <><path d="m3 8 9-5 9 5v9l-9 5-9-5V8Zm0 0 9 5 9-5M12 13v9M7 5l10 6v4"/></>,
  flow: <><path d="M3 6c6-8 8 8 12 4s6-7 7-4M3 14c6-8 8 8 12 4s6-7 7-4"/></>,
  film: <><rect x="2" y="3" width="20" height="18" rx="3"/><path d="M7 3v18m10-18v18M2 8h5M2 16h5M17 8h5m-5 8h5m-12-6 5 3-5 3v-6Z"/></>,
  audio: <><path d="M3 10v4m4-8v12m5-16v20m5-16v12m4-8v4"/></>,
  server: <><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M12 7h5m-5 11h5"/></>,
  download: <><path d="M12 2v13m-5-5 5 5 5-5M3 16v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/></>,
  paperclip: <><path d="m8 12 7-7a4 4 0 0 1 6 6L10 22a6 6 0 0 1-8-8L13 3a2 2 0 0 1 3 3L6 16"/></>,
  check: <><path d="m4 12 5 5L20 6"/></>,
  fork: <><circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="12" cy="20" r="2"/><path d="M6 6v4c0 3 6 2 6 6v2M18 6v4c0 3-6 2-6 6"/></>,
  globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a18 18 0 0 1 0 20 18 18 0 0 1 0-20Z"/></>,
  bookmark: <><path d="M5 3h14v19l-7-5-7 5V3Z"/></>,
  info: <><circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></>,
  upload: <><path d="M12 16V3m-5 5 5-5 5 5M4 14v6h16v-6"/></>,
  thumbs: <><path d="M7 10v11H3V10h4Zm0 9c3 1 5 2 9 2a3 3 0 0 0 3-2l2-7a2 2 0 0 0-2-3h-5l1-4a3 3 0 0 0-2-3l-6 8"/></>,
  inbox: <><path d="M3 4h18v16H3V4Zm0 11h5l2 3h4l2-3h5"/></>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function isIconName(name: string): name is IconName {
  return name in paths;
}

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName | (string & {});
}

/** OpenStore's single stroke icon set. Unknown names fall back to "layers". */
export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {isIconName(name) ? paths[name] : paths.layers}
    </svg>
  );
}
