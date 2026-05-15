# 🎮 AI Battle Arena — Gamification System Reference

This document describes all interactive and animation systems implemented in the frontend.

---

## 1. `InteractiveMascot` — Mascot Character System

**File:** `src/app/App.jsx`

| Feature | Details |
|---|---|
| **Retro Idle Bobbing** | `framer-motion` `y: [0, -12, 0]` loop at 1.5s — classic 2D game character idle |
| **Hover-to-Flee** | On `onMouseEnter`, mascot springs away to a random new position |
| **Poof Cloud** | White blur div scales from 0→3 + fades when mascot teleports |
| **Random Sprites** | Picks randomly from all 4 PNGs on each teleport |
| **Sprites used** | `Power1.png`, `power peek.png`, `power_sit.png`, `power_yay.png` |
| **Default position** | Peeks from left sidebar edge in empty arena state |

---

## 2. `HowItWorksCards` — Card Repulsion Battle System

**File:** `src/app/App.jsx` + `src/app/App.css`

### Hover Mode
- Hovered card enlarges and floats up/down at normal speed
- Adjacent cards slide apart to give it space (`PUSH_HOVER = 70px`)

### Click Mode (locks in)
- **Clicked card**: glows with neon aura + continuous speed lines streaming left→right
- **Other cards**: thrown to the edges of the screen (`PUSH_CLICK = 240px`)
  - Cards 1 & 2 pushed right when card 0 is clicked
  - Card 0 pushed left, card 2 pushed right when card 1 is clicked
  - Cards 0 & 1 pushed left when card 2 is clicked
- **Repelled cards**: continuously vibrate at their pushed position using CSS custom property `--push-x`
- **Speed lines + smoke puffs**: neon streaks and radial smoke blobs render on repelled cards

### How CSS Anchored Vibration Works
```css
/* The --push-x var is set inline per card via React style prop */
@keyframes vibrate-left {
  0%   { transform: translateX(var(--push-x, -220px)); }
  20%  { transform: translateX(calc(var(--push-x, -220px) - 7px)); }
  ...
}
```
This lets the vibration oscillate **around the pushed position**, not around `0`.
Click the active card again to release.

---

## 3. `RevealOnScroll` — Elastic Scroll Reveal

Spring physics (`stiffness: 150, damping: 12`) for a bouncy reveal on entering viewport.
Used on all major landing page sections.

---

## 4. `InkSplatter` + `HeroOrbs` — Background Atmosphere

- **InkSplatter**: animated SVG accent traversing the hero section background
- **HeroOrbs**: three large blurred orbs (lime, blue, rose) moving in organic looping paths

---

## 5. Button Animations

All primary/secondary buttons use `framer-motion`:
- `whileHover`: scale up 1.25× with slight rotation — cartoon "woosh" expansion
- `whileTap`: scale squish down to 0.85×
- Spring physics for immediate tactile feedback

---

## 6. Arena Page

| State | Mascot | Loading |
|---|---|---|
| Empty | `power peek.png` peeking from sidebar left edge | — |
| Waiting for AI | Mascot visible, input locked | — |
| Results | `power_yay.png` | Yellow flash screen transition |
