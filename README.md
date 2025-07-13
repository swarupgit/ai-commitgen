# AI Commit Message Generator

Generate meaningful Git commit messages using AI (OpenAI GPT-3.5) based on your staged changes — right inside VS Code.

---

## Install manually

code --install-extension ai-commitgen-0.0.1.vsix

---

## Available model

"openai/gpt-3.5-turbo" || "meta-llama/llama-3-8b-instruct" || "mistralai/mixtral-8x7b-instruct" || "anthropic/claude-3-haiku"

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

### 1. Configure Your Openrouter API Key

This extension **requires an OpenAI API key**, which you can get from:  
👉 [https://openrouter.ai](https://openrouter.ai)

Sign in with Google or GitHub

Go to Dashboard → API Keys

Generate a new key
#### Add it to your VS Code settings:

- Open Command Palette → `Preferences: Open Settings (UI)`
- Search: `AI Commitgen`
- Paste your API key (starts with `sk-...`)
- Add which model you want ("openai/gpt-3.5-turbo" || "meta-llama/llama-3-8b-instruct" || "mistralai/mixtral-8x7b-instruct" || "anthropic/claude-3-haiku")

Or manually add this in `settings.json`:

```json
"aiCommitgen.openrouterApiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
"aiCommitgen.model": "meta-llama/llama-3-8b-instruct"

---

## Download from here

https://drive.google.com/drive/folders/1CDUa5_KreFxJKhKJoExW5RWJvfZ8zhDH?usp=sharing
