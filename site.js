// Chop Till Spring / Compound Games
// Steam-Link: sobald die Store-Seite existiert, hier die echte Adresse eintragen,
// z. B. "https://store.steampowered.com/app/1234560/Chop_Till_Spring/"
// Leer = die Wunschlisten-Knoepfe zeigen "bald verfuegbar" und sind nicht klickbar.
var STEAM_URL = "";

var SHOTS = ["02_hacken", "03_blitz", "05_hof", "06_glut", "09_waldbewohner", "10_bonuskarten", "11_axtwurf", "12_kaelteeinbruch"];
var ALT = {
  de: ["Holz hacken im verschneiten Hof", "Blitzschlag spaltet Scheite", "Hof-Skills", "Der Glut-Baum", "Waldbewohner entdecken", "Bonuskarten wählen", "Glücksrad-Axtwurf", "Kälteeinbruch: die Lieferung"],
  en: ["Chopping wood in the snowy yard", "Lightning splits the logs", "Yard skills", "The Ember Tree", "Discover forest dwellers", "Pick bonus cards", "Wheel-of-fortune axe throw", "Cold snap: the delivery"]
};

var lang = "de";

function store(key, val) {
  try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
}

function setLang(l, remember) {
  lang = l;
  document.documentElement.lang = l;
  if (remember) store("lang", l);  // nur wenn der Besucher selbst umschaltet
  document.querySelectorAll(".langswitch button").forEach(function (b) {
    b.classList.toggle("on", b.dataset.lang === l);
  });
  // Trailer in der passenden Sprache
  var v = document.getElementById("trailer-video");
  var s = v.querySelector("source");
  var want = s.dataset[l];
  if (s.getAttribute("src") !== want) {
    s.setAttribute("src", want);
    v.load();
  }
  buildShots();
}

function buildShots() {
  var box = document.getElementById("shots");
  box.innerHTML = "";
  SHOTS.forEach(function (name, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", ALT[lang][i]);
    var img = document.createElement("img");
    img.src = "img/thumb_" + lang + "_" + name + ".webp";
    img.alt = ALT[lang][i];
    img.loading = "lazy";
    img.width = 640; img.height = 360;
    b.appendChild(img);
    b.addEventListener("click", function () { openBox(i); });
    box.appendChild(b);
  });
}

// Grosse Bildansicht
var lb = document.getElementById("lightbox");
var lbImg = lb.querySelector("img");
var cur = 0;
function showShot(i) {
  cur = (i + SHOTS.length) % SHOTS.length;
  lbImg.src = "img/shot_" + lang + "_" + SHOTS[cur] + ".webp";
  lbImg.alt = ALT[lang][cur];
}
function openBox(i) { showShot(i); lb.hidden = false; lb.querySelector(".lb-close").focus(); }
function closeBox() { lb.hidden = true; }
lb.querySelector(".lb-close").addEventListener("click", closeBox);
lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); showShot(cur - 1); });
lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); showShot(cur + 1); });
lb.addEventListener("click", function (e) { if (e.target === lb) closeBox(); });
document.addEventListener("keydown", function (e) {
  if (lb.hidden) return;
  if (e.key === "Escape") closeBox();
  if (e.key === "ArrowLeft") showShot(cur - 1);
  if (e.key === "ArrowRight") showShot(cur + 1);
});

document.querySelectorAll(".steam-link").forEach(function (a) {
  if (STEAM_URL) {
    a.href = STEAM_URL;
    return;
  }
  // Noch keine Store-Seite: Knopf als "bald verfuegbar" zeigen, ohne Link
  var span = document.createElement("span");
  span.className = "btn disabled";
  span.setAttribute("aria-disabled", "true");
  span.innerHTML = '<span lang="de">Steam-Wunschliste – bald verfügbar</span><span lang="en">Steam wishlist – coming soon</span>';
  a.replaceWith(span);
});
document.querySelectorAll(".langswitch button").forEach(function (b) {
  b.addEventListener("click", function () { setLang(b.dataset.lang, true); });
});
document.getElementById("year").textContent = new Date().getFullYear();

var saved = store("lang");
var nav = (navigator.language || "de").slice(0, 2).toLowerCase();
setLang(saved === "de" || saved === "en" ? saved : (nav === "de" ? "de" : "en"));
