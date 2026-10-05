# OpenStore editorial redesign

Reference reviewed: https://dotstore.io in Chrome on October 6, 2026. Its clear section hierarchy, compact category controls, and app identity rows informed this pass. OpenStore keeps its own branding, copy, route structure, and collection organization.

## Visual system

- Default light theme with white surfaces, soft neutral fills, muted metadata, and restrained green state accents. Explicit saved dark preferences and the theme switch remain supported.
- Consolidated the stylesheet into shared theme tokens and responsive component rules, replacing accumulated visual overrides.
- Flat navigation, search, buttons, filters, dialogs, and category controls. Thin dividers and consistent 8–12px radii provide structure without gradients, blur, lift effects, or component shadows.
- Compact editorial featured picks, aligned app rows, denser collection cards, and consistent app detail sections.
- Official app icons, catalog metadata, screenshots, review sources, and all existing routes and behaviors retained. No dependencies added.

## Verification

- `npm run build`: passed.
- `npm test`: all 11 existing catalog tests passed.
- `node --check app.js`: passed.
- Chrome visual inspection at desktop size and a 393 × 852 phone viewport: homepage, browse results, category directory, app details, and filter dialog/sheet.
- Manual checks: replacement search, category filtering, combined self-hosted filtering, filter application, saving/unsaving, image expansion/closing, and light/dark switching.
- Restored temporary saved-app test state and left preview appearance in light mode.
