/* ===== 1. TYPES DE BLOCS : ajoute les tiens ici =====
   tag       : balise HTML générée
   list      : true => le bloc contient des <li> éditables un par un
   text      : texte par défaut
   css       : CSS par défaut (appliqué à la classe du bloc)
   container : true => ce bloc peut contenir d'autres blocs
*/
const BLOCK_TYPES = {
  // --- Texte ---
  titre: { cat: "texte", tag: "h1", text: "Titre", css: "" },
  sous_titre: { cat: "texte", tag: "h2", text: "sous-titre", css: "" },
  rubrique: { cat: "texte", tag: "h3", text: "", css: "" },
  texte: { cat: "texte", tag: "p", text: "Texte", css: "" },
  bouton: { cat: "texte", tag: "button", text: "Bouton", css: "" },
  // --- Mise en page ---
  boite: {
    cat: "mise_en_page",
    tag: "div",
    text: "",
    css: "",
    container: true,
  },
  // --- Structure de page ---
  en_tête: {
    cat: "structure",
    tag: "header",
    text: "",
    css: "",
    container: true,
  },

  pied_de_page: {
    cat: "structure",
    tag: "footer",
    text: "",
    css: "",
    container: true,
  },

  // --- Médias ---
  image: { cat: "medias", tag: "img", text: "", css: "max-width: 100%;" }, // text = texte alternatif (alt)
  vidéo: { cat: "medias", tag: "video", text: "", css: "max-width: 100%;" }, // fichier importé ou lien (mp4, YouTube...)

  // --- Listes ---
  liste: { cat: "listes", tag: "ul", text: "", css: "", list: true },
  liste_ordonnée: { cat: "listes", tag: "ol", text: "", css: "", list: true },
};

/* Catégories de blocs (ordre d'affichage dans la palette) */
const CATEGORIES = {
  texte: "Texte",
  mise_en_page: "Mise en page",
  structure: "Structure de page",
  medias: "Médias",
  listes: "Listes",
};

/* ===== 1 bis. BLOCS CSS : le choix proposé aux utilisateurs =====
   Les utilisateurs ne peuvent PAS écrire de CSS : ils choisissent seulement
   parmi les blocs définis ici (clic ou glisser sur un bloc de la page).
   Pour ajouter un bloc : "Nom affiché": "code CSS;"  (\n pour plusieurs lignes)
   Pour ajouter une catégorie : ajoute une nouvelle entrée au niveau du dessus. */
