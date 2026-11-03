#Brewly

A responsive landing page for a fictional coffee-delivery brand, built for Human-Computer Interaction, Lab 07 (PUCIT). The lab covers the design-to-code workflow: a layout is prepared in Figma, read through the Figma MCP server, and implemented as semantic HTML with Tailwind CSS.

Figma file: <add link>
Repository: <add link>
Live site: <add link>
Overview

The page has four sections, each mapped to a named frame in Figma:

Section	Purpose
Navbar	Brand, anchor links, primary call to action
Hero	Headline, supporting text, two buttons, illustration
Features	Three cards: Fresh roasted, Fast delivery, Made for everyone
Contact	Name, email and message form, followed by the footer
Tech stack
HTML5 with semantic landmarks (header, nav, main, section, footer)
Tailwind CSS v3, loaded from the CDN, so there is no build step
Vanilla JavaScript for client-side form validation only
SVG for the hero illustration and icons
Figma Plugin API for generating the design file
Figma MCP server (get_variable_defs, get_code) for design-to-code
Design system

Colours, spacing and radii are defined once as Figma variables (collection Brewly Tokens). The same values are exported to design/design-tokens.json and mirrored in the Tailwind config inside index.html.

Token	Value	Use
primary	
#1E3A5F	Headings, buttons, footer
accent	
#0E9F9B	Highlights, icons, focus rings
accent-soft	
#E6F6F5	Icon badges, hero background
background / surface	
#F8FAFC / 
#FFFFFF	Page and cards
text / muted / border	
#0F172A / 
#475569 / 
#E2E8F0	Body text, secondary text, dividers

Typography is Inter. Spacing follows an 8 / 16 / 24 / 48 / 96 px scale, with 8, 12 and 20 px corner radii.

Responsive behaviour

Layouts are built with Auto Layout in Figma and flexbox/grid in code, with no absolute positioning. The feature grid collapses from three columns to two to one across the three design widths.

Breakpoint	Width	Feature grid
Desktop	1440 px	3 columns
Tablet	768 px	2 columns
Mobile	375 px	1 column
Usability and accessibility
Native <a>, <button> and <input> elements, with no click handlers on generic containers
Every form field has a <label> bound by for/id
Visible hover and keyboard-focus states on all interactive elements
A "skip to main content" link for keyboard users
Descriptive alt text on the hero image; decorative icons use alt=""
Form feedback announced through an aria-live region
Body text and button colours chosen for strong contrast against their backgrounds
Project structure
.
├── index.html                  Website (HTML + Tailwind)
├── assets/                     Hero illustration and exported SVG icons
├── design/design-tokens.json   Design tokens exported from Figma variables
├── figma-plugin/               Plugin that generates the Figma file
│   ├── manifest.json
│   └── code.js
├── .vscode/mcp.json            Figma MCP server config (VS Code)
├── .cursor/mcp.json            Figma MCP server config (Cursor)
├── MCP-PROMPT.md               Prompt used with the Figma MCP tools
├── SETUP-GUIDE.md              Manual steps: Figma, MCP, GitHub, deployment
└── SUBMISSION-CHECKLIST.md     Lab tasks and deliverables checklist
Running locally

No installation is needed. Open index.html in a browser, or serve the folder:

bash
npx serve .
Figma workflow
figma-plugin/ builds the Desktop (1440) and Mobile (375) frames with Auto Layout, bound variables, semantic layer names and SVG-exportable icons.
The Figma MCP server is configured in .vscode/mcp.json. The prompt in MCP-PROMPT.md reads the variables and frame structure and generates the layout.
The generated structure is implemented in index.html and checked against the Figma frames.

See SETUP-GUIDE.md for the full procedure.

Deployment

The site is static and deploys from the repository root to GitHub Pages, Netlify or Vercel with no build command.

Author

Abdur Rehman Arif, HCI Lab 07, PUCIT.
