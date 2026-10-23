# Verification results

## Passed — executable checks
- JavaScript syntax: data.js, state.js, audio.js, app.js.
- Fresh state: dark, 1,000 HC, sound preference off.
- Exact unlock prices; all four leave 250 HC.
- 120 repeated unlock attempts cause zero additional charges.
- Invalid section IDs do not change balance.
- Reload restores balance, unlocks, theme, and sound preference.
- Reset restores credits/unlocks while retaining preferences.
- Malformed JSON and invalid saved theme recover to fresh state.
- Duplicate and unknown saved IDs filtered; arbitrary saved balance ignored.
- Blocked storage permits in-memory unlocking and raises a saving notice.
- Sequential cross-tab unlocks recheck saved state and avoid repeated charges.
- Insufficient funds path verified with a separate 1,100-HC price fixture.
- Every required local HTML/data asset path exists.
- All bundled SVGs parse as XML.

## Not run — browser required
No browser-control capability was available. The following are implemented but need runtime/manual verification:
- Camera framing, theme switching, mobile/landscape layout and text zoom.
- Modal keyboard focus, Escape, cancellation during motion, screen reader output.
- Search target highlight/scroll, actual contact email app handoff.
- User-gesture audio playback and browser autoplay restrictions.
- Visual contrast and target dimensions across viewports.
- Runtime console during complete interactions and missing-asset simulations.

Recommended device checks: 360 × 800, 768 × 1024, 1440 × 900, mobile landscape; each in both themes and all four sections. Try reduced motion, refresh after unlocking, repeat confirmation, reset, and two browser tabs. The cross-tab economy is best-effort browser storage, not a secure transaction system.
