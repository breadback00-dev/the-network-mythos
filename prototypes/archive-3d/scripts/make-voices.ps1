Add-Type -AssemblyName System.Speech
$mediaRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public/media'))
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $speaker.SelectVoice('Microsoft George')
  $speaker.Rate = -1
  $speaker.SetOutputToWaveFile((Join-Path $mediaRoot 'elian.wav'))
  $speaker.Speak('Rafi. I watched the live thing. I know everyone wants me to make a statement. I am not going to. That is not my sister. I do not mean I know who is typing. I do not mean I can prove anything in the way people want proof. I mean I grew up with Mara, and whoever that is knows her work better than they know her. I saw her after the final post. Once. She made me promise not to tell anyone where. If you decide to fight this thing, fight the thing. Not her absence.')
  $speaker.SetOutputToNull()
  $speaker.SelectVoice('Microsoft Hazel Desktop')
  $speaker.Rate = 0
  $speaker.SetOutputToWaveFile((Join-Path $mediaRoot 'mara-temp.wav'))
  $speaker.Speak('Hello, the Porchlight. I have missed you more than I knew how to say. Four years ago, I left because I did not know how to remain present without becoming available for use. I am returning carefully. The answer is consent that can be revised. Tools that can be refused. The door was real. I no longer think every door opens only one way.')
} finally { $speaker.Dispose() }
Write-Output 'Two temporary fictional performances generated.'
