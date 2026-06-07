# guns.lol Landingpage

Dies ist eine produktionsfertige statische Website, die ohne Demo-Text und ohne unnötige Platzhalter sofort eingesetzt werden kann.

## Enthaltene Dateien
- `index.html` – Startseite mit fertigem Layout
- `styles.css` – modernes, responsives Design
- `script.js` – Interaktion für die Hero-Visual-Animation

## Lokal testen
1. Öffne `index.html` im Browser.
2. Alternativ kannst du einen lokalen Webserver nutzen, z. B. mit Visual Studio Code Live Server.

## Deployment mit GitHub Pages
1. Erstelle ein neues GitHub-Repository.
2. Lade die Dateien in den Repository-Root hoch.
3. Wähle in GitHub `Settings` > `Pages`.
4. Setze die Quelle auf den Branch `main` (oder `master`) und den Ordner `/ (root)`.
5. Wenn du willst, kannst du `index.html` auch in einen `docs/`-Ordner verschieben und als Quelle `docs` wählen.

Beispiel mit `git` in PowerShell:

```powershell
cd c:\Users\fromm\Documents\exe.controll
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<dein-benutzername>/<repo-name>.git
git push -u origin main
```

Dann `Settings` > `Pages` konfigurieren und die Seite wird live geschaltet.
