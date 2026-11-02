# Figma MCP prompt (Lab 07)

Replace `<FIGMA-FRAME-LINK>` with the link from **Right-click frame > Copy/Paste as > Copy link to selection**.

```
Using the Figma MCP server, inspect this frame selection: <FIGMA-FRAME-LINK>
Extract design variables (#get_variable_defs), and generate a responsive
HTML5 + Tailwind CSS layout (#get_code) with semantic landmarks
(<header>, <nav>, <main>, <section>, <footer>), native <button>/<a>/<input>,
visible hover and focus states, <label>s bound to inputs, and descriptive alt text.
Avoid position:absolute. Make the card grid stack at 768px and 375px.
```

## MCP configuration used

- Remote: `https://mcp.figma.com/mcp` (see `.vscode/mcp.json`, `.cursor/mcp.json`)
- Local desktop (optional): `http://127.0.0.1:3845/mcp` (enable in Figma Desktop > Preferences > Enable local MCP server)

## Tools invoked

- `get_variable_defs`: reads colour / spacing variables (Brewly Tokens)
- `get_code`: generates the layout from the selected frame
- `get_metadata`: layer hierarchy (optional)
