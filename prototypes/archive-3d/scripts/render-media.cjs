// Build the temporary vertical clip from original SVG artwork and a Windows voice.
// Usage: node scripts/render-media.cjs <ffmpeg-executable> <sharp-package-path>
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const ffmpeg = process.argv[2];
const sharp = require(process.argv[3] || 'sharp');
const root = path.resolve(__dirname, '../public/media');
const phrases = [
  'Hello, the Porchlight.',
  'I have missed you more than I knew how to say.',
  'Four years ago, I left because I did not know how to remain present without becoming available for use.',
  'I am returning carefully.',
  'The answer is consent that can be revised.',
  'Tools that can be refused.',
  'The door was real.',
  'I no longer think every door opens only one way.',
];
function waveDuration(buffer) {
  let byteRate, bytes;
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const id = buffer.toString('ascii', offset, offset + 4), size = buffer.readUInt32LE(offset + 4);
    if (id === 'fmt ') byteRate = buffer.readUInt32LE(offset + 16);
    if (id === 'data') bytes = size;
    offset += 8 + size + (size % 2);
  }
  if (!byteRate || !bytes) throw new Error('Expected a WAV recording with format and data chunks.');
  return bytes / byteRate;
}
function timestamp(seconds) { return new Date(Math.max(0, seconds) * 1000).toISOString().slice(11, 23); }
(async () => {
  if (!ffmpeg) throw new Error('Pass an ffmpeg executable path.');
  const poster = path.join(root, 'return-frame.png');
  await sharp(path.join(root, 'return-poster.svg')).png().toFile(poster);
  const duration = waveDuration(fs.readFileSync(path.join(root, 'mara-temp.wav')));
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-loop', '1', '-i', poster, '-i', path.join(root, 'mara-temp.wav'), '-vf', "scale=1080:1920,zoompan=z='1.02+0.00009*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=540x960:fps=24,fade=t=in:st=0:d=0.7", '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '40', '-deadline', 'realtime', '-cpu-used', '6', '-threads', '2', '-c:a', 'libopus', '-b:a', '64k', '-t', String(duration), path.join(root, 'return.webm')], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.error?.message || 'Video encoding failed.');
  const weights = phrases.map(phrase => phrase.split(' ').length + 2);
  const total = weights.reduce((a, b) => a + b, 0);
  let elapsed = 0;
  const captions = phrases.map((phrase, i) => { const start = elapsed; elapsed += duration * weights[i] / total; return `${i + 1}\n${timestamp(start)} --> ${timestamp(elapsed)}\n${phrase}\n`; });
  fs.writeFileSync(path.join(root, 'return.vtt'), `WEBVTT\n\n${captions.join('\n')}`);
  console.log(`Created vertical clip with audio and draft captions (${duration.toFixed(1)} seconds).`);
})().catch(error => { console.error(error.message); process.exitCode = 1; });
