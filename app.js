"use strict";

/**
 * Cocktail Roulette v2.0.0
 * Dataset esterno: cocktails.json
 */

function $(id) { return document.getElementById(id); }

function safeText(x) { return typeof x === "string" ? x.trim() : ""; }

function random01() {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  }
  return Math.random();
}

function hasRequiredUI(ui) {
  return !!(ui.drawBtn && ui.copyBtn && ui.drinkName && ui.ingredients);
}

function setBusy(ui, busy) {
  ui.drawBtn.disabled = busy;
  ui.copyBtn.disabled = busy;
  ui.drawBtn.textContent = busy ? "Loading…" : "Shoot";
}

/**
 * Normalizza e valida un drink proveniente dal JSON.
 * - impedisce dati "strani" (null, numeri, oggetti)
 * - mette limiti di lunghezza (anti dataset rotto)
 * - XSS: restiamo su textContent, ma qui rendiamo il dato "pulito"
 */
function normalizeDrink(x) {
  const name = safeText(x?.name).slice(0, 80);
  const raw = Array.isArray(x?.ingredients) ? x.ingredients : [];
  const ingredients = raw
    .map(safeText)
    .filter(Boolean)
    .slice(0, 30)
    .map(s => s.slice(0, 120));

  if (!name || ingredients.length === 0) return null;
  return { name, ingredients };
}

function renderDrink(ui, drink) {
  const name = safeText(drink?.name);
  const ingredients = Array.isArray(drink?.ingredients) ? drink.ingredients : [];

  ui.drinkName.textContent = name || "—";
  ui.ingredients.replaceChildren();

  ingredients.map(safeText).filter(Boolean).forEach((ing) => {
    const li = document.createElement("li");
    li.textContent = ing; // ✅ XSS-safe
    ui.ingredients.appendChild(li);
  });
}

function renderError(ui, message) {
  ui.drinkName.textContent = "Errore";
  ui.ingredients.replaceChildren();
  console.error(message);
}

async function loadDataset() {
  // ✅ path robusto per GitHub Pages / base path
  const url = new URL("cocktails.json", window.location.href);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Impossibile caricare cocktails.json (HTTP ${res.status})`);

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error("Dataset vuoto o invalido");

  return data;
}

// Bag shuffle
function makeBag(n) {
  const bag = Array.from({ length: n }, (_, i) => i);
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(random01() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

document.addEventListener("DOMContentLoaded", async () => {
  const ui = {
    drawBtn: $("drawBtn"),
    copyBtn: $("copyBtn"),
    drinkName: $("drinkName"),
    ingredients: $("ingredients"),
  };

  if (!hasRequiredUI(ui)) {
    console.error("UI non trovata: controlla gli id in index.html", ui);
    return;
  }

  let COCKTAILS = [];
  let bag = [];
  let isDrawing = false;

  setBusy(ui, true);
  try {
    COCKTAILS = await loadDataset();
    bag = makeBag(COCKTAILS.length);
    renderDrink(ui, { name: "—", ingredients: [] });
  } catch (e) {
    renderError(ui, e?.message || "Errore caricamento dataset");
    return;
  } finally {
    setBusy(ui, false);
  }

  function pickNext() {
    if (bag.length === 0) bag = makeBag(COCKTAILS.length);
    return COCKTAILS[bag.pop()];
  }

  function onShoot() {
    if (isDrawing) return;
    isDrawing = true;
    setBusy(ui, true);

    try {
      const rawDrink = pickNext();
      const drink = normalizeDrink(rawDrink);
      if (!drink) throw new Error("Cocktail invalido nel dataset");

      renderDrink(ui, drink);
    } catch (e) {
      renderError(ui, e?.message || "Errore estrazione");
    } finally {
      setBusy(ui, false);
      isDrawing = false;
    }
  }

  async function onCopy() {
    const name = safeText(ui.drinkName.textContent);
    if (!name || name === "—" || name === "Errore") return;

    const ings = Array.from(ui.ingredients.querySelectorAll("li"))
      .map((li) => safeText(li.textContent))
      .filter(Boolean);

    const payload = `${name}\n${ings.map((i) => "• " + i).join("\n")}`;

    try {
      await navigator.clipboard.writeText(payload);
      alert("Ingredienti copiati!");
    } catch {
      alert("Impossibile copiare");
    }
  }

  ui.drawBtn.addEventListener("click", onShoot);
  ui.copyBtn.addEventListener("click", onCopy);
});
