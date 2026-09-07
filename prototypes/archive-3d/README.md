# The Network Mythos — The Archive

A playable demonstration of the proposed 3D Archive. Explore one room, examine five traces, pin evidence, and establish one supported deduction. This is the room proof from unit U9 of the [earlier next-version plan](../../docs/plans/2026-09-07-0010-network-mythos-next-version-plan.md), not the Oracle encounter in the [current Enter the Network plan](../../docs/plans/README.md).

## Play

You need Node.js 22 or later and a browser with WebGL support. The repository contains source and all sample media. Build the browser bundle once after cloning or downloading the repository:

```text
cd prototypes/archive-3d
npm ci
npm run build
npm start
```

Open **http://127.0.0.1:4189/**. Keep the terminal open while playing; close it to stop the local server. After building, Windows users can also double-click `start-demo.bat` in this folder. Installing dependencies requires internet access unless they are already cached; playing the built demo uses local files only.

The generated `public/app.js` bundle and `node_modules/` are intentionally excluded from Git. An already built demo package can be started directly with `start-demo.bat` or `node server.js` without reinstalling dependencies.

If another copy is already running, use its browser page or close that server before starting again. The server is accessible only on this computer.

## Investigate

- Enter the Archive and start with the phone. Its three traces are a fictional Threadline video, a meme/repost chain, and Elian's voice message.
- Read the public summary and verification report at the terminal. Pin two relevant passages.
- Visit the evidence wall and test the conclusion your selected sources support. The wall offers progressive hints if needed.
- After the discovery, explore Publish, Bury, and Preserve as sample consequences. These demonstrate how the room could respond; they are not final case endings.

Use the labelled room objects or the station buttons at the bottom. **Desk view** offers the same evidence and deduction without navigating the room. **Quiet mode** removes camera transitions and ambient motion. The interface also respects the browser's reduced-motion preference.

Audio and video start only when you press Play. Both include equivalent transcripts, and the video has draft captions. Close evidence with its close button or Escape. Reload the page or select the monogram to restart. Progress exists only for the current page session.

## What is temporary

The voices use installed Windows speech synthesis. The short video is moving artwork with narration, not a filmed character performance. Its caption timings are approximate and need editorial review. The meme and fictional social platform are original demonstration assets. Read the transcript whenever speech, captions, or playback are unclear.

This demonstration has no real social account connection, uploads, external posting, analytics, or production save integration. It does not modify the existing game's saves. There is one discovery, three sample consequences, and no second case yet.

## Development

To edit and rebuild, run `npm ci` followed by `npm run build`. Run `npm test` for the deduction and local media-server checks. `npm start` starts the same local server.

Source is in `src/`, the built browser files are in `public/`, and meaningful automated checks are in `tests/`. `server.js` serves local files and supports seeking through media. The optional scripts in `scripts/` regenerate the temporary media: Windows speech synthesis for the voices, then Sharp and FFmpeg for the video. Existing media is included, so regeneration is not needed to run or edit gameplay.

## Next decision

Use this room as a reference when testing the [current plan's native encounter proof](../../docs/plans/2026-09-07-0140-feat-enter-the-network-plan.md). Observe whether first-time players can find all stations, understand the media as evidence, and explain the difference between a verified account and a verified person. Compare room view with desk view and note where hints are needed. Formal human playtesting has not yet been completed. The native chapter's writing, avatar encounters, durable saves, accessibility testing, and final media production remain later work.

See `verification.md` for the checks performed on this demonstration.
