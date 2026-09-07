# Native engine-proof assets

This is the U2 provisional asset register. It does not certify the first release's final performance or rights pass.

| Runtime asset | Origin / master | Status and purpose |
|---|---|---|
| `game/scripts/proof_world.gd` | Project-authored procedural geometry, materials and motion | Provisional Oracle, chamber and response. No external character model or purchased assets. |
| `game/tests/fixtures/media/return.ogv` | `source-assets/native-proof/return.webm`, carried from the historical browser proof | Original fictional Porchlight clip, approximately 28.17 seconds. This proof adapts comeback material; it is not a verbatim rendering of interview 08. Runtime is 360×640 Theora/Vorbis, converted with FFmpeg 9.0.1. |
| `game/tests/fixtures/media/return-poster.png` | Project-authored prior proof frame | Provisional image displayed before playback; not a substitute for decode verification. |
| `game/tests/fixtures/media/return.vtt` | Project-authored prior proof caption cues | Captions, cue replay and complete transcript. Human timing review remains pending. |
| `game/tests/fixtures/media/oracle.wav` | `game/tools/make-proof-voice.ps1` and matching transcript in the encounter script | Temporary Windows synthesized voice. Original dialogue; not an imitation of a real performer. Final casting/recording is future production work. |
| Interface fonts | Windows system font lookup with engine fallback | No proprietary font file is copied into the repository or package. |
| Godot runtime | Official Godot 4.7.2 stable Windows x86-64 export template | Engine MIT license and bundled third-party notices are retained under `game/licenses/` and included beside the packaged executable. |

The source clip and original project prose are retained under their existing project ownership. No live social account, external playback service, copied commercial video or paid asset is required. FFmpeg is an authoring tool, not distributed with the game.

Regenerate the Oracle voice with Windows PowerShell in STA mode. Regenerate the video with `game/tools/make-proof-video.ps1 -FfmpegExe <path>` using the verified version. Always run its full decode check before inspecting the native result. The earlier npm-packaged FFmpeg build produced invalid Theora frames despite a successful encode exit code; the current conversion passes independent full decoding. This is a measured toolchain issue, not evidence that Godot's decoder failed on a valid source.

Primary references: [Godot license](https://godotengine.org/license/), [Godot video formats](https://docs.godotengine.org/en/stable/tutorials/animation/playing_videos.html), and [FFmpeg's Windows build links](https://ffmpeg.org/download.html).
