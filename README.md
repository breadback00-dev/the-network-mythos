# The Network Mythos

**The Network Mythos** is a playable interactive archive about synthetic identity, online communities, platform power, and the ethics of preserving truth.

Players investigate strange digital cases through an Archive Hub, read evidence dossiers, unlock deeper files, build theories, and decide what the Archive should do with the truth: **Publish**, **Bury**, or **Preserve**.

![Archive Hub screenshot](docs/images/archive-hub.png)

## What Is Playable

- **Archive Hub**: tracks case decisions, Archive pressure meters, mapped mythic forces, witnesses, vault entries, and consequences.
- **Case 001: The Door Is Real**: determine whether Mara Vale truly returned, and whether proof can protect a person without capturing them.
- **Case 002: The Half Synthetic Community**: investigate a support community where the most stabilizing members were synthetic.
- **Case 003: The Human Premium**: a locked case about human care becoming a luxury product. It unlocks after two Archive decisions.
- **Case 004: The Lost Archive**: a locked case about erased records, consent, and memory. It unlocks after three Archive decisions.

Each case contains 15 evidence artifacts, search/filter tools, contradiction flagging, investigator notes, theory prompts, evidence-pair discoveries, and a final Archive decision.

## New Direction and 3D Proof

The [current implementation plan](docs/plans/2026-09-07-1006-feat-illustrated-mystery-rpg-plan.md) develops the game as an illustrated mystery adventure with light RPG progression. The first target is a complete short Mara chapter with expressive avatars, media evidence, remembered choices and browser saves. This adaptation is planned, not yet implemented. [Earlier plans and revisions](docs/plans/README.md) remain saved.

Read the [native run instructions](game/README.md), [engine checkpoint and captures](docs/network-3d/engine-proof.md), and [experience bible](docs/network-3d/experience-bible.md). The Windows encounter includes source pinning, an animated Oracle, voice, vertical video, captions and a bounded review request. Human platform and feel checks remain pending. The [earlier browser room](https://github.com/breadback00-dev/the-network-mythos/tree/feat/archive-3d-proof/prototypes/archive-3d) is preserved on its historical branch as a record of progress.

[Preserved Oracle browser preview](https://enter-the-network.breadback00.chatgpt.site), currently private to the owner's account. The user reported that it did not work after the startup check; full browser playability is unverified. The [web preview record](docs/network-3d/web-preview.md) retains the build and verification history.

## Why It Is Interesting

The prototype treats investigation as an ethical system rather than a puzzle box. Solving a case is not enough; the player must decide how much truth should become public, what should remain protected, and what the Archive becomes as those decisions accumulate.

The current build explores:

- proof as a form of capture
- synthetic care that is emotionally real but consent-broken
- human attention as a premium market
- archives that can preserve the erased or consume them again
- cross-case consequences through shared Archive state

## Run Locally

Requirements:

- Node.js 18 or newer

Start the Archive Hub:

```powershell
node "Archive Hub\server.js"
```

Then open:

```text
http://127.0.0.1:4179/
```

On Windows, you can also double-click:

```text
Archive Hub/start-archive.bat
```

## Project Structure

```text
Archive Hub/
  index.html
  script.js
  styles.css
  server.js
  case-engine.js
Case 001 - The Door Is Real/
Case 002 - The Half Synthetic Community/
Case 003 - The Human Premium/
Case 004 - The Lost Archive/
docs/
  INDEX.md
  images/
```

The server auto-discovers folders named `Case 00X - ...` and exposes them to the Hub through `/cases/index.json`.

## Design North Star

Build an Archive strong enough to reveal the Network's structure without becoming another part of the Network's machinery.

## Useful Docs

- [Game design](GAME_DESIGN.md)
- [Architecture](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Docs index](docs/INDEX.md)
