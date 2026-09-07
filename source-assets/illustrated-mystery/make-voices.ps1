param([string]$OutputDirectory)
Add-Type -AssemblyName System.Speech
New-Item -ItemType Directory -Force $OutputDirectory | Out-Null
$performances = @{
  'elian' = 'Rafi. That is not my sister. I do not mean she is dead. I do not mean I know who is typing. I saw her after the final post. Once. Months later. She made me promise not to tell anyone where. Do not send people looking. If you decide to fight this thing, fight the thing. Not her absence.'
  'mara-old' = 'People talk about being reachable as if it is the same thing as being alive. Hold on. The kettle. Sorry. It has better timing than I do. I want a room where I can be useful without becoming a resource.'
}
foreach ($name in $performances.Keys) {
  $voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
  $voice.Rate = -1
  $voice.SetOutputToWaveFile((Join-Path $OutputDirectory ($name + '.wav')))
  $voice.Speak($performances[$name])
  $voice.Dispose()
}

