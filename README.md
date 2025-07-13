# AI Commit Message Generator

Generate meaningful Git commit messages using AI (OpenAI GPT-3.5) based on your staged changes — right inside VS Code.

---

## ✨ Features

- Analyzes your staged Git changes and generates a concise commit message
- Uses OpenAI’s GPT model (`gpt-3.5-turbo`)
- Automatically copies the commit message to clipboard
- Trigger via:
  - Command Palette (`Ctrl+Shift+P`)
  - Keyboard shortcut (`Ctrl+Alt+G`)
  - Right-click context menu

---

## ⚙️ Setup

### 1. Configure Your OpenAI API Key

This extension **requires an OpenAI API key**, which you can get from:  
👉 [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

#### Add it to your VS Code settings:

- Open Command Palette → `Preferences: Open Settings (UI)`
- Search: `AI Commitgen`
- Paste your API key (starts with `sk-...`)

Or manually add this in `settings.json`:

```json
"aiCommitgen.openaiApiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
