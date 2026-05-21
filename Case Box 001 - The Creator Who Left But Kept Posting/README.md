# Network Mythos: Case Box

Phase 1 prototype scaffold for a digital mystery box game set inside The Network Mythos.

The goal of Phase 1 is to test the core loop before building a full platform:

1. Open a case box.
2. Inspect evidence.
3. Solve nested mini-puzzles.
4. Tag evidence with mythic forces.
5. Let the player's tags shape the evidence route.
6. Submit a final reading.
7. Reveal both the canonical answer and the player's reading path.

## Run Locally

This project is intentionally static. Case data is available as a JavaScript module so the app can run from a direct `file:///` URL in restricted browser environments.

Open `index.html` directly, or run a small local server:

```powershell
python -m http.server 5174 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:5174/
```

## Project Shape

```text
network-mythos-case-box/
  index.html
  package.json
  README.md
  docs/
    game-design.md
    case-authoring.md
  src/
    data/
      case-001.json
    scripts/
      app.js
      case-engine.js
      puzzle-engine.js
      signal-engine.js
    styles/
      base.css
      layout.css
      components.css
  public/
    assets/
      .gitkeep
```

## Phase 1 Scope

Build one excellent case box before adding accounts, multiplayer, creator tools, or a backend.

Phase 1 should prove:

- People understand what to do.
- Evidence inspection is compelling.
- Force tagging feels meaningful.
- Nested puzzles add discovery rather than friction.
- The feedback loop makes players notice their own reading path.
- The final reveal creates conversation.
