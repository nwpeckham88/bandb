# Backdoors & Breaches — AI Incident Master

An interactive, AI-narrated web application implementation of **Backdoors & Breaches**, the tabletop cyber incident response card game created by **Black Hills Information Security (BHIS)**.

![Backdoors & Breaches AI Incident Master](https://img.shields.io/badge/Security-Incident%20Response-00f3ff)
![React](https://img.shields.io/badge/Framework-React%2019-61dafb)
![Vite](https://img.shields.io/badge/Build%20Tool-Vite%208-646cff)

---

## 🛡️ Overview

Step into the seat of the Incident Response team. In this tabletop simulation, an **AI Incident Master (IM)** acts as your Dungeon Master, generating real-time SIEM alerts, forensic telemetry (log lines, process dumps, PCAP summaries), and tactical narrative responses based on your investigation actions and d20 dice rolls.

### Key Features

- 🎯 **4 Secret Attack Vector Slots**: Uncover Initial Compromise, Pivot & Escalate, Persistence, and C2 & Exfiltration before the 10-turn limit.
- 🎲 **Interactive d20 Roll System**: Roll a 20-sided die with dynamic procedure card bonuses (+3), active inject penalties, and threshold modifiers.
- 🤖 **Multi-Provider AI Support**: Connect to **Local Ollama** (e.g. Gemma 4, Llama 3) or Cloud APIs (**OpenAI**, **Groq**, **OpenRouter**, **LM Studio**).
- 🔒 **Strict Operational Secrecy**: Robust system prompts prevent the AI Incident Master from spoiling unrevealed threat vectors or breaking character.
- ⚡ **Chaos Inject Events**: Natural 1s, Natural 20s, or 3 consecutive failed investigation turns trigger real-time operational inject hazards.
- 📊 **After-Action Report (AAR) Debrief**: Automated performance scoring, kill-chain matrix breakdown, and final incident debrief upon completion.

---

## 🎮 How to Play

1. **Select a Scenario & AI Provider**: Launch the game, pick a card deck (e.g. Core B&H Deck), and optionally specify a custom scenario theme (e.g., "Ransomware attack on healthcare SCADA network").
2. **Review the Incident Brief**: Read the opening SIEM alert delivered live on the Incident Master Bridge feed.
3. **Choose a Target Threat Vector**: Click one of the 4 unrevealed threat vector slots to select your d20 target.
4. **Deploy a Procedure Card or General Action**: Select a Defender procedure card from your hand (or execute a custom forensic scan) and describe your team's tactical action.
5. **Roll the d20**:
   - **1–10**: Failure. Dead end or log noise.
   - **11+**: Success! Threat vector identified and secured.
   - **Matching Procedure Bonus**: +3 bonus to roll.
6. **Win Condition**: Discover all 4 threat vectors within 10 turns.

---

## 🛠️ Development & Building

### Installation

```bash
pnpm install
# or
npm install
```

### Run Locally

```bash
npm run dev
```

### Linting

```bash
npm run lint
```

### Build Production Bundle

```bash
npm run build
```

---

## 📜 License & Attribution

- **Game Rules & Mechanics**: Created by [Black Hills Information Security (BHIS)](https://www.blackhillsinfosec.com/).
