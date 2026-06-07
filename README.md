# BLEED Portal

Dies ist ein statisches BLEED-Portal mit Login-, Registrierungs- und Konfigurationsfunktionen. Benutzeranmeldung und persönliche Einstellungen werden lokal im Browser gespeichert.

## Enthaltene Dateien
- `index.html` – Hauptseite mit Login/Registrierung und Dashboard
- `styles.css` – responsives Portal-Design
- `script.js` – Authentifizierung und lokale Speicherung

## Features
- Login und Registrierung im Browser
- Dashboard mit persönlichen Einstellungen
- Konfigurationsoptionen wie Aktivierung, Benachrichtigungen, Region und Shortcut
- Speicherung der Daten per `localStorage`
- Bereit für GitHub Pages

## Lokal testen
1. Öffne `index.html` im Browser.
2. Registriere ein neues Konto oder melde dich an.
3. Speichere deine Einstellungen im Dashboard.

## Deployment mit GitHub Pages
1. Erstelle ein neues GitHub-Repository.
2. Lade die Dateien in den Repository-Root hoch.
3. Wähle in GitHub `Settings` > `Pages`.
4. Setze die Quelle auf den Branch `main` und den Ordner `/ (root)`.

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

Dann `Settings` > `Pages` konfigurieren.

> Hinweis: Diese statische Seite speichert Login-Daten und Einstellungen nur lokal. Für ein echtes Server-Login ist zusätzlich ein Backend nötig.
