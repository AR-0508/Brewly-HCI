// Brewly Lab07 Generator - builds the whole Lab 07 Figma file in one click.
// Creates: variables (colors/spacing/radius), Auto Layout frames, semantic layer names,
// SVG-exportable icons, a Desktop (1440) frame and a Mobile (375) frame.

const COLORS = {
  primary: "#1E3A5F",
  "primary-dark": "#152A45",
  accent: "#0E9F9B",
  "accent-soft": "#E6F6F5",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  muted: "#475569",
  border: "#E2E8F0",
};
const SPACING = { xs: 8, sm: 16, md: 24, lg: 48, xl: 96 };
const RADIUS = { sm: 8, md: 12, lg: 20 };

const vars = {}; // name -> Variable

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

function createVariables() {
  const col = figma.variables.createVariableCollection("Brewly Tokens");
  const modeId = col.modes[0].modeId;
  col.renameMode(modeId, "Light");
  for (const [k, hex] of Object.entries(COLORS)) {
    const v = figma.variables.createVariable("color/" + k, col, "COLOR");
    v.setValueForMode(modeId, rgb(hex));
    vars["color/" + k] = v;
  }
  for (const [k, n] of Object.entries(SPACING)) {
    const v = figma.variables.createVariable("spacing/" + k, col, "FLOAT");
    v.setValueForMode(modeId, n);
    vars["spacing/" + k] = v;
  }
  for (const [k, n] of Object.entries(RADIUS)) {
    const v = figma.variables.createVariable("radius/" + k, col, "FLOAT");
    v.setValueForMode(modeId, n);
    vars["radius/" + k] = v;
  }
}

// A solid paint bound to a color variable
function paint(key) {
  const base = { type: "SOLID", color: rgb(COLORS[key]) };
  return figma.variables.setBoundVariableForPaint(base, "color", vars["color/" + key]);
}

// Auto Layout frame helper
function frame(name, o = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = o.dir || "VERTICAL";
  f.itemSpacing = o.gap || 0;
  const p = o.pad || [0, 0, 0, 0]; // top, right, bottom, left
  f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3];
  f.primaryAxisAlignItems = o.main || "MIN";
  f.counterAxisAlignItems = o.cross || "MIN";
  f.fills = o.fill ? [paint(o.fill)] : [];
  if (o.radius) f.cornerRadius = o.radius;
  if (o.stroke) { f.strokes = [paint(o.stroke)]; f.strokeWeight = 1; }
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.clipsContent = false;
  return f;
}

function text(name, chars, o = {}) {
  const t = figma.createText();
  t.name = name;
  t.fontName = { family: "Inter", style: o.style || "Regular" };
  t.fontSize = o.size || 16;
  t.lineHeight = { unit: "PERCENT", value: o.lh || 150 };
  t.characters = chars;
  t.fills = [paint(o.color || "text")];
  if (o.align) t.textAlignHorizontal = o.align;
  return t;
}

// append + (optionally) Fill horizontally
function add(parent, child, fill) {
  parent.appendChild(child);
  if (fill) {
    child.layoutSizingHorizontal = "FILL";
    if (child.type === "TEXT") child.textAutoResize = "HEIGHT";
  }
  return child;
}

function button(name, label, kind) {
  const primary = kind === "primary";
  const b = frame(name, {
    dir: "HORIZONTAL", main: "CENTER", cross: "CENTER",
    pad: [14, 28, 14, 28], radius: RADIUS.sm,
    fill: primary ? "primary" : "surface",
    stroke: primary ? null : "primary",
  });
  add(b, text("Label", label, { style: "Semi Bold", color: primary ? "surface" : "primary" }));
  return b;
}

function icon(name, svgInner) {
  const wrap = frame("IconBadge/" + name, {
    dir: "HORIZONTAL", main: "CENTER", cross: "CENTER",
    pad: [12, 12, 12, 12], radius: RADIUS.md, fill: "accent-soft",
  });
  const svg =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0E9F9B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    svgInner + "</svg>";
  const node = figma.createNodeFromSvg(svg);
  node.name = "Icon/" + name;
  node.exportSettings = [{ format: "SVG" }]; // marked for SVG export
  wrap.appendChild(node);
  return wrap;
}