const CSS_SNIPPETS = {
  /* --- Réglages : blocs dont on choisit soi-même la valeur (taille en px, couleur...) --- */
  Réglages: {
    "Taille du texte": "font-size: 16px;",
    "Épaisseur du texte": "font-weight: 400;",
    Interligne: "line-height: 1.5;",
    "Espacement des lettres": "letter-spacing: 1px;",
    "Couleur du texte": "color: #000000;",
    "Couleur de fond": "background-color: #ffffff;",
    Largeur: "width: 300px;",
    "Largeur min": "min-width: 100px;",
    "Largeur max": "max-width: 600px;",
    Hauteur: "height: 200px;",
    "Hauteur min": "min-height: 100px;",
    "Hauteur max": "max-height: 400px;",
    "Marge extérieure": "margin: 10px;",
    "Marge extérieure haut": "margin-top: 10px;",
    "Marge extérieure bas": "margin-bottom: 10px;",
    "Marge extérieure gauche": "margin-left: 10px;",
    "Marge extérieure droite": "margin-right: 10px;",
    "Marge intérieure": "padding: 10px;",
    "Marge intérieure haut": "padding-top: 10px;",
    "Marge intérieure bas": "padding-bottom: 10px;",
    "Marge intérieure gauche": "padding-left: 10px;",
    "Marge intérieure droite": "padding-right: 10px;",
    "Écart entre les blocs": "gap: 10px;",
    "Bordure réglable": "border: 1px solid #000000;",
    "Arrondi des coins": "border-radius: 8px;",
    "Ombre réglable": "box-shadow: 0px 4px 8px #999999;",
    Opacité: "opacity: 1;",
    Rotation: "transform: rotate(0deg);",
    "Zoom (échelle)": "transform: scale(1);",
    "Décalage depuis le haut": "top: 0px;",
    "Décalage depuis la gauche": "left: 0px;",
    "Décalage depuis la droite": "right: 0px;",
    "Décalage depuis le bas": "bottom: 0px;",
    "Ordre de superposition": "z-index: 1;",
  },

  /* --- Texte : alignement, style, taille --- */
  Texte: {
    Centré: "text-align: center;",
    "Aligné à droite": "text-align: right;",
    "Aligné à gauche": "text-align: left;",
    Justifié: "text-align: justify;",
    Gras: "font-weight: bold;",
    Italique: "font-style: italic;",
    Souligné: "text-decoration: underline;",
    "Sans soulignement": "text-decoration: none;",
    Majuscules: "text-transform: uppercase;",
    "Petit texte": "font-size: 14px;",
    "Texte moyen": "font-size: 18px;",
    "Grand texte": "font-size: 28px;",
    "Très grand texte": "font-size: 48px;",
    "Interligne aéré": "line-height: 1.6;",
    "Police avec empattements": "font-family: Georgia, serif;",
    "Police sans empattements": "font-family: Arial, sans-serif;",
  },

  /* --- Couleurs du texte --- */
  Couleurs: {
    "Texte rouge": "color: #dc2626;",
    "Texte bleu": "color: #2563eb;",
    "Texte vert": "color: #16a34a;",
    "Texte blanc": "color: white;",
    "Texte noir": "color: black;",
    "Texte gris": "color: #6b7280;",
    "Texte jaune": "color: #eab308;",
    "Texte orange": "color: #ea580c;",
    "Texte violet": "color: #7c3aed;",
    "Texte rose": "color: #db2777;",
    "Texte turquoise": "color: #2dc6d2;",
    "Texte bleu foncé": "color: #002dce;",
  },

  /* --- Couleurs de fond --- */
  Fonds: {
    "Fond blanc": "background: white;",
    "Fond noir": "background: black;",
    "Fond gris clair": "background: #f1f5f9;",
    "Fond sombre": "background: #1e293b;\ncolor: white;",
    "Fond jaune": "background: #fef08a;",
    "Fond bleu": "background: #2563eb;",
    "Fond bleu clair": "background: #dbeafe;",
    "Fond rouge clair": "background: #fee2e2;",
    "Fond vert clair": "background: #dcfce7;",
    "Fond orange clair": "background: #fed7aa;",
    "Fond violet clair": "background: #ede9fe;",
    "Fond rose clair": "background: #fce7f3;",
    "Fond turquoise": "background: #2dc6d2;",
    "Fond bleu foncé": "background: #002dce;\ncolor: white;",
  },

  /* --- Disposition : où se placent les blocs À L'INTÉRIEUR d'un bloc conteneur --- */
  Disposition: {
    "Côte à côte": "display: flex;\nflex-direction: row;",
    "Les uns sous les autres": "display: flex;\nflex-direction: column;",
    "Centrer le contenu": "display: flex;\njustify-content: center;\nalign-items: center;",
    "Espacer les blocs": "display: flex;\njustify-content: space-between;",
    "Contenu à droite": "display: flex;\njustify-content: flex-end;",
    "Retour à la ligne auto": "flex-wrap: wrap;",
    "Écart de 10px": "gap: 10px;",
    "Écart de 20px": "gap: 20px;",
    "Grille 2 colonnes": "display: grid;\ngrid-template-columns: repeat(2, 1fr);\ngap: 10px;",
    "Grille 3 colonnes": "display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 10px;",
  },

  /* --- Position : où se place le bloc LUI-MÊME dans la page --- */
  Position: {
    "Bloc centré": "display: block;\nmargin-left: auto;\nmargin-right: auto;",
    "Bloc à droite": "display: block;\nmargin-left: auto;",
    "Bloc à gauche": "display: block;\nmargin-right: auto;",
    "Flotte à gauche (texte autour)": "float: left;\nmargin-right: 10px;",
    "Flotte à droite (texte autour)": "float: right;\nmargin-left: 10px;",
    "Collé en haut au défilement": "position: sticky;\ntop: 0;",
    "Au-dessus des autres": "position: relative;\nz-index: 10;",
  },

  /* --- Tailles --- */
  Tailles: {
    "Largeur 100%": "width: 100%;",
    "Largeur 75%": "width: 75%;",
    "Largeur 50%": "width: 50%;",
    "Largeur 25%": "width: 25%;",
    "Largeur 300px": "width: 300px;",
    "Largeur max 600px": "max-width: 600px;",
    "Hauteur 200px": "height: 200px;",
    "Hauteur de l'écran": "min-height: 100vh;",
    "Image qui remplit (cover)": "object-fit: cover;",
  },

  /* --- Espacements --- */
  espacements: {
    "espacements haut": "margin-top: 0px;",
    "Sans marge": "margin: 0;",
    "Marge extérieure petite": "margin: 8px;",
    "Marge extérieure moyenne": "margin: 16px;",
    "Marge extérieure grande": "margin: 32px;",
    "Marge en haut 20px": "margin-top: 20px;",
    "Marge en bas 20px": "margin-bottom: 20px;",
    "Marge intérieure petite": "padding: 8px;",
    "Marge intérieure moyenne": "padding: 16px;",
    "Marge intérieure grande": "padding: 32px;",
  },

  /* --- Bordures et formes --- */
  Bordures: {
    "Sans bordure": "border: none;",
    "Bordure fine noire": "border: 1px solid black;",
    "Bordure épaisse noire": "border: 3px solid black;",
    "Bordure grise": "border: 1px solid #cbd5e1;",
    "Coins arrondis": "border-radius: 12px;",
    "Très arrondi (pilule)": "border-radius: 999px;",
    "Ombre légère": "box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);",
  },
};

