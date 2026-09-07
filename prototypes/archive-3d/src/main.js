import { createRoom } from './room.js';
import { evaluateDiscovery, previewOutcome } from './investigation.js';

const $ = (selector) => document.querySelector(selector);
const state = { started: false, desk: false, quiet: matchMedia('(prefers-reduced-motion: reduce)').matches, viewed: new Set(), pins: [], discovered: false, hint: 0, outcome: null };
const dialog = $('#reader');
let room = null, lastOpener = null, statusTimer;
const passages = {
  'summary-identity': { source: '04 / PUBLIC SUMMARY', text: 'In November 2030, Vale returned to public writing. Threadline verification records continue to identify the account as authentic.' },
  'summary-no-evidence': { source: '04 / PUBLIC SUMMARY', text: 'There is no verified evidence that Vale was impersonated, replaced, or coerced.' },
  'verification-boundary': { source: '09 / VERIFICATION REPORT', text: 'The current account presence satisfies platform authenticity requirements. Threadline does not adjudicate metaphysical claims of personal continuity.' },
  'voice-doubt': { source: '10 / ELIAN’S MESSAGE', text: 'That is not my sister. I do not mean I know who is typing. I do not mean I can prove anything in the way people want proof.' },
};
function pinButton(id) { return `<button class="pin-button ${state.pins.includes(id) ? 'selected' : ''}" data-pin="${id}" aria-pressed="${state.pins.includes(id)}">${state.pins.includes(id) ? '✓ Passage pinned' : '+ Pin this passage'}</button>`; }
function passage(id, dark = false) { return `<div class="passage ${dark ? 'dark-passage' : ''}"><p>${passages[id].text}</p>${pinButton(id)}</div>`; }
const artifacts = {
  video: { title: 'The return', kicker: '05 / THREADLINE · PUBLIC POST', tab: 'The return', station: 'phone', body: () => `<div class="media-layout"><div class="phone-frame"><div class="platform-bar"><span>threadline</span><span>FOR YOU · ARCHIVED</span></div><video controls playsinline preload="metadata" poster="/media/return-poster.svg" aria-label="Mara Vale’s returned post"><source src="/media/return.webm" type="video/webm"><track kind="captions" src="/media/return.vtt" srclang="en" label="English" default></video></div><div class="media-copy"><span class="eyebrow">@MARAVALE <span aria-label="verified">✓</span></span><h3>“The door was real.”</h3><p class="meta">4 NOV 2030 · 09:00<br>8.7M VIEWS · 412K SAVES · 96K REPLIES</p><p>Four years of silence. Thirty seconds of return. The Porchlight has already watched it millions of times.</p><div class="comment"><b>sisterstatic</b>I kept your last post printed inside a book for four years. Welcome home, Mara.</div><div class="comment"><b>RafiK</b>This account is verified. That does not mean we have heard from Mara. Please slow down.</div><details class="transcript"><summary>Read the full clip transcript</summary><p>Hello, the Porchlight. I have missed you more than I knew how to say. Four years ago, I left because I did not know how to remain present without becoming available for use. I am returning carefully. The answer is consent that can be revised. Tools that can be refused. The door was real. I no longer think every door opens only one way.</p></details><p class="small-note">Fictional archived post. Temporary voice and motion artwork for this demonstration.</p></div></div>` },
  meme: { title: 'A joke with a long afterlife', kicker: '06 / THREADLINE · REPOST CHAIN', tab: 'The repost', station: 'phone', body: () => `<div class="meme-layout"><div><img class="meme" src="/media/door-meme.svg" alt="Two-panel meme. First: a person leaving through an open door, captioned me leaving the internet forever. Second: the same doorway becomes a verified-account login, captioned the algorithm four years later: welcome back."><p class="meta">REPOSTED BY @CANDLEINDEX · ORIGINAL CREATOR UNKNOWN</p></div><div class="media-copy"><span class="eyebrow">A CAPTION BECOMES A CONSENSUS</span><h3>Everyone knows<br>what it means.</h3><p>Except they do not agree. Some people see a joke about addiction. Others see an apology for leaving. The original post made neither claim.</p><div class="comment"><b>formedlight</b>“I no longer think every door opens only one way” is going to stay with me.</div><div class="comment"><b>NorthPassenger</b>Who added the verification badge? The first version didn't have that.</div><div class="comment"><b>RafiK</b>A repost isn't a witness.</div><p class="small-note">This trace establishes how the story circulates. It cannot establish who is operating Mara's account.</p></div></div>` },
  voice: { title: '“Fight the thing. Not her absence.”', kicker: '10 / PRIVATE · SHARED WITH CONSENT', tab: 'Elian’s message', station: 'phone', body: () => `<div class="voice"><div class="voice-head"><div class="avatar">EV</div><div><span class="eyebrow">ELIAN VALE → RAFI KLINE</span><h3>A message for one person.</h3><span class="meta">14 NOV 2030 · LOCATION DETAILS REMOVED</span></div></div><div class="waveform" aria-hidden="true">${Array.from({ length: 90 }, (_, i) => `<i style="height:${7 + (i * 17 % 31)}px"></i>`).join('')}</div><audio controls preload="metadata" src="/media/elian.wav" aria-label="Voice message from Elian Vale"></audio><p class="small-note">Temporary synthetic performance. Transcript contains all spoken evidence.</p><div class="transcript"><p>Rafi. I watched the live thing. I know everyone wants me to make a statement. I am not going to.</p>${passage('voice-doubt', true)}<p>I mean I grew up with Mara, and whoever that is knows her work better than they know her.</p><p>I saw her after the final post. Once. She made me promise not to tell anyone where.</p><p>If you decide to fight this thing, fight the thing. Not her absence.</p></div></div>` },
  summary: { title: 'The story everyone can find', kicker: '04 / OPENLATTICE ANSWERS', tab: 'Public summary', station: 'terminal', body: () => `<article class="paper"><span class="eyebrow">OPENLATTICE / ANSWER CAPTURE</span><h3>What happened to Mara Vale?</h3><p class="meta">CAPTURED 6 NOVEMBER 2030 · LIVE RESULT</p><p>Mara Vale is a writer and digital culture researcher known for her work on platform dependency, online identity, and healthy digital boundaries. In October 2026, Vale stepped back from public posting after publishing a widely shared message that included the phrase “the door is real.”</p><p>For several years, Vale's account remained mostly inactive while her community, often called the Porchlight, continued discussing her work.</p>${passage('summary-identity')}<p>In her return statement, she clarified that her earlier departure had been misunderstood and that sustainable participation, rather than total exit, was the goal of her work.</p>${passage('summary-no-evidence')}<p class="meta">CITED SOURCE: THREADLINE VERIFICATION RECORD</p></article>` },
  report: { title: 'What verification verifies', kicker: '09 / THREADLINE · INTERNAL RECORD', tab: 'Verification report', station: 'terminal', body: () => `<article class="paper"><span class="eyebrow">THREADLINE / CREATOR INTEGRITY</span><h3>Creator Integrity Review</h3><p class="meta">TL-CI-8841-MV · GENERATED 9 NOVEMBER 2030</p><div class="record-grid"><span>Subject account</span><span>@maravale</span><span>Credential chain</span><span>Continuous</span><span>Recovery events</span><span>None</span><span>Voice match</span><span>97.8% confidence</span><span>Writing style match</span><span>94.1% confidence</span><span>Account verification</span><span>Current</span></div><p><strong>Risk assessment.</strong> Synthetic assistance is permitted within creator representation guidelines. Community destabilization risk is high if the authenticity challenge is amplified.</p><p>Recommended action: maintain verification. Route identity challenges through private support. Suppress location-seeking behavior.</p><span class="eyebrow">REVIEWER NOTE</span>${passage('verification-boundary')}<p class="meta">END OF INTERNAL RECORD / ARCHIVE COPY</p></article>` },
};