const ICONS = {
  Leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/>',
  Truck: '<rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  Cup: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><path d="M6 1v3M10 1v3M14 1v3"/>',
};

function featureCard(iconName, title, body) {
  const c = frame("FeatureCard", {
    gap: SPACING.sm, pad: [SPACING.md, SPACING.md, SPACING.md, SPACING.md],
    radius: RADIUS.lg, fill: "surface", stroke: "border",
  });
  add(c, icon(iconName, ICONS[iconName]));
  add(c, text("CardTitle", title, { size: 20, style: "Semi Bold" }), true);
  add(c, text("CardText", body, { color: "muted" }), true);
  return c;
}

function input(name, placeholder, h) {
  const i = frame("Input/" + name, {
    dir: "HORIZONTAL", pad: [14, 16, 14, 16], radius: RADIUS.sm, fill: "surface", stroke: "border",
  });
  i.counterAxisAlignItems = "MIN";
  add(i, text("Placeholder", placeholder, { color: "muted" }));
  if (h) { i.primaryAxisSizingMode = "FIXED"; i.counterAxisSizingMode = "FIXED"; i.resize(100, h); }
  return i;
}

function field(label, placeholder, h) {
  const f = frame("FormField/" + label, { gap: 6 });
  add(f, text("Label", label, { size: 14, style: "Medium" }));
  const inp = input(label, placeholder, h);
  add(f, inp, true);
  if (h) inp.layoutSizingVertical = "FIXED";
  return f;
}