/* ===== 2. ÉTAT =====
   Arbre : [{ id, type, tag, text, css, children: [] | null }]
   children vaut null pour un bloc qui ne peut pas contenir d'autres blocs */
let blocks = [];
let nextId = 1;
let selectedId = null; // bloc sélectionné (cible des clics sur les blocs CSS)

// Tous les blocs CSS regroupés par catégorie : { cat: [{ name, css }] }
function allCssBlocks() {
  const out = {};
  Object.entries(CSS_SNIPPETS).forEach(([cat, items]) => {
    out[cat] = Object.entries(items).map(([name, css]) => ({ name, css }));
  });
  return out;
}
// Retrouve la catégorie d'un bloc CSS à partir de son nom
function cssCatOf(name) {
  return Object.keys(CSS_SNIPPETS).find((cat) => name in CSS_SNIPPETS[cat]);
}
// Ajoute un bloc CSS à un bloc HTML
function applyCssBlock(id, name, css) {
  const loc = find(id);
  if (!loc) return;
  loc.block.cssBlocks.push({ name, css });
  render();
}

/* ===== 3. OUTILS POUR L'ARBRE ===== */
// Retrouve un bloc : { block, list (tableau qui le contient), index }
function find(id, list = blocks) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return { block: list[i], list, index: i };
    if (list[i].children) {
      const r = find(id, list[i].children);
      if (r) return r;
    }
  }
  return null;
}
// Liste d'enfants d'un parent (null = racine)
function getList(parentId) {
  return parentId == null ? blocks : find(parentId).block.children;
}
// Est-ce que "id" se trouve quelque part à l'intérieur de "block" ?
function contains(block, id) {
  return (
    !!block.children &&
    block.children.some((c) => c.id === id || contains(c, id))
  );
}

/* ===== 4. ACTIONS ===== */
function addBlock(type, parentId = null, index) {
  const t = BLOCK_TYPES[type];
  const list = getList(parentId);
  if (index === undefined) index = list.length;
  list.splice(index, 0, {
    id: nextId++,
    type,
    tag: t.tag,
    text: t.text,
    css: t.css,
    cssBlocks: [], // blocs CSS ajoutés à ce bloc : [{ name, css }]
    children: t.container ? [] : null,
    items: t.list ? ["Élément 1"] : null, // contenu des <li>
    src: "", // image importée (data URL)
    fileName: "", // nom du fichier importé
  });
  render();
}
function removeBlock(id) {
  const loc = find(id);
  loc.list.splice(loc.index, 1);
  render();
}
function moveBlockTo(id, parentId, index) {
  const loc = find(id);
  const target = getList(parentId);
  const [b] = loc.list.splice(loc.index, 1);
  if (loc.list === target && loc.index < index) index--;
  target.splice(index, 0, b);
  render();
}
function moveBlock(id, dir) {
  const loc = find(id);
  const j = loc.index + dir;
  if (j < 0 || j >= loc.list.length) return;
  [loc.list[loc.index], loc.list[j]] = [loc.list[j], loc.list[loc.index]];
  render();
}

/* ===== 5. GÉNÉRATION DU CODE ===== */
// Vidéo : lien YouTube / Vimeo -> <iframe>, sinon balise <video controls>
function videoEmbedUrl(url) {
  let m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return "https://www.youtube.com/embed/" + m[1];
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return "https://player.vimeo.com/video/" + m[1];
  return null;
}
function videoHtml(b, pad, forCode) {
  const src = forCode ? b.fileName : b.src;
  const embed = videoEmbedUrl(b.fileName || "");
  if (embed)
    return `${pad}<iframe class="bloc-${b.id}" src="${embed}" width="560" height="315" allowfullscreen></iframe>`;
  return `${pad}<video class="bloc-${b.id}" controls${src ? ` src="${src}"` : ""}></video>`;
}
// forCode = true : on affiche le nom du fichier au lieu de l'image encodée (trop longue)
function htmlOf(list, depth = 0, forCode = false) {
  const pad = "  ".repeat(depth);
  return list
    .map((b) => {
      if (b.tag === "video") return videoHtml(b, pad, forCode);
      if (b.tag === "img") {
        const src = forCode ? b.fileName : b.src;
        return `${pad}<img class="bloc-${b.id}" src="${src}" alt="${b.text}">`;
      }
      if (b.items) {
        const lis = b.items.map((it) => `${pad}  <li>${it}</li>`).join("\n");
        return `${pad}<${b.tag} class="bloc-${b.id}">${lis ? "\n" + lis + "\n" + pad : ""}</${b.tag}>`;
      }
      const kids =
        b.children && b.children.length
          ? "\n" + htmlOf(b.children, depth + 1, forCode) + "\n" + pad
          : "";
      const text = b.children ? "" : b.text; // un conteneur n'a pas de texte
      return `${pad}<${b.tag} class="bloc-${b.id}">${text}${kids}</${b.tag}>`;
    })
    .join("\n");
}
function cssOf(list) {
  return list
    .map((b) => {
      const all = [b.css, ...b.cssBlocks.map((c) => c.css)]
        .map((x) => x.trim())
        .filter(Boolean)
        .join("\n")
        .split("\n")
        .join("\n  ");
      let out = `.bloc-${b.id} {\n  ${all}\n}`;
      if (b.children && b.children.length) out += "\n\n" + cssOf(b.children);
      return out;
    })
    .join("\n\n");
}
function generateHTML(forCode = false) {
  return htmlOf(blocks, 0, forCode);
}
function generateCSS() {
  return cssOf(blocks);
}

