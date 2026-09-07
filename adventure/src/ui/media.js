import { escapeHTML as e, button } from "./shared.js";
export function stopMedia() {
  document.querySelectorAll("audio,video").forEach((m) => m.pause());
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopMedia();
});
export function mediaHTML(source) {
  if (!source.media) return "";
  const m = source.media;
  return (
    '<div class="media-block">' +
    (m.type === "video"
      ? '<video controls playsinline preload="none" aria-label="Return recording"><source src="./' +
        e(m.path) +
        '" type="video/mp4"><source src="./' +
        e(m.alternate) +
        '" type="video/webm"><track kind="captions" src="./' +
        e(m.captions) +
        '" srclang="en" label="English" default></video>'
      : '<audio controls preload="none" aria-label="' +
        e(source.title) +
        '" src="./' +
        e(m.path) +
        '"></audio>') +
    button("Play recording", "play-media") +
    '<p class="caption">' +
    e(m.description) +
    '</p><p class="media-error" role="status"></p><details open><summary>Full transcript · play without sound</summary><p>' +
    e(m.transcript) +
    "</p></details></div>"
  );
}
export async function playMedia() {
  const media = document.querySelector("#sheet audio,#sheet video");
  if (!media) return;
  let timeout;
  try {
    await Promise.race([
      media.play(),
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(Error("Playback timed out.")), 3500);
      }),
    ]);
  } catch {
    media.pause();
    media.closest(".media-block").querySelector(".media-error").textContent =
      "Playback is unavailable. The full transcript below contains the same evidence.";
  } finally {
    clearTimeout(timeout);
  }
}
export function bindMedia() {
  document.querySelectorAll("audio,video").forEach((m) => {
    m.addEventListener("play", () => {
      document.querySelectorAll("audio,video").forEach((other) => {
        if (other !== m) other.pause();
      });
    });
    m.addEventListener("error", () => {
      m.closest(".media-block").querySelector(".media-error").textContent =
        "Playback is unavailable. The full transcript below contains the same evidence.";
    });
  });
}