function buildPage(label, width, mobile) {
  const padX = mobile ? SPACING.sm : 120;
  const page = frame("Page/" + label + " " + width, { fill: "background" });
  page.counterAxisSizingMode = "FIXED";
  page.resize(width, 100);
  page.primaryAxisSizingMode = "AUTO";

  // 1. Navbar
  const nav = frame("Navbar", {
    dir: "HORIZONTAL", main: "SPACE_BETWEEN", cross: "CENTER",
    pad: [20, padX, 20, padX], fill: "surface", stroke: "border",
  });
  add(nav, text("Logo", "Brewly", { size: 24, style: "Bold", color: "primary" }));
  if (!mobile) {
    const links = frame("NavLinks", { dir: "HORIZONTAL", gap: SPACING.lg, cross: "CENTER" });
    ["Home", "Features", "Contact"].forEach((l) =>
      add(links, text("NavLink/" + l, l, { style: "Medium", color: "muted" })));
    add(nav, links);
    add(nav, button("PrimaryButton", "Order now", "primary"));
  } else {
    add(nav, text("MenuLabel", "Menu", { style: "Medium", color: "primary" }));
  }
  add(page, nav, true);

  // 2. Hero
  const hero = frame("HeroSection", {
    dir: mobile ? "VERTICAL" : "HORIZONTAL", gap: mobile ? SPACING.lg : SPACING.xl,
    cross: "CENTER", pad: [mobile ? 48 : SPACING.xl, padX, mobile ? 48 : SPACING.xl, padX],
  });
  const copy = frame("HeroCopy", { gap: SPACING.md });
  add(copy, text("Badge", "Freshly roasted, every morning", { size: 14, style: "Semi Bold", color: "accent" }), true);
  add(copy, text("HeroTitle", "Great coffee, delivered to your door.", { size: mobile ? 36 : 56, style: "Bold", color: "primary", lh: 115 }), true);
  add(copy, text("HeroSubtitle", "Small-batch beans from trusted farms, roasted fresh and shipped within 24 hours.", { size: mobile ? 16 : 18, color: "muted" }), true);
  const ctas = frame("HeroActions", { dir: "HORIZONTAL", gap: SPACING.sm });
  add(ctas, button("PrimaryButton", "Shop coffee", "primary"));
  add(ctas, button("SecondaryButton", "Learn more", "secondary"));
  add(copy, ctas);
  add(hero, copy, true);

  const img = figma.createRectangle();
  img.name = "HeroImage";
  img.cornerRadius = RADIUS.lg;
  img.fills = [paint("accent-soft")];
  img.resize(mobile ? width - 2 * padX : 520, mobile ? 220 : 380);
  hero.appendChild(img);
  if (mobile) img.layoutSizingHorizontal = "FILL";
  add(page, hero, true);

  // 3. Features
  const feat = frame("FeaturesSection", {
    gap: SPACING.lg, pad: [mobile ? 48 : SPACING.xl, padX, mobile ? 48 : SPACING.xl, padX], fill: "surface",
  });
  const head = frame("SectionHeading", { gap: SPACING.xs });
  add(head, text("SectionTitle", "Why people love Brewly", { size: mobile ? 28 : 36, style: "Bold", color: "primary" }), true);
  add(head, text("SectionSubtitle", "Three simple reasons to make us your daily cup.", { color: "muted" }), true);
  add(feat, head, true);
  const grid = frame("FeatureGrid", { dir: mobile ? "VERTICAL" : "HORIZONTAL", gap: SPACING.md });
  add(grid, featureCard("Leaf", "Fresh roasted", "Roasted in small batches so every cup tastes bright and full of flavour."), true);
  add(grid, featureCard("Truck", "Fast delivery", "Order before noon and your beans leave our roastery the same day."), true);
  add(grid, featureCard("Cup", "Made for everyone", "From espresso fans to filter lovers, pick the roast that suits you."), true);
  add(feat, grid, true);
  add(page, feat, true);

  // 4. Contact
  const contact = frame("ContactSection", {
    gap: SPACING.md, pad: [mobile ? 48 : SPACING.xl, padX, mobile ? 48 : SPACING.xl, padX],
  });
  add(contact, text("SectionTitle", "Get in touch", { size: mobile ? 28 : 36, style: "Bold", color: "primary" }), true);
  add(contact, text("SectionSubtitle", "Questions about an order? Send us a message.", { color: "muted" }), true);
  const form = frame("ContactForm", {
    gap: SPACING.sm, pad: [SPACING.md, SPACING.md, SPACING.md, SPACING.md],
    radius: RADIUS.lg, fill: "surface", stroke: "border",
  });
  add(form, field("Name", "Your name"), true);
  add(form, field("Email", "you@example.com"), true);
  add(form, field("Message", "How can we help?", 120), true);
  add(form, button("PrimaryButton", "Send message", "primary"));
  add(contact, form, true);
  add(page, contact, true);

  // Footer
  const footer = frame("Footer", {
    dir: "HORIZONTAL", main: "SPACE_BETWEEN", cross: "CENTER",
    pad: [SPACING.md, padX, SPACING.md, padX], fill: "primary",
  });
  add(footer, text("FooterBrand", "Brewly", { size: 18, style: "Bold", color: "surface" }));
  add(footer, text("FooterCopy", "© 2026 Brewly. HCI Lab 07, PUCIT.", { size: 14, color: "border" }));
  add(page, footer, true);

  return page;
}

async function main() {
  for (const style of ["Regular", "Medium", "Semi Bold", "Bold"]) {
    await figma.loadFontAsync({ family: "Inter", style });
  }
  createVariables();

  const desktop = buildPage("Desktop", 1440, false);
  const mobile = buildPage("Mobile", 375, true);
  desktop.x = 0; desktop.y = 0;
  mobile.x = 1440 + 120; mobile.y = 0;
  figma.currentPage.name = "Brewly - Lab 07";

  figma.currentPage.selection = [desktop, mobile];
  figma.viewport.scrollAndZoomIntoView([desktop, mobile]);
  figma.notify("Brewly Lab 07 design created. Now publish the file link (Share > Anyone with the link can view).");
  figma.closePlugin();
}

main().catch((e) => { figma.notify("Error: " + e.message, { error: true }); figma.closePlugin(); });