/* ===== 5 bis. CODE COLORÉ (affichage "Voir le code") =====
   Chaque ligne / règle est enveloppée dans un <span> qui porte la catégorie
   (data-cat) et le type (data-type) du bloc : le CSS la colore comme le bloc. */
const escHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const codeSpan = (cls, b, text) =>
  `<span class="${cls}" data-cat="${BLOCK_TYPES[b.type]?.cat || ""}" data-type="${b.type}">${escHtml(text)}</span>`;

// Même texte que htmlOf(..., true), mais ligne par ligne et coloré
function htmlCodeColored(list, depth = 0) {
  const pad = "  ".repeat(depth);
  return list
    .map((b) => {
      const ln = (text) => codeSpan("code-line", b, text);
      if (b.tag === "video") return ln(videoHtml(b, pad, true));
      if (b.tag === "img")
        return ln(`${pad}<img class="bloc-${b.id}" src="${b.fileName}" alt="${b.text}">`);
      if (b.items) {
        if (!b.items.length)
          return ln(`${pad}<${b.tag} class="bloc-${b.id}"></${b.tag}>`);
        return (
          ln(`${pad}<${b.tag} class="bloc-${b.id}">`) +
          b.items.map((it) => ln(`${pad}  <li>${it}</li>`)).join("") +
          ln(`${pad}</${b.tag}>`)
        );
      }
      if (b.children && b.children.length)
        return (
          ln(`${pad}<${b.tag} class="bloc-${b.id}">`) +
          htmlCodeColored(b.children, depth + 1) +
          ln(`${pad}</${b.tag}>`)
        );
      const text = b.children ? "" : b.text;
      return ln(`${pad}<${b.tag} class="bloc-${b.id}">${text}</${b.tag}>`);
    })
    .join("");
}

// Une règle CSS = un bloc coloré, avec la couleur du bloc HTML correspondant
function cssCodeColored(list) {
  return list
    .map((b) => {
      const all = [b.css, ...b.cssBlocks.map((c) => c.css)]
        .map((x) => x.trim())
        .filter(Boolean)
        .join("\n")
        .split("\n")
        .join("\n  ");
      const rule = `.bloc-${b.id} {\n  ${all}\n}`;
      return (
        codeSpan("code-rule", b, rule) +
        (b.children && b.children.length ? cssCodeColored(b.children) : "")
      );
    })
    .join("");
}

/* ===== 6. AFFICHAGE ===== */
function renderPalette() {
  const el = document.getElementById("palette-list");
  el.innerHTML = "";

  /* --- Blocs HTML --- */
  const h1 = document.createElement("h4");
  h1.textContent = "Blocs HTML";
  el.appendChild(h1);
  Object.entries(CATEGORIES).forEach(([catId, catLabel]) => {
    const types = Object.keys(BLOCK_TYPES).filter(
      (t) => BLOCK_TYPES[t].cat === catId,
    );
    if (!types.length) return;
    const details = document.createElement("details");
    details.open = false;
    const summary = document.createElement("summary");
    summary.textContent = catLabel;
    details.appendChild(summary);
    types.forEach((type) => {
      const btn = document.createElement("button");
      btn.textContent = "+ " + type.replace(/_/g, " ");
      btn.dataset.type = type; // pour colorer selon le type
      btn.dataset.cat = catId; // ... ou selon la catégorie
      btn.onclick = () => addBlock(type);
      btn.draggable = true;
      btn.ondragstart = (e) => {
        drag = { kind: "new", type };
        e.dataTransfer.setData("text/plain", type);
      };
      details.appendChild(btn);
    });
    el.appendChild(details);
  });

  /* --- Blocs CSS : clic = ajoute au bloc sélectionné, glisser = dépose sur un bloc --- */
  const h2 = document.createElement("h4");
  h2.textContent = "Blocs CSS";
  el.appendChild(h2);
  Object.entries(allCssBlocks()).forEach(([cat, items]) => {
    const details = document.createElement("details");
    details.open = false;
    details.className = "css-cat";
    const summary = document.createElement("summary");
    summary.textContent = cat;
    details.appendChild(summary);
    items.forEach((it) => {
      const row = document.createElement("div");
      row.className = "palette-item";
      const btn = document.createElement("button");
      btn.className = "css-btn";
      btn.dataset.csscat = cat; // pour colorer selon la catégorie CSS
      btn.textContent = "+ " + it.name;
      btn.title = it.css;
      btn.onclick = () => {
        if (selectedId != null && find(selectedId))
          applyCssBlock(selectedId, it.name, it.css);
        else
          alert(
            "Clique d'abord sur un bloc de ta page (ou glisse le bloc CSS dessus).",
          );
      };
      btn.draggable = true;
      btn.ondragstart = (e) => {
        drag = { kind: "css", name: it.name, css: it.css };
        e.dataTransfer.setData("text/plain", it.name);
      };
      row.appendChild(btn);
      details.appendChild(row);
    });
    el.appendChild(details);
  });
}

