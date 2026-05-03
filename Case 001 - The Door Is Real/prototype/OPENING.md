# Opening The Prototype

The in-app browser can be unreliable with `file://` paths, especially when Windows paths and `/mnt/c/` paths get mixed.

Use localhost instead.

## Reliable Method

1. Double-click `start-prototype.bat`.
2. Keep the black terminal window open.
3. Open this URL in the in-app browser:

```text
http://localhost:4177/prototype/
```

## If Port 4177 Is Busy

Edit `start-prototype.bat` and change `4177` to another port, such as `4188`.

Then open:

```text
http://localhost:4188/prototype/
```

## Why Not Just Click index.html?

Browsers often restrict local files. Even when the HTML opens, scripts, storage, or linked project files may be blocked or path-mangled.

`localhost` makes the prototype behave like a normal website.

