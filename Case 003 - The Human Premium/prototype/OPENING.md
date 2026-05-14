# Opening The Prototype

Use the unified Archive Hub server. It keeps the Hub and all cases under one origin so Archive choices can share browser storage.

## Start Server

From the `online game concept` folder:

```powershell
node "Archive Hub\server.js"
```

Or double-click:

```text
Archive Hub/start-archive.bat
```

## Open Case

```text
http://127.0.0.1:4179/case003/prototype/
```

Do not use old standalone case ports for active testing. They do not share Archive state with the Hub.