/* ===== ÉDITEUR DE VALEURS CSS =====
   Chaque ligne "propriété: valeur;" d'un bloc CSS devient modifiable :
   nombre + unité (px, %, em...), sélecteur de couleur, liste de choix ou texte. */
const UNITLESS = new Set(["line-height", "opacity", "z-index", "flex", "font-weight", "order", "flex-grow", "flex-shrink"]);
const UNIT_GROUPS = [["px", "%", "em", "rem", "vh", "vw"], ["deg", "turn"], ["s", "ms"]];
const BORDER_STYLES = ["none", "solid", "dashed", "dotted", "double"];
const CSS_CHOICES = {
  "text-align": ["left", "center", "right", "justify"],
  "font-style": ["normal", "italic"],
  "font-weight": ["normal", "bold"],
  "text-decoration": ["none", "underline", "line-through", "overline"],
  "text-transform": ["none", "uppercase", "lowercase", "capitalize"],
  display: ["block", "inline", "inline-block", "flex", "grid", "none"],
  "flex-direction": ["row", "column", "row-reverse", "column-reverse"],
  "flex-wrap": ["nowrap", "wrap"],
  "justify-content": ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
  "align-items": ["flex-start", "center", "flex-end", "stretch", "baseline"],
  position: ["static", "relative", "absolute", "fixed", "sticky"],
  float: ["none", "left", "right"],
  "object-fit": ["fill", "contain", "cover", "none"],
  overflow: ["visible", "hidden", "scroll", "auto"],
};
const NAMED_COLORS = { white: "#ffffff", black: "#000000", red: "#ff0000", blue: "#0000ff", green: "#008000", yellow: "#ffff00", orange: "#ffa500", purple: "#800080", gray: "#808080", grey: "#808080" };
function toHex(v) {
  v = v.toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(v)) return v;
  if (/^#[0-9a-f]{3}$/.test(v)) return "#" + [...v.slice(1)].map((c) => c + c).join("");
  return NAMED_COLORS[v] || null;
}
// Découpe une chaîne en gardant les parenthèses intactes
function splitOutsideParens(str, isSep) {
  const out = [];
  let cur = "", depth = 0;
  for (const ch of str) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth === 0 && isSep(ch)) {
      if (cur.trim()) out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function parseDeclarations(css) {
  return splitOutsideParens(css, (c) => c === ";")
    .map((line) => {
      const i = line.indexOf(":");
      if (i < 0) return null;
      const value = line.slice(i + 1).trim();
      const hasComma = splitOutsideParens(value, (c) => c === ",").length > 1;
      return {
        prop: line.slice(0, i).trim(),
        tokens: hasComma ? [value] : splitOutsideParens(value, (c) => /\s/.test(c)),
      };
    })
    .filter(Boolean);
}
function tokenWidget(prop, tok, set) {
  // 1. Nombre (avec unité et éventuelle fonction : rotate(10deg)...)
  const m = tok.match(/^([a-zA-Z-]+\()?(-?\d*\.?\d+)([a-zA-Z%]*)(\))?$/);
  if (m && !m[1] === !m[4]) {
    const wrap = document.createElement("span");
    wrap.className = "css-token";
    if (m[1]) wrap.append(m[1].slice(0, -1) + " ");
    const num = document.createElement("input");
    num.type = "number";
    num.className = "css-num";
    num.step = UNITLESS.has(prop) || m[2].includes(".") ? "0.1" : "1";
    num.value = m[2];
    wrap.appendChild(num);
    let unit = null;
    if (!(UNITLESS.has(prop) && !m[3])) {
      unit = document.createElement("select");
      const group = UNIT_GROUPS.find((g) => g.includes(m[3])) || UNIT_GROUPS[0];
      const opts = [...(m[3] === "" ? [""] : []), ...group];
      if (!opts.includes(m[3])) opts.push(m[3]);
      opts.forEach((u) => unit.add(new Option(u || "—", u)));
      unit.value = m[3];
      wrap.appendChild(unit);
    }
    const update = () =>
      set(`${m[1] || ""}${num.value === "" ? 0 : num.value}${unit ? unit.value : m[3]}${m[4] || ""}`);
    num.oninput = update;
    if (unit) unit.onchange = update;
    return wrap;
  }
  // 2. Couleur
  const hex = toHex(tok);
  if (hex) {
    const col = document.createElement("input");
    col.type = "color";
    col.className = "css-color";
    col.value = hex;
    col.oninput = () => set(col.value);
    return col;
  }
  // 3. Liste de choix
  const choices = /^(border|outline)/.test(prop) && BORDER_STYLES.includes(tok) ? BORDER_STYLES : CSS_CHOICES[prop];
  if (choices && choices.includes(tok)) {
    const sel = document.createElement("select");
    choices.forEach((c) => sel.add(new Option(c, c)));
    sel.value = tok;
    sel.onchange = () => set(sel.value);
    return sel;
  }
  // 4. Texte libre
  const txt = document.createElement("input");
  txt.type = "text";
  txt.className = "css-text";
  txt.value = tok;
  txt.size = Math.max(6, Math.min(24, tok.length + 1));
  txt.oninput = () => set(txt.value);
  return txt;
}
// Construit l'éditeur pour obj.css (obj = un bloc HTML ou un bloc CSS)
function buildCssEditor(obj) {
  const decls = parseDeclarations(obj.css);
  const wrap = document.createElement("div");
  wrap.className = "css-edit";
  const save = () => {
    obj.css = decls.map((d) => `${d.prop}: ${d.tokens.join(" ")};`).join("\n");
    renderOutput(); // on ne reconstruit pas les blocs : le curseur reste dans le champ
  };
  decls.forEach((d) => {
    const row = document.createElement("div");
    row.className = "css-row";
    const label = document.createElement("span");
    label.className = "css-prop";
    label.textContent = d.prop;
    row.appendChild(label);
    d.tokens.forEach((tok, i) =>
      row.appendChild(
        tokenWidget(d.prop, tok, (v) => {
          d.tokens[i] = v;
          save();
        }),
      ),
    );
    wrap.appendChild(row);
  });
  return wrap;
}

// Affiche une liste de blocs dans "container" (récursif pour les conteneurs)
function renderList(list, container) {
  list.forEach((b) => {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = b.type; // pour colorer selon le type
    div.dataset.cat = BLOCK_TYPES[b.type]?.cat; // ... ou selon la catégorie
    div.innerHTML = `
      <span class="handle" draggable="true" title="Glisser">⠿</span> <strong>${b.type}</strong> &lt;${b.tag}&gt;
      <button data-act="up">↑</button>
      <button data-act="down">↓</button>
      <button data-act="del">✕</button>
      ${b.children || b.items || b.tag === "video" ? "" : `<input data-field="text" placeholder="${b.tag === "img" ? "Texte alternatif (alt)" : "Texte"}" value="">`}
      <div class="css-stack"></div>
    `;
    // On remplit les valeurs via JS pour éviter les soucis de guillemets
    const textInput = div.querySelector('[data-field="text"]'); // absent pour les conteneurs
    if (textInput) textInput.value = b.text;

    // Sélection du bloc (cible des clics sur les blocs CSS)
    div.dataset.id = b.id;
    if (b.id === selectedId) div.classList.add("selected");
    div.addEventListener("click", (e) => {
      if (e.target.closest(".block") !== div) return;
      selectedId = b.id;
      document
        .querySelectorAll(".block.selected")
        .forEach((x) => x.classList.remove("selected"));
      div.classList.add("selected");
    });

    // Blocs CSS ajoutés à ce bloc : on peut les retirer, pas modifier leur code
    const stack = div.querySelector(".css-stack");
    if (b.css.trim()) {
      const base = document.createElement("div");
      base.className = "css-block css-base";
      const t = document.createElement("strong");
      t.textContent = "css de base";
      base.append(t, buildCssEditor(b));
      stack.appendChild(base);
    }
    b.cssBlocks.forEach((c, i) => {
      const cb = document.createElement("div");
      cb.className = "css-block";
      cb.dataset.csscat = cssCatOf(c.name); // pour colorer selon la catégorie CSS
      const name = document.createElement("strong");
      name.textContent = "css";
      const del = document.createElement("button");
      del.textContent = "✕";
      del.title = "Retirer ce bloc CSS";
      del.onclick = () => {
        b.cssBlocks.splice(i, 1);
        render();
      };
      cb.append(name, " " + c.name + " ", del, buildCssEditor(c));
      stack.appendChild(cb);
    });

    div.querySelector('[data-act="up"]').onclick = () => moveBlock(b.id, -1);
    div.querySelector('[data-act="down"]').onclick = () => moveBlock(b.id, 1);
    div.querySelector('[data-act="del"]').onclick = () => removeBlock(b.id);

    // Glisser-déposer : on peut attraper le bloc n'importe où (pas seulement par la poignée)
    div.draggable = true;
    // Sur un champ (texte, fichier) ou un bouton, on désactive le glisser
    // pour pouvoir écrire / sélectionner / cliquer normalement
    div.addEventListener("mousedown", (e) => {
      div.draggable = !e.target.closest("input, textarea, select, button");
    });
    div.ondragstart = (e) => {
      e.stopPropagation(); // un bloc enfant ne fait pas glisser son parent
      drag = { kind: "move", id: b.id };
      e.dataTransfer.setData("text/plain", String(b.id));
      e.dataTransfer.setDragImage(div, 0, 0);
    };

    // Image : import d'un fichier depuis l'ordinateur
    if (b.tag === "img" ){
      const box = document.createElement("div");
      box.className = "img-import";
      const file = document.createElement("input");
      file.type = "file";
      file.accept = "image/*";
      file.onchange = () => {
        const f = file.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
          b.src = reader.result;
          b.fileName = f.name;
          render();
        };
        reader.readAsDataURL(f);
      };
      box.appendChild(file);
      if (b.src) {
        const thumb = document.createElement("img");
        thumb.src = b.src;
        thumb.className = "thumb";
        box.appendChild(thumb);
      }
      div.insertBefore(box, div.querySelector(".css-stack"));
    }

    // Vidéo : import d'un fichier OU lien (mp4 direct, YouTube, Vimeo)
    if (b.tag === "video") {
      const box = document.createElement("div");
      box.className = "img-import";
      const file = document.createElement("input");
      file.type = "file";
      file.accept = "video/*";
      file.onchange = () => {
        const f = file.files[0];
        if (!f) return;
        // URL locale (rapide, sans encoder la vidéo en texte)
        b.src = URL.createObjectURL(f);
        b.fileName = f.name;
        render();
      };
      const url = document.createElement("input");
      url.type = "url";
      url.placeholder = "ou colle un lien (mp4, YouTube, Vimeo)";
      url.value = /^https?:/.test(b.fileName) ? b.fileName : "";
      url.onchange = () => {
        const v = url.value.trim();
        b.src = v;
        b.fileName = v;
        render();
      };
      box.append(file, url);
      if (b.fileName && !/^https?:/.test(b.fileName)) {
        const name = document.createElement("div");
        name.textContent = "🎬 " + b.fileName;
        box.appendChild(name);
      }
      div.insertBefore(box, div.querySelector(".css-stack"));
    }

    // Liste : un champ par <li>
    if (b.items) {
      const box = document.createElement("div");
      box.className = "li-list";
      b.items.forEach((item, i) => {
        const row = document.createElement("div");
        row.className = "li-row";
        const label = document.createElement("span");
        label.textContent = "<li>";
        const inp = document.createElement("input");
        inp.value = item;
        inp.placeholder = "Texte de l'élément";
        inp.oninput = () => {
          b.items[i] = inp.value;
          renderOutput();
        };
        const del = document.createElement("button");
        del.textContent = "✕";
        del.title = "Supprimer cet élément";
        del.onclick = () => {
          b.items.splice(i, 1);
          render();
        };
        row.append(label, inp, del);
        box.appendChild(row);
      });
      const add = document.createElement("button");
      add.textContent = "+ li";
      add.onclick = () => {
        b.items.push("Élément " + (b.items.length + 1));
        render();
      };
      box.appendChild(add);
      div.insertBefore(box, div.querySelector(".css-stack"));
    }

    // Mise à jour en direct sans recréer les champs (garde le focus)
    div.querySelectorAll("[data-field]").forEach((input) => {
      input.oninput = () => {
        b[input.dataset.field] = input.value;
        renderOutput();
      };
    });

    // Si c'est un conteneur : zone intérieure où déposer d'autres blocs
    if (b.children) {
      const zone = document.createElement("div");
      zone.className = "dropzone";
      zone.dataset.parent = b.id;
      renderList(b.children, zone);
      div.appendChild(zone);
    }
    container.appendChild(div);
  });
}

