# C × K — The Hunter’s Portfolio

Buildless HTML, CSS, and vanilla JavaScript. Original layered SVG scenes and stylized character placeholders. No runtime dependencies, remote fonts, hotlinked images, payment service, or backend.

## Run
Open `dist/index.html` directly, or use the recommended HTTP preview:

```
python3 -m http.server 8000 --directory dist
```

Visit http://localhost:8000. File-URL persistence and email app behavior vary by browser. The hosted version uses the `dist` directory.

## Explore
Choose a character, chapter card, or navigation item. A camera zoom leads to original dialogue and an explicit unlock confirmation. Prices: Projects 300, Skills 200, About 100, Contact 150 HC. All four leave 250 of the initial 1,000 HC. Reopening is free. Home, cancel, search, and theme changes do not charge. Kurapika and the guide links explain the experience. The credit panel contains a confirmed reset action.

The sun button switches between the Hunter’s Bar and Greed Island without losing progress. Sound begins off on every page load. The sound button enables original Web Audio interaction tones after a user gesture; no music or voice recordings are included. Saved sound preferences allow a Resume sound action, never autoplay.

## Edit content
`dist/js/data.js` owns profile details, project cards, skills, prices, target mappings, dialogue, asset paths, and themes. Supplied personal information was absent, so all profile/project/proficiency content is explicitly illustrative. Add actual URLs to enable live demo/source/résumé actions; missing URLs remain hidden. Set `profile.email` for contact drafts addressed to you. Without it, a draft opens without a recipient. The site never submits or claims delivery.

`state.js` handles validated progress and credit commits. `audio.js` generates original tones. `app.js` handles shared navigation, modal content, search, camera movement, theme changes, and interactions. `css/styles.css` owns themes and responsive layout. `create-art.py` reproduces the bundled artwork.

Changing prices changes the balance derived from saved unlocks. If changing the economy, deliberately migrate the saved-state version and key. There are no accounts, cloud synchronization, or secure balances. Browser storage across tabs is best-effort. All controls remain usable if storage fails.

## Asset guide
See `ASSET-MANIFEST.md`. Two reference images were not supplied, so the navbar and original SVG monogram follow the written direction. Scene and character SVGs are original stylized placeholders, not anime frame reproductions or complete animated characters. Replace them with appropriately authorized artwork while retaining paths or updating the central data map. Character layers use 250 × 485 viewBoxes; phone/binder use 190 × 230; scene backgrounds use 1600 × 700. Keep important character details inside the visible frame. Resize/cropping is intentionally independent of each scene target.

## Accessibility and behavior
Semantic sections, button-based hotspots, visible focus, descriptive names, native modal dialogs, Escape dismissal, focus restoration, polite credit announcements, reduced motion, responsive destinations, safe-area-compatible scrolling, and optional sound. Search results use real content and preserve the selected card through unlocking. Native dialogs require a current browser. Mobile offers navigation and chapter cards when targets are crowded.

## Verification
Run `node verify.cjs` for state invariants and required asset paths. All JS files passed `node --check`; bundled SVGs passed XML parsing. See `TEST-RESULTS.md` for coverage and browser QA limits. No browser automation capability was available in this environment; visual, focus, playback, and device checks need manual validation in the deployed site.
