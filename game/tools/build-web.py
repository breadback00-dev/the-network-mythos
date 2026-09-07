"""Export the existing Godot encounter and prepare static browser delivery."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import shutil
import subprocess


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--godot", required=True)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    game = Path(__file__).resolve().parents[1]
    exported = game / "builds/web"
    exported.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        [args.godot, "--headless", "--path", str(game), "--export-release", "Web"],
        text=True, capture_output=True, check=False,
    )
    if result.returncode or any(marker in result.stderr for marker in ("ERROR:", "SCRIPT ERROR:", "Parse Error")):
        raise RuntimeError(result.stdout + result.stderr)
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    for name in ("index.html", "index.js", "index.pck", "index.audio.worklet.js", "index.audio.position.worklet.js"):
        shutil.copy2(exported / name, output / name)
    wasm = (exported / "index.wasm").read_bytes()
    compressed = gzip.compress(wasm, compresslevel=9, mtime=0)
    if len(compressed) >= 25 * 1024 * 1024:
        raise RuntimeError("Compressed engine exceeds the static hosting asset limit.")
    if gzip.decompress(compressed) != wasm:
        raise RuntimeError("Engine compression verification failed.")
    (output / "index.wasm.pack").write_bytes(compressed)
    shutil.copy2(game / "web/network-loader.js", output / "network-loader.js")
    for name in ("GODOT-LICENSE.txt", "GODOT-COPYRIGHT.txt"):
        shutil.copy2(game / "licenses" / name, output / name)
    manifest = {
        "engine": "Godot 4.7.2 stable",
        "renderer": "Compatibility / WebGL 2",
        "threads": False,
        "wasm_bytes": len(wasm),
        "compressed_wasm_bytes": len(compressed),
        "wasm_sha256": hashlib.sha256(wasm).hexdigest(),
        "files": {p.name: {"bytes": p.stat().st_size, "sha256": hashlib.sha256(p.read_bytes()).hexdigest()} for p in output.iterdir() if p.is_file() and p.name != "build-manifest.json"},
    }
    (output / "build-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(output), "wasm_bytes": len(wasm), "compressed_wasm_bytes": len(compressed), "files": len(manifest["files"])}))


if __name__ == "__main__":
    main()