function renderBlocks() {
  const el = document.getElementById("blocks");
  el.innerHTML = "";
  renderList(blocks, el);
}

function renderOutput() {
  const html = generateHTML(); // aperçu : images complètes
  const htmlCode = generateHTML(true); // code affiché : noms de fichiers
  const css = generateCSS();
  document.getElementById("preview").srcdoc =
    `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>img,video,iframe{max-width:100%}${css}</style></head><body>${html}</body></html>`;
  document.getElementById("code-html").innerHTML = htmlCodeColored(blocks);
  document.getElementById("code-css").innerHTML = cssCodeColored(blocks);
}

function render() {
  renderBlocks();
  renderOutput();
}

/* ===== 7. MODE CODE / APERÇU ===== */
/* Deux pictos : blocs / code (remplace la case "Voir le code") */
function showView(showCode) {
  document.getElementById("blocks").hidden = showCode;
  document.getElementById("view-code").hidden = !showCode;
  const btnBlocks = document.getElementById("btn-blocks");
  const btnCode = document.getElementById("btn-code");
  btnBlocks.classList.toggle("active", !showCode);
  btnCode.classList.toggle("active", showCode);
  btnBlocks.setAttribute("aria-pressed", !showCode);
  btnCode.setAttribute("aria-pressed", showCode);
}
document.getElementById("btn-blocks").onclick = () => showView(false);
document.getElementById("btn-code").onclick = () => showView(true);

