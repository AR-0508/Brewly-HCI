# Brewly: HCI Lab 07 (Figma to Website)

PUCIT, Human-Computer Interaction, Lab 07.
A four-section responsive website (Navbar, Hero + CTA, 3-card Feature Grid, Contact Form + Footer) designed in Figma with Auto Layout and variables, then converted to semantic HTML5 + Tailwind CSS.

## Project structure

```
hci-lab07/
├── index.html                  # Final website (HTML5 + Tailwind CSS via CDN)
├── assets/                     # hero.svg + 3 exported icon SVGs
├── design/design-tokens.json   # Colour / spacing / radius tokens (mirror of Figma variables)
├── figma-plugin/               # One-click plugin that builds the Figma file
│   ├── manifest.json
│   └── code.js
├── .vscode/mcp.json            # Figma MCP config for VS Code
├── .cursor/mcp.json            # Figma MCP config for Cursor
├── MCP-PROMPT.md               # Prompt used with the Figma MCP tools
└── SUBMISSION-CHECKLIST.md     # Tick-list mapped to the lab PDF
```

## Palette

| Token | Hex | Use |
|---|---|---|
| primary | `#1E3A5F` | Navbar text, headings, buttons, footer |
| accent | `#0E9F9B` | Highlights, icons |
| accent-soft | `#E6F6F5` | Icon badges, hero image bg |
| background | `#F8FAFC` | Page |
| surface | `#FFFFFF` | Cards, inputs |
| text / muted / border | `#0F172A` / `#475569` / `#E2E8F0` | Body, secondary text, dividers |

---

## STEP-BY-STEP: what YOU do manually

### Part A: Create the Figma file (about 5 min)

1. Go to figma.com, log in, and create a **new Design file**. Rename it `Brewly - HCI Lab 07`.
2. Install the plugin from this folder: use **Figma Desktop App** (plugins under development need it).
   - Menu: **Plugins > Development > Import plugin from manifest...**
   - Select `figma-plugin/manifest.json`.
3. Run it: **Plugins > Development > Brewly Lab07 Generator**.
   It creates a Desktop (1440) frame and a Mobile (375) frame, all using Auto Layout, with the variable collection **Brewly Tokens** (colours, spacing, radius) and semantic layer names (`Navbar`, `HeroSection`, `PrimaryButton`, `FeatureCard`, `ContactForm`, `Footer`). Icons are marked for SVG export.
4. Check **Local variables** (right panel, nothing selected > "Local variables" icon) to confirm the variables exist (this is evidence for the lab).
5. **Share**: top-right **Share > Anyone with the link > Can view > Copy link**. This is deliverable #1.
6. Copy the frame link for MCP: right-click the **Page/Desktop 1440** frame > **Copy/Paste as > Copy link to selection**.

> If the plugin shows an error about fonts, install the free **Inter** font (fonts.google.com/specimen/Inter) and re-run. If the import menu isn't there, you're probably in the browser; open the desktop app.

### Part B: Connect Figma MCP in VS Code (about 5 min)

1. Open this folder in VS Code (**File > Open Folder > hci-lab07**).
2. The config is already in `.vscode/mcp.json`. Open it; a small **Start** link appears above `"figma"`. Click it.
   (Or: Command Palette `Ctrl+Shift+P` > **MCP: Add Server** > HTTP > `https://mcp.figma.com/mcp` > name `figma`.)
3. A browser window opens to sign in to Figma and **Allow access**.
4. Open **Copilot Chat** (or Antigravity / Cursor) in **Agent mode**, click the tools icon, and confirm `figma` tools are listed (`get_code`, `get_variable_defs`, ...).
5. Paste the prompt from `MCP-PROMPT.md` with your Figma frame link. Let the agent run `get_variable_defs` and `get_code`.
6. Compare its output with the `index.html` already in this folder and keep whichever you prefer. The provided `index.html` already meets every Task 3 requirement, so you can use the agent's output as reference. **Take a screenshot** of the MCP tool call running. It is good evidence.

*Alternative (plugin route):* in Figma run **Builder.io Visual Copilot** or **Locofy** on the Desktop frame, export HTML + Tailwind, and add the screenshot to your report.

### Part C: Test responsiveness and accessibility (about 5 min)

1. Open `index.html` in Chrome. Press **F12 > Ctrl+Shift+M** (device toolbar).
2. Check widths **1440**, **768** and **375**: cards go 3 columns > 2 > 1, with no horizontal scrollbar.
3. Press **Tab** repeatedly: every link, button and field shows a visible teal focus ring. Hover over buttons and cards to see hover states.
4. Click each label in the form; the matching input should focus.

### Part D: Push to GitHub (about 5 min)

In a terminal inside the `hci-lab07` folder:
```bash
git init
git add .
git commit -m "HCI Lab 07: Figma to website (Brewly)"
git branch -M main
```

1. On github.com click **New repository**, name it `hci-lab07-brewly`, set it to **Public**, don't tick "Add README", then **Create**.
2. Back in the terminal (replace `YOUR-USERNAME`):

```bash
git remote add origin https://github.com/YOUR-USERNAME/hci-lab07-brewly.git
git push -u origin main
```

If asked to log in, use your GitHub username and a **Personal Access Token** (GitHub > Settings > Developer settings > Tokens) or sign in through the browser prompt. Deliverable #2 is the repo URL.

### Part E: Deploy (pick ONE, GitHub Pages is easiest)

**GitHub Pages**
1. Repo > **Settings > Pages**.
2. Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)` > **Save**.
3. Wait about 1 minute. Your URL: `https://YOUR-USERNAME.github.io/hci-lab07-brewly/`.

**Netlify (alternative)**: app.netlify.com > **Add new site > Import an existing project > GitHub** > choose the repo > leave build command empty, publish directory `.` > **Deploy**.

**Vercel (alternative)**: vercel.com > **Add New > Project** > import the repo > Framework: **Other** > **Deploy**.

Open the live URL on your phone as a final check. Deliverable #3 is that URL.

### Part F: Submit

Submit the 3 links (Figma, GitHub, Live site). See `SUBMISSION-CHECKLIST.md`.

---

## Note on how the code was produced

`index.html` follows the Figma structure 1:1 (same sections, tokens and component names). Tailwind is loaded from the CDN, which keeps the project build-free and simple. Tokens in `tailwind.config` match `design/design-tokens.json` and the Figma variables.