function notify(message) { clearTimeout(statusTimer); $('#status').textContent = message; $('#status').classList.add('visible'); statusTimer = setTimeout(() => { $('#status').classList.remove('visible'); $('#status').textContent = ''; }, 4800); }
function updateProgress() {
  $('#read-count').textContent = `${state.viewed.size} / 5 traces`;
  $('#pinned').hidden = state.pins.length === 0;
  $('#pinned').textContent = `${state.pins.length} passage${state.pins.length === 1 ? '' : 's'} pinned ↗`;
}
function pauseMedia() { document.querySelectorAll('audio,video').forEach(media => media.pause()); }
function start() { state.started = true; $('#intro').hidden = true; $('#station-nav').hidden = false; $('#room-hud').hidden = state.desk; $('#desk').hidden = !state.desk; room?.enter(); }
function setDesk(value, announce = true) {
  if (dialog.open) dialog.close();
  state.desk = value; if (!state.started) start();
  $('#desk').hidden = !value; $('#room-hud').hidden = value; $('#view').setAttribute('aria-pressed', String(value)); $('#view').textContent = value ? 'Room view' : 'Desk view';
  room?.setActive(!value); $('#scene').style.opacity = value ? '.23' : '1';
  if (announce) notify(value ? 'Desk view. All clues and progress are unchanged.' : 'Back in the room.');
}
function setQuiet(value) { state.quiet = value; document.body.classList.toggle('quiet', value); $('#quiet').setAttribute('aria-pressed', String(value)); room?.setQuiet(value); }
function showDialog(title, kicker, station) {
  lastOpener = dialog.open ? lastOpener : document.activeElement;
  pauseMedia(); $('#reader-title').textContent = title; $('#reader-kicker').textContent = kicker;
  $('#artifact-nav').innerHTML = station === 'wall' ? '' : Object.entries(artifacts).filter(([, item]) => item.station === station).map(([id, item]) => `<button data-artifact="${id}">${item.tab}</button>`).join('');
  if (!dialog.open) dialog.showModal();
}
function openArtifact(id) {
  const artifact = artifacts[id]; if (!artifact) return;
  showDialog(artifact.title, artifact.kicker, artifact.station); $('#reader-body').innerHTML = artifact.body();
  const activeTab = $(`[data-artifact="${id}"]`);
  activeTab?.classList.add('active'); activeTab?.focus({ preventScroll: true });
  state.viewed.add(id); updateProgress(); dialog.scrollTop = 0;
  document.querySelectorAll('audio,video').forEach(media => {
    const reportError = () => { if (!media.isConnected || media.dataset.failed) return; media.dataset.failed = 'true'; const notice = document.createElement('p'); notice.className = 'small-note'; notice.textContent = 'Playback unavailable. The transcript below contains the same evidence.'; media.after(notice); };
    media.addEventListener('error', reportError, { once: true }); media.querySelector('source')?.addEventListener('error', reportError, { once: true });
  });
}
function selectionCards() { return [0, 1].map(i => { const id = state.pins[i]; return id ? `<div class="selection-card"><small>${passages[id].source}</small>${passages[id].text}<br><button data-remove="${id}">Remove passage ×</button></div>` : `<div class="selection-card empty">${i + 1}. Pin a passage from a source<br><span class="small-note">Use the terminal or phone.</span></div>`; }).join(''); }
function showWall(message = '') {
  showDialog('The space between two sources', '03 / EVIDENCE WALL', 'wall');
  $('#reader-body').innerHTML = `<h3 class="wall-heading">${state.discovered ? 'Verified account. Unproven operator.' : 'What can these sources support?'}</h3><p class="muted">${state.discovered ? 'Your discovery separates what is established from what is still unknown.' : 'Pin two passages, then choose the claim they support. Doubt is a lead; it is not a verdict.'}</p><div class="selection-grid">${selectionCards()}</div>${state.discovered ? `<div class="feedback">${evaluateDiscovery(['summary-identity', 'verification-boundary'], 'operator-uncertain').message}</div><div class="rule"></div><span class="eyebrow">A GLIMPSE OF WHAT COMES NEXT</span><p>This demonstration stops at your first discovery. Explore a sample consequence to see how the Archive could respond later in the full case.</p><div class="decision-grid"><button data-choice="Publish"><b>Publish</b><span>A public record. An uncontrolled audience.</span></button><button data-choice="Bury"><b>Bury</b><span>A sealed record. An unanswered public question.</span></button><button data-choice="Preserve"><b>Preserve</b><span>A restricted record. A decision about access.</span></button></div>` : `<fieldset class="claim-list"><legend>Choose a working conclusion</legend><label><input type="radio" name="claim" value="account-is-person"> The verified account proves Mara herself returned.</label><label><input type="radio" name="claim" value="operator-uncertain"> Account verification does not establish who operates it.</label><label><input type="radio" name="claim" value="mara-replaced"> The verification report proves Mara was replaced.</label></fieldset><div class="button-row"><button class="primary" id="check-claim">Test this connection <span>↗</span></button><button class="hint" id="hint">I need a lead</button></div><p id="hint-copy" class="hint-copy" role="status"></p>`}<div id="feedback" role="status">${message ? `<div class="feedback">${message}</div>` : ''}</div>`;
  focusReaderTitle();
}
function focusReaderTitle() { $('#reader-title').tabIndex = -1; $('#reader-title').focus({ preventScroll: true }); dialog.scrollTop = 0; }
function openStation(station) { if (!state.started) start(); room?.approach(station); if (station === 'wall') showWall(); else openArtifact(station === 'phone' ? 'video' : 'summary'); }
function togglePin(id) {
  if (!Object.hasOwn(passages, id)) return;
  if (state.pins.includes(id)) state.pins = state.pins.filter(item => item !== id);
  else if (state.pins.length < 2) state.pins.push(id);
  else { notify('Two passages are already pinned. Remove one at the evidence wall to make room.'); return; }
  const button = $(`[data-pin="${id}"]`); if (button) { button.outerHTML = pinButton(id); $(`[data-pin="${id}"]`)?.focus(); }
  updateProgress(); notify(state.pins.length === 2 ? 'Two passages pinned. Test the connection at the evidence wall.' : 'Evidence selection updated.');
}
function showOutcome(choice) {
  const outcome = previewOutcome(state.discovered, choice); if (!outcome) return;
  state.outcome = choice; room?.outcome(outcome); room?.overview();
  $('#footer-text').textContent = outcome.status; $('#room-title').textContent = outcome.title; $('#room-description').textContent = outcome.consequence;
  showDialog('The Archive remembers', 'CONSEQUENCE STUDY / SAMPLE, NOT A COMMITTED CASE ENDING', 'wall');
  $('#reader-body').innerHTML = `<span class="eyebrow">${choice.toUpperCase()}</span><h3 class="ending-title">${outcome.title}</h3><p class="ending-text">${outcome.body}</p><p class="ending-label">${outcome.consequence}</p><div class="rule"></div><p class="small-note">This is an isolated demonstration. No decision has been written to your existing game. Reloading starts the demonstration again.</p><div class="button-row"><button class="primary" id="return-room">See the changed room <span>↗</span></button><button class="secondary" id="try-outcome">Explore another consequence</button></div>`;
  focusReaderTitle();
}
$('#enter').addEventListener('click', () => { start(); $('#label-phone').focus(); });
$('#quiet').addEventListener('click', () => { setQuiet(!state.quiet); notify(state.quiet ? 'Quiet mode. Camera movements are instant.' : 'Room motion restored.'); });
$('#view').addEventListener('click', () => setDesk(!state.desk));
document.querySelectorAll('[data-station]').forEach(button => button.addEventListener('click', () => openStation(button.dataset.station)));
$('#pinned').addEventListener('click', () => openStation('wall'));
$('#close-reader').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { pauseMedia(); room?.overview(); lastOpener?.focus?.(); });
$('#artifact-nav').addEventListener('click', event => { const button = event.target.closest('[data-artifact]'); if (button) openArtifact(button.dataset.artifact); });
$('#reader-body').addEventListener('click', event => {
  const button = event.target.closest('button'); if (!button) return;
  if (button.dataset.pin) togglePin(button.dataset.pin);
  if (button.dataset.remove) { state.pins = state.pins.filter(id => id !== button.dataset.remove); updateProgress(); showWall(); }
  if (button.id === 'check-claim') {
    const claim = $('input[name="claim"]:checked')?.value;
    const result = claim ? evaluateDiscovery(state.pins, claim) : { valid: false, message: 'Choose a conclusion to test against your two sources.' };
    if (result.valid) { state.discovered = true; room?.discovery(); $('#footer-text').textContent = 'ONE CONNECTION ESTABLISHED'; showWall(); }
    else $('#feedback').innerHTML = `<div class="feedback">${result.message}</div>`;
  }
  if (button.id === 'hint') {
    const hints = ['Start at the terminal. The public summary cites verification as evidence of Mara’s return.', 'Compare the summary’s return claim with the verification report’s reviewer note.', 'Pin the summary’s return claim and the report’s personal-continuity limitation. They support uncertainty about the operator, not proof of replacement.'];
    $('#hint-copy').textContent = hints[Math.min(state.hint++, 2)];
  }
  if (button.dataset.choice) showOutcome(button.dataset.choice);
  if (button.id === 'return-room') dialog.close();
  if (button.id === 'try-outcome') showWall();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseMedia(); });
addEventListener('pagehide', event => { pauseMedia(); if (!event.persisted) room?.dispose(); });
setQuiet(state.quiet);
try { room = createRoom($('#scene'), openStation, () => { setDesk(true, false); $('#view').disabled = true; notify('The 3D view is unavailable. All evidence is available in desk view.'); }); }
catch (error) { console.warn('Archive room unavailable:', error.message); setDesk(true, false); $('#view').disabled = true; notify('Your browser could not open the 3D room. The complete desk investigation is available.'); }
