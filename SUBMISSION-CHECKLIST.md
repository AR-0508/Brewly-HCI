# Lab 07 Submission Checklist

## Task 1: Prepare & optimize the Figma file
- [ ] Auto Layout on all frames, with explicit padding / gap / alignment (plugin does this)
- [ ] Cards and containers set to Fill horizontally, Hug vertically (plugin does this)
- [ ] Layers renamed: Navbar, HeroSection, PrimaryButton, FeatureCard, ContactForm, Footer (plugin does this)
- [ ] Colour / spacing / radius variables defined (collection "Brewly Tokens")
- [ ] Icons marked for SVG export (`Icon/Leaf`, `Icon/Truck`, `Icon/Cup`)

## Task 2: MCP server & conversion tools
- [ ] Figma MCP added in VS Code / Cursor / Antigravity (`.vscode/mcp.json`)
- [ ] Frame link copied; prompt from `MCP-PROMPT.md` run with `get_variable_defs` and `get_code`
- [ ] Screenshot of the MCP call saved for your report

## Task 3: Responsiveness & HCI usability
- [ ] No `position: absolute` layout (none used in `index.html`)
- [ ] Landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`; native `<a>`, `<button>`, `<input>`
- [ ] Tested at 1440 / 768 / 375 with no horizontal overflow
- [ ] Hover + focus states on all interactive elements
- [ ] `<label for>` bound to every form input
- [ ] Descriptive `alt` on the hero image (decorative icons use `alt=""`)

## Task 4: Deploy & submit
- [ ] Public GitHub repo pushed
- [ ] Live site on GitHub Pages / Netlify / Vercel

## Deliverables
1. [ ] Public Figma file link: ______________________________
2. [ ] GitHub repository URL: ______________________________
3. [ ] Live website URL: ___________________________________
