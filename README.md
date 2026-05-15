# ⚡ AI BATTLE ARENA

**AI Battle Arena** is a high-fidelity, gamified playground where the world's most powerful AI models go head-to-head. Enter your prompt, initiate the **Strike Protocol**, and watch as multiple LLMs battle for supremacy, judged in real-time by a superior AI arbiter.

![AI Battle Arena Logo](/Frontend/public/Battle%20royale.png)

---

## 🎮 The Experience

- **Multi-Model Orchestration**: Leverages LangGraph to pit models like **Mistral**, **Cohere**, and **Gemini** against each other in a structured logic flow.
- **Strike Protocol Interaction**: A custom-built "physics-engine" feel for the UI. Cards repel, vibrate, and emit speed lines when you initiate a battle.
- **Dynamic AI Mascot**: An interactive companion that jumps and "poofs" away when you try to hover it—peek at him in the sidebar!
- **High-Fidelity Aesthetics**: Neo-Brutalist design using high-contrast lime on dark grey, featuring glassmorphism, ink-splatter backgrounds, and spring-physics animations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Animations**: Framer Motion (Spring physics & complex sequences)
- **Styling**: Tailwind CSS v4 (Using the new `@theme` engine)
- **State Management**: React Hooks with custom persistence logic

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **AI Orchestration**: LangChain + LangGraph
- **Models**: Gemini (Judge), MistralAI, Cohere

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- API Keys for Mistral, Cohere, and Google Generative AI (Gemini)

### Installation

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/Akshvt/AI-Battle-Arena.git
   cd AI-Battle-Arena
   ```

2. **Setup Backend**:
   ```bash
   cd Backend
   npm install
   # Create a .env file with your API keys (see DEPLOYMENT.md)
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

---

## 🌐 Deployment

The project is configured for split deployment:
- **Backend**: Hosted on [Render](https://render.com) (TypeScript Build support).
- **Frontend**: Hosted on [Vercel](https://vercel.com) (Vite preset).

Check the [DEPLOYMENT.md](DEPLOYMENT.md) for full production setup instructions.

---

## 🛡️ License
Distributed under the ISC License. See `LICENSE` for more information.

Created with ⚡ by [Akshat](https://github.com/Akshvt)