/* ===== 8. GLISSER-DÉPOSER =====
   - palette -> n'importe quelle zone : ajoute un bloc
   - poignée ⠿ -> n'importe quelle zone : déplace (y compris dans un conteneur)
   La zone visée est la plus profonde sous le curseur. */
let drag = null; // { kind: 'new', type } ou { kind: 'move', id }
const dropLine = document.createElement("div");
dropLine.id = "drop-line";
const rootZone = document.getElementById("blocks");
const ws = document.getElementById("workspace");

function zoneAt(e) {
  const z = e.target.closest && e.target.closest(".dropzone");
  return z || rootZone;
}
function zoneParent(zone) {
  return zone.dataset.parent === "" ? null : Number(zone.dataset.parent);
}

// Position d'insertion dans une zone selon la hauteur du curseur
function dropIndex(zone, y) {
  const kids = [...zone.children].filter((c) => c.classList.contains("block"));
  for (let i = 0; i < kids.length; i++) {
    const r = kids[i].getBoundingClientRect();
    if (y < r.top + r.height / 2) return i;
  }
  return kids.length;
}
// Interdit de déposer un bloc dans lui-même ou dans l'un de ses enfants
function dropAllowed(parentId) {
  if (drag.kind !== "move" || parentId === null) return true;
  return parentId !== drag.id && !contains(find(drag.id).block, parentId);
}

