# Enter the Network: native checkpoint

Recorded 7 September 2026 on `feat/enter-network-native`. This delivers U1's authoring brief and the runnable U2 encounter. **Checkpoint B is pending the user's platform and feel review.** U3-U13 and the complete Mara chapter are not implemented by this checkpoint.

## Playable scope

One first-person chamber contains an animated provisional Oracle, two public source stations, a vertical Porchlight recording and a service-review display. Pin the summary and verification scope, then explain the account/person distinction. Unsupported replacement claims fail. The supported finding removes one of the Oracle's floating cards and issues a notebook request. The account badge never becomes a review mandate.

The clip has pause, cue replay, captions, a full transcript and a visual equivalent. Oracle speech has captions and a transcript. Opening another inspector stops the previous media. Losing application focus releases movement and pauses playback without resetting the selected video cue. The encounter resets on exit and does not perform final publication, save a case outcome or alter browser saves.

## Observed environment and results

| Item | Observed result |
|---|---|
| Engine | Godot 4.7.2 stable, official build `ed1daf0bf`; matching Windows x86-64 release template |
| Reference machine | Microsoft Surface Book 2; Intel Core i7-8650U at 1.90 GHz; 17,092,849,664 bytes reported physical memory (nominal 16 GB) |
| Operating system | Windows 10 Pro, 10.0.19045 |
| Active GPU / driver | NVIDIA GeForce GTX 1060; driver 31.0.15.2849; Vulkan 1.3.224. Intel UHD 620 also present. Dedicated VRAM was not reliably measured. |
| Render settings | Forward+, 1280 x 720 window, project defaults, glow and ordinary fog, provisional geometry and lighting |
| Import / parse / export | Completed without reported script or export errors |
| Pure rules | 14 checks, zero failures; source order, duplicate ancestry, insufficient evidence, invalid claims, bounded authority and repeat submission |
| Standalone scene checks | Final packaged executable: 28 reported checks, zero failures, exit code 0, empty standard-error log |
| Media decode | FFmpeg 9.0.1 full decode with `-xerror` passed; the native capture shows clean video, not the poster alone |
| Short frame sample | 240 wall-clock frame intervals: p95 17.791 ms, maximum 36.232 ms |
| Output size | Executable 109,268,480 bytes; content pack 878,400 bytes, before adjacent license/readme files |

The sample is from an automated windowed run on one computer. It is **not a 1080p chapter benchmark, a minimum hardware specification or a verified 60 fps performance tier**. Audio used the Dummy driver for automation: playback position and captions were checked, but speaker output, mix quality and perceptual synchronization were not heard. No human camera-comfort or fresh-player study has been performed.

The executable was copied into a clean delivery folder and run without an editor or source checkout path. Two successive verified package launches completed the encounter and exited through the game's exit control. The final run also checked the fresh session state. The development executable is unsigned.

## Captured evidence

- [Room before the finding](evidence/u2/native-room.png)
- [Supported finding and request](evidence/u2/native-finding.png)
- [Oracle with the acknowledged gap](evidence/u2/native-gap.png)
- [Decoded video and caption](evidence/u2/native-video.png)
- [Final scene results](evidence/u2/scene-results.json), [complete check output](evidence/u2/checks.txt), [binary sizes and SHA-256 hashes](evidence/u2/build-manifest.json)

The captures were visually inspected: the video corruption is absent, the caption is outside the inspector, and the finding and pinned sources are readable. The altered Oracle card arrangement is visible. Whether that gesture communicates clearly during ordinary play remains a human check.

## Production friction and corrections

The older npm-distributed FFmpeg encoder returned success while producing invalid Theora frames. A texture-exists check did not detect that corruption. The replacement conversion uses FFmpeg 9.0.1, a mandatory independent full decode and a native image check. The editable WebM master is retained separately from runtime assets.

Focus loss originally reset the video cue; the fixed inspector preserves it. Explicit Oracle replay now clears paused speech state. Captions were moved clear of the inspector, and finding feedback was placed above secondary controls.

The Windows release template does not run the editor's `--script` shortcut. An initial launch using it was not counted as a test pass. The shipped fixture now accepts `-- --verify-native` and drives the real main scene. A final result marker, zero failures and exit zero are all required. Tests use explicit failure counters, so release builds cannot disable their assertions.

Provisional speech generation required Windows PowerShell in STA mode. It is an authoring convenience and has not established final voice quality or cost. No reliable per-finished-encounter or final-media production estimate can be inferred from this proof.

## Manual checkpoint B

Use the [playtest protocol](playtest-protocol.md) with the extracted Windows package:

- [ ] Confirm Windows desktop is the intended initial platform.
- [ ] Walk, turn and inspect using the physical mouse and keyboard; judge comfort and text size.
- [ ] Notice the Oracle's changed arrangement and explain why its request differs from the badge.
- [ ] Listen to voice and clip through normal speakers/headphones; check caption timing, pause, replay and returning after an application switch.
- [ ] Judge whether this first-person encounter has the desired presence and atmosphere. Record an observed reason if another perspective would solve a problem.
- [ ] Agree the next performance tier and measure it at the intended resolution.
- [ ] Decide whether to commit to Godot and proceed to U3-U7 foundations. If an engine-level required workflow remains broken after its bounded repair, compare the same fixture in Unity before production.

These checks are pending, not failed or silently waived. The observed fixes establish a working candidate; they do not replace the plan's human engine/feel decision. The five-fresh-player chapter checks at checkpoint D remain later gates.

For reproduction and controls, see [game README](../../game/README.md). See the [asset register](asset-register.md), [code-review record](../reviews/2026-09-07-native-checkpoint-review.md), and [revised plan](../plans/2026-09-07-0140-feat-enter-the-network-plan.md). Technical references: [Godot command-line capabilities](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html), [Godot native video](https://docs.godotengine.org/en/stable/tutorials/animation/playing_videos.html).
