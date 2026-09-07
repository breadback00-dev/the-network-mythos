$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$voiceOutput = Join-Path $PSScriptRoot '../tests/fixtures/media/oracle.wav'
$proofVoice = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
    $proofVoice.Rate = -1
    $proofVoice.SetOutputToWaveFile([System.IO.Path]::GetFullPath($voiceOutput))
    $proofVoice.Speak('Mara Vale returned to public life. Her account remains authentic. The record is coherent. If you find a gap, bring me the sources. I will leave room for what they cannot answer.')
    $proofVoice.SetOutputToNull()
} finally {
    $proofVoice.Dispose()
}
Get-Item -LiteralPath $voiceOutput | Select-Object Name,Length