function clearTarget() {
  document
    .querySelectorAll(".drop-target")
    .forEach((x) => x.classList.remove("drop-target"));
}

ws.ondragover = (e) => {
  if (!drag) return;
  if (drag.kind === "css") {
    // un bloc CSS se dépose sur un bloc HTML
    clearTarget();
    dropLine.remove();
    const t = e.target.closest && e.target.closest(".block");
    if (t) {
      e.preventDefault();
      t.classList.add("drop-target");
    }
    return;
  }
  const zone = zoneAt(e);
  if (!dropAllowed(zoneParent(zone))) {
    dropLine.remove();
    return;
  }
  e.preventDefault();
  const kids = [...zone.children].filter((c) => c.classList.contains("block"));
  zone.insertBefore(dropLine, kids[dropIndex(zone, e.clientY)] || null);
};
ws.ondragleave = (e) => {
  if (!ws.contains(e.relatedTarget)) {
    dropLine.remove();
    clearTarget();
  }
};
ws.ondrop = (e) => {
  if (!drag) return;
  if (drag.kind === "css") {
    const t = e.target.closest && e.target.closest(".block");
    clearTarget();
    if (t) {
      e.preventDefault();
      selectedId = Number(t.dataset.id);
      applyCssBlock(selectedId, drag.name, drag.css);
    }
    drag = null;
    return;
  }
  const zone = zoneAt(e);
  const parentId = zoneParent(zone);
  if (!dropAllowed(parentId)) return;
  e.preventDefault();
  const i = dropIndex(zone, e.clientY);
  dropLine.remove();
  if (drag.kind === "new") addBlock(drag.type, parentId, i);
  else moveBlockTo(drag.id, parentId, i);
  drag = null;
};
document.ondragend = () => {
  dropLine.remove();
  clearTarget();
  drag = null;
};

/* ===== SUPPRESSION : glisser un bloc de la page vers la sidebar ===== */
const trashZone = document.getElementById("sidebar");
const isMovingBlock = () => drag && drag.kind === "move";

trashZone.ondragover = (e) => {
  if (!isMovingBlock()) return; // les blocs de la palette ne sont pas concernés
  e.preventDefault();
  dropLine.remove();
  trashZone.classList.add("delete-hover");
};
trashZone.ondragleave = (e) => {
  if (!trashZone.contains(e.relatedTarget))
    trashZone.classList.remove("delete-hover");
};
trashZone.ondrop = (e) => {
  if (!isMovingBlock()) return;
  e.preventDefault();
  trashZone.classList.remove("delete-hover");
  removeBlock(drag.id);
  drag = null;
};
// Si le glisser s'arrête ailleurs, on enlève aussi le surlignage
document.addEventListener("dragend", () =>
  trashZone.classList.remove("delete-hover"),
);

/* ===== DÉMARRAGE ===== */
renderPalette();
render();


/* ===== Ouverture / fermeture de la barre bleue ===== */
const sidebar = document.getElementById("sidebar");
const picto = document.getElementById("fond_picto");
function toggleSidebar() {
  const open = sidebar.classList.toggle("open");
  picto.setAttribute("aria-expanded", open);
}
picto.addEventListener("click", toggleSidebar);
picto.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleSidebar();
  }
});
