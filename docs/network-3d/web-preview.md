# Oracle encounter: online preview

Published 7 September 2026 at [Enter the Network](https://enter-the-network.breadback00.chatgpt.site). Access is owner-private. Use a desktop browser with a keyboard and mouse. This is the existing U2 Oracle encounter exported for the web, with the same evidence rules, source pinning, provisional media and review request. It does not complete the Mara chapter or replace the plan's human playtest gates.

## Delivery

Godot 4.7.2 uses Compatibility / WebGL 2 for this export and Forward+ for the Windows default. The web preset is single-threaded; it does not require cross-origin isolation headers. Stream audio permits playback-position-based captions. Browser pause offers Restart encounter, and releasing pointer capture pauses room movement. Progress still resets on restart or exit.

`game/tools/build-web.py` exports and prepares static output. `game/web/shell.html` supplies loading, retry and full-screen controls. `game/web/network-loader.js` redirects only the exact engine request to its compressed payload, restores the bytes with browser decompression, and leaves unrelated requests unchanged. The raw engine is 39,514,754 bytes; the transferred payload is 10,054,758 bytes, below the host's 25 MiB per-file limit. Build output includes Godot notices and a hash manifest. Engine binaries and generated packages are excluded from source control.

The Sites source snapshot contains the retained game source and original media source. Hosting metadata points to the existing project; subsequent publications must reuse it. Canonical ongoing development remains on GitHub's `feat/enter-network-native` branch. The old `feat/archive-3d-proof` branch is preserved unchanged.

## Verification

- Web export and static packaging completed successfully. Every packaged asset was below the individual size limit; the archive contained the configured static entry point and hosting metadata.
- The compressed engine was decompressed and compared byte-for-byte before packaging. Raw engine SHA-256: `fc74679e3b97f76878947fcd4fbe1268cbfa6188182a2e33bbc3f5dc9bfa57d0`.
- Loader tests passed exact restoration, unrelated-path and unrelated-origin passthrough, HTTP failure and corrupt-payload cases.
- Fourteen pure evidence-rule checks passed. The actual scene passed all 28 checks using the native Compatibility renderer, with exit zero and no reported errors. This native run covers movement, source actions, authority limits, media advancement/seek, captions, focus loss and fallback; it is not a browser gameplay test.
- The local browser reported the engine ready. The browser controls rejected extra arguments, restarted successfully and returned to ready after navigation.
- Hosting reported publication succeeded. The published URL was opened in the existing game tab, and its browser loading-state tool returned `{ "error": null, "status": "ready" }`.

No full browser playthrough, audible mix check, mobile support, browser performance tier or visual parity with Forward+ is claimed. Camera comfort, readable presentation and player understanding still require a person to play. WebMCP exposes loading status and session restart, not the game's internal evidence actions.

## Published record

- Site: `appgprj_6a9e73d7a004819193d310d7c7cff891`
- Version: 1
- Source snapshot: `f793eb8f24c4f2b93238bdcec6dfbb7aefe4b898`
- Deployment: `appgdep_6a9e78876e2c819182387bfd4638a233`
- Scope review: [web preview review](../reviews/2026-09-07-web-preview-review.md)

For a future browser update, rebuild from the canonical source, retain the existing hosting project and audience, verify the loader and affected game paths, then publish the validated source snapshot. A loading error or failed engine start requires a focused correction before handing over a replacement link.
