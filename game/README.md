# Enter the Network — first native encounter

An early Windows build of the revised game's Oracle encounter. Walk through the chamber, inspect and pin two source passages, challenge the Oracle's overclaim, and receive a source-review request. A credential display shows why that request and an account badge authorize different things. A fictional vertical video, replay cues, captions, transcript and provisional Oracle voice exercise native media playback.

This is the U2 engine and feel checkpoint from the [revised plan](../docs/plans/2026-09-07-0140-feat-enter-the-network-plan.md), following the [U1 authoring brief](../docs/network-3d/experience-bible.md). The complete four-space Mara chapter, full Arbiter/Warden encounters, production saves, controller/remapping and finished art remain later units. Investigation progress resets when this encounter exits.

## Run a packaged build

Extract the whole Windows package and run `EnterTheNetwork.exe`. Keep `EnterTheNetwork.pck` beside it. No editor, network account or live service is needed. The executable is an unsigned development build.

| Control | Action |
|---|---|
| W A S D | Move |
| Mouse | Look |
| E | Inspect the station in front of you |
| Tab | Notebook and an alternate reading route |
| Escape | Leave an inspector or pause in the room |
| Mouse / Tab / Enter | Operate inspector controls |

Pause offers reduced ambient motion and a return-to-entrance recovery action. Switching applications releases movement and pauses current media. Playback resumes only through an explicit control. The transcript remains available if media cannot play.

Try an unsupported explanation before submitting the account-versus-person limitation. After receiving the request, compare it with the account badge at the service-review display. These are distinct authorities, not upgraded versions of the same badge.

## Build from source

Use the standard **Godot 4.7.2 stable** editor, GDScript, and matching Windows x86-64 export templates. Open `project.godot`, allow asset imports, and run the project. The renderer is Forward+; renderer and hardware observations belong in the [engine proof record](../docs/network-3d/engine-proof.md).

With templates installed in Godot's normal template directory, run from this directory:

```powershell
godot --headless --editor --path . --quit
godot --headless --path . --script tests/test_proof_rules.gd
godot --headless --path . --export-release "Windows Desktop"
```

Create `builds/windows/` before export. Replace `godot` with the path to the pinned editor executable when it is not on PATH. Export does not require resource editing or code signing tools.

`tests/test_scene.gd` exercises the real scene, movement, overlays, deductions, credential scope, video decode/seek, captions, focus loss and missing-media fallback. Run the editor project or packaged executable with graphics enabled and `-- --verify-native`. Set `NETWORK_PROOF_RESULTS` to a writable output directory for captures and JSON results. Require a final `RESULT` with zero failures and process exit zero; launch alone is not a pass. The packaged release does not support the editor's `--script` entry point. This automated pass is not a human comfort or usability test. Unit tests and graphical tests use the same rules and scene commands as the player.

## Sources and limits

See [asset records](../docs/network-3d/asset-register.md) for media origins, tool versions and provisional status. Source geometry is authored in GDScript for rapid adjustment. The temporary model and synthesized performance establish interaction and readability; final character production follows the chapter playtest gate.

The [engine proof record](../docs/network-3d/engine-proof.md) distinguishes automated results, inspected captures and unobserved manual checks. Engine commitment and production expansion wait for the plan's platform and feel checkpoint.
