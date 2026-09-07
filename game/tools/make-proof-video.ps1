param([Parameter(Mandatory = $true)][string]$FfmpegExe)
$ErrorActionPreference = 'Stop'
$sourceClip = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../source-assets/native-proof/return.webm'))
$outputClip = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../tests/fixtures/media/return.ogv'))
# FFmpeg 9.0.1 was verified. The older npm-packaged encoder produced corrupt Theora frames.
& $FfmpegExe -hide_banner -loglevel error -y -i $sourceClip -map_metadata -1 -vf scale=360:640 -pix_fmt yuv420p -c:v libtheora -q:v 6 -c:a libvorbis -q:a 4 $outputClip
if ($LASTEXITCODE -ne 0) { throw 'Native video conversion failed.' }
& $FfmpegExe -hide_banner -loglevel error -xerror -i $outputClip -f null -
if ($LASTEXITCODE -ne 0) { throw 'Native video failed full decode verification.' }
