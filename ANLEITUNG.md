# Webseite compoundgames.de

Eine statische Seite ohne Baukasten, Datenbank, Cookies oder Tracking. Alle Dateien liegen in diesem Ordner.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Deutsch und Englisch, umschaltbar) |
| `impressum.html`, `datenschutz.html` | Rechtstexte – **orange markierte Stellen vor dem Veröffentlichen ausfüllen** |
| `style.css`, `site.js` | Gestaltung und Sprachumschaltung, Bildergalerie |
| `img/`, `video/` | Bilder (WebP) und Trailer (DE/EN) |
| `CNAME` | Domain für GitHub Pages |

## Vor dem Veröffentlichen

1. Impressum und Datenschutz ausfüllen: Name, Anschrift, ggf. Telefon und USt-IdNr. Am besten einmal von einem Generator wie eRecht24 oder einem Anwalt gegenprüfen lassen.
2. Sobald die Steam-Seite existiert: in `site.js` oben `STEAM_URL` auf die echte Store-Adresse ändern.

## Veröffentlichen mit GitHub Pages (kostenlos)

GitHub Pages funktioniert kostenlos nur mit einem **öffentlichen** Repository. Deshalb bekommt die Webseite ein eigenes Repo, getrennt vom privaten Spiel-Repo.

1. Auf GitHub in der Organisation Compoundgames ein neues **öffentliches** Repository `compoundgames.de` anlegen (leer, ohne README).
2. Diesen Ordner hochladen (in PowerShell im Ordner `Website`):
   ```
   git push -u origin main
   ```
3. Im Repo: **Settings → Pages** → Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)` → Save.
4. Unter **Custom domain** steht `compoundgames.de` (kommt aus der Datei `CNAME`).
5. Beim Domain-Anbieter die DNS-Einträge setzen (siehe unten).
6. Wenn GitHub „DNS check successful“ meldet: **Enforce HTTPS** anhaken. Das Zertifikat kann bis zu 24 Stunden dauern.
7. Empfohlen: In den Einstellungen der Organisation unter **Pages → Verified domains** die Domain bestätigen, damit sie niemand anderes auf GitHub übernehmen kann.

### DNS-Einträge beim Domain-Anbieter

| Typ | Name / Host | Wert |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `compoundgames.github.io` |

- Vorhandene **A-, AAAA- und www-Einträge** für `@` und `www` ersetzen (alte Weiterleitungen oder „Parking“-Seiten des Anbieters entfernen).
- **MX-, TXT- und SPF-Einträge nicht anfassen** – sonst funktioniert die E-Mail-Adresse info@compoundgames.de nicht mehr.
- Änderungen brauchen meist 15 Minuten bis einige Stunden.

## Spätere Änderungen

Dateien ändern, dann im Ordner `Website`:
```
git add -A
git commit -m "Was geändert wurde"
git push
```
Nach ein bis zwei Minuten ist die neue Version online.
