# Codex macOS design reference — October 6, 2026

Sources studied:
- OpenAI's Codex app introduction: https://openai.com/index/introducing-the-codex-app/
- Official Codex product page: https://openai.com/codex/
- Dark macOS screenshot hosted in OpenAI's developer community: https://developers.openai.com/images/codex/community/tweets/flavioad-native-app.jpg

The screenshot shows a neutral dark workspace, a translucent navigation area, muted secondary text, fine surface borders, compact controls, and low-contrast suggestion cards. OpenStore adapts that visual hierarchy while keeping its marketplace navigation and editorial collections.

Changes:
- Dark defaults to #181818, with #202020 cards and #262626 controls; optional light mode is remembered in localStorage.
- Theme is applied before the stylesheet loads to prevent an initial light flash.
- The hero is integrated into the canvas, with a restrained two-tone headline and a command-style search field.
- Navigation, categories, catalog cards, detail sections, and modal sheets share neutral dark surfaces and subtle separators.
- Light primary actions stand out; muted green, blue, and violet are limited to featured collections and small status details.
- Official project icons and screenshots retain their source artwork.
- Core neutral secondary text combinations measure at least 5.3:1 contrast.

Validation: JavaScript syntax, production build, and all 11 catalog checks pass. Browser checks cover dark homepage, collections, filter sheet, and OpenProject details on desktop; iPhone 16 at 393 × 852 verifies the hero, collection cards, details, and Figma shortcut (two results). Appearance preference persists after reload; browser console is clear.
