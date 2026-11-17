/* ===== 1. TYPES DE BLOCS : ajoute les tiens ici =====
   tag       : balise HTML générée
   list      : true => le bloc contient des <li> éditables un par un
   text      : texte par défaut
   css       : CSS par défaut (appliqué à la classe du bloc)
   container : true => ce bloc peut contenir d'autres blocs
*/
const BLOCK_TYPES = {
  titre: { tag: "h1", text: "Titre", css: "" },
  sous_titre: { tag: "h2", text: "sous-titre", css: "" },
  rubrique: { tag: "h3", text: "", css: "" },
  texte: { tag: "p", text: "Texte", css: "" },
  bouton: { tag: "button", text: "Bouton", css: "" },
  séparation: { tag: "div", text: "", css: "", container: true },
  en_tête: { tag: "header", text: "", css: "", container: true },
  image: { tag: "img", text: "", css: "max-width: 100%;" }, // text = texte alternatif (alt)
  liste: { tag: "ul", text: "", css: "", list: true },
  liste_ordonnée: { tag: "ol", text: "", css: "", list: true },
  pied_de_page: { tag: "footer", text: "", css: "", container: true },
  
};

/* ===== 2. ÉTAT =====
   Arbre : [{ id, type, tag, text, css, children: [] | null }]
   children vaut null pour un bloc qui ne peut pas contenir d'autres blocs */
let blocks = [];
let nextId = 1;

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
// forCode = true : on affiche le nom du fichier au lieu de l'image encodée (trop longue)
function htmlOf(list, depth = 0, forCode = false) {
  const pad = "  ".repeat(depth);
  return list
    .map((b) => {
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
      let out = `.bloc-${b.id} {\n  ${b.css.trim()}\n}`;
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

/* ===== 6. AFFICHAGE ===== */
function renderPalette() {
  const el = document.getElementById("palette-list");
  el.innerHTML = "";
  Object.keys(BLOCK_TYPES).forEach((type) => {
    const btn = document.createElement("button");
    btn.textContent = "+ " + type;
    btn.onclick = () => addBlock(type);
    btn.draggable = true;
    btn.ondragstart = (e) => {
      drag = { kind: "new", type };
      e.dataTransfer.setData("text/plain", type);
    };
    el.appendChild(btn);
    el.appendChild(document.createElement("br"));
  });
}

// Affiche une liste de blocs dans "container" (récursif pour les conteneurs)
function renderList(list, container) {
  list.forEach((b) => {
    const div = document.createElement("div");
    div.className = "block";
    div.innerHTML = `
      <span class="handle" draggable="true" title="Glisser">⠿</span> <strong>${b.type}</strong> &lt;${b.tag}&gt;
      <button data-act="up">↑</button>
      <button data-act="down">↓</button>
      <button data-act="del">✕</button>
      ${b.children || b.items ? "" : `<input data-field="text" placeholder="${b.tag === "img" ? "Texte alternatif (alt)" : "Texte"}" value="">`}
      <textarea data-field="css" rows="3" placeholder="CSS (ex: color: red;)"></textarea>
    `;
    // On remplit les valeurs via JS pour éviter les soucis de guillemets
    const textInput = div.querySelector('[data-field="text"]'); // absent pour les conteneurs
    if (textInput) textInput.value = b.text;
    div.querySelector('[data-field="css"]').value = b.css;

    div.querySelector('[data-act="up"]').onclick = () => moveBlock(b.id, -1);
    div.querySelector('[data-act="down"]').onclick = () => moveBlock(b.id, 1);
    div.querySelector('[data-act="del"]').onclick = () => removeBlock(b.id);

    // Glisser-déposer : on attrape le bloc par sa poignée
    div.querySelector(".handle").ondragstart = (e) => {
      e.stopPropagation();
      drag = { kind: "move", id: b.id };
      e.dataTransfer.setData("text/plain", String(b.id));
      e.dataTransfer.setDragImage(div, 0, 0);
    };

    // Image : import d'un fichier depuis l'ordinateur
    if (b.tag === "img") {
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
      div.insertBefore(box, div.querySelector('[data-field="css"]'));
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
      div.insertBefore(box, div.querySelector('[data-field="css"]'));
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
    `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
  document.getElementById("code-html").textContent = htmlCode;
  document.getElementById("code-css").textContent = css;
}

function render() {
  renderBlocks();
  renderOutput();
}

/* ===== 7. MODE CODE / APERÇU ===== */
document.getElementById("toggle-code").onchange = (e) => {
  document.getElementById("view-preview").hidden = e.target.checked;
  document.getElementById("view-code").hidden = !e.target.checked;
};

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

ws.ondragover = (e) => {
  if (!drag) return;
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
  if (!ws.contains(e.relatedTarget)) dropLine.remove();
};
ws.ondrop = (e) => {
  if (!drag) return;
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
  drag = null;
};

/* ===== DÉMARRAGE ===== */
renderPalette();
render();
