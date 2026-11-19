# A Thousand Miles, One Friendship — Implementation Plan

An interactive, five-chapter Chinese guofeng birthday gift experience crafted as a warm, sincere digital garden traveling from India to China for Zai Zai. Built for seamless mobile-first storytelling, zero external network dependencies in mainland China, and effortless personalization.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product and experience choices were confirmed during clarification and will govern the implementation:

- **Photo Slots & In-Browser Preview Uploader**: The four personal photograph slots (three portraits of Zai Zai and the central rose photograph) will render stylized guofeng fallback frames until real photographs are placed in the local assets folder, paired with a discreet in-browser photo uploader so you can immediately preview and test the full gift with real images in your browser.
- **Built-In Gentle Guzheng Synth + Local MP3 Support**: The audio system will prioritize local audio files when present and automatically fall back to a built-in Web Audio API pentatonic guzheng, soft flute, chime, and paper-rustle synthesizer—guaranteeing serene music and tactile sound effects with zero external network requests.
- **Keepsake Memory Export & Sharing**: Clicking "Keep This Little Memory" in the final celebration will support native device sharing (with clipboard link-copy fallback) alongside an instant downloadable high-resolution keepsake birthday card image.
- **Sender Signature**: All greetings, invitations, and the final letter will remain warmly signed as "Your friend from India" with the footer "Made with warmth, from India to China."

---

## 1. Overview & Core Concept

- **What It Does**: Guides Zai Zai through five sequential, self-contained visual chapters—opening a wax-sealed red invitation, strolling through a moonlit Chinese garden of framed photographs, opening five personal envelopes independently, revealing a heartfelt rose photograph from India, unfolding a final letter, and celebrating with lanterns, blossoms, and a keepsake export.
- **Target Audience & Context**: Designed primarily for Zai Zai viewing on a smartphone (`375px` mobile-first viewport) in mainland China, while scaling gracefully to tablets and full desktop canvases without collapsing into a narrow strip.
- **Emotional Tone**: Warm, playful where fitting, deeply appreciative of cross-border friendship, and cinematically serene—strictly avoiding romantic proposal tropes or generic neon birthday templates.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Chapter 01 — The Invitation**: Full-viewport dark wine/burgundy arrival screen featuring a swaying Chinese lantern, drifting peach blossom petals, and a centered red-and-gold sealed envelope. Audio remains silent until Zai Zai taps the envelope or "Open Your Surprise", which breaks the gold wax seal, triggers a 3D flap rotation, emits golden particles, plays an envelope sound effect, and starts the gentle background soundtrack as the scene transitions.
2. **Chapter 02 — The Garden of Zai Zai**: Moonlit guofeng garden with misty mountain silhouettes, pavilion roofline, glowing lanterns, fireflies, and three angled scrapbook-style photograph cards. Tapping any card opens an accessible lightbox modal (`Escape` key support, scroll lock, enlarged portrait, and personal caption). A subtle photo-customizer drawer lets the sender swap local preview photos in-browser if real files are not yet placed on disk.
3. **Chapter 03 — Five Little Envelopes**: Warm antique-ivory parchment chapter presenting five independent Chinese-inspired envelopes (*Your beautiful heart*, *Your smile*, *Your uniqueness*, *Our friendship*, *Your future*). Each envelope opens independently with a flap animation, soft paper sound, and parchment note reveal without gating progression on opening all five.
4. **Chapter 04 — A Rose From India**: Deep, intimate twilight garden setting placing the real photograph of you holding a rose as the unmistakable visual focal anchor, framed delicately without cropping or distortion. Tapping "Touch the Rose" releases cascading rose petals, illuminates a soft golden border glow, chimes gently, and fades in the personal birthday message beneath the photograph.
5. **Chapter 05 — The Final Letter & Celebration**: Antique ivory parchment letter sealed with red wax. Tapping "Open Your Letter" breaks the seal, unfolds the stationery, and reveals the letter stanza-by-stanza with an immediate "Read Full Letter" skip control. Upon completion, lanterns illuminate brighter, gentle confetti and blossoms drift across the viewport, and "生日快乐，Zai Zai! / Happy Birthday, Zai Zai!" appears with two clear actions: "Experience Again" (full reset) and "Keep This Little Memory" (share/copy link + download keepsake PNG card).

### Visual Identity & Theme
- **Aesthetic Direction**: Guofeng cinematic storybook—evoking hand-painted Chinese ink landscapes, silk envelopes, antique ivory paper, and warm lantern light.
- **Color Palette & Mood** (60-30-10 discipline per chapter):
  - *Dark Atmospheric Chapters (01, 02, 04)*: Deep Burgundy (`#541C2B`) and Dark Wine (`#36131E`) as the 60% canvas; Muted Crimson (`#963C4C`) and translucent wine surfaces as the 30% framing; Antique Gold (`#D6B77C`) and Peach Blossom (`#EAB6AD`) as the 10% interactive accent.
  - *Parchment Chapters (03, 05)*: Warm Ivory (`#F8F0E2`) as the 60% paper canvas; soft parchment hairline borders and Dusty Rose (`#BD8584`) as the 30% structural accents; Dark Brown (`#49302E`) body ink for crisp WCAG AA contrast and Muted Crimson / Antique Gold for 10% interactive seals and CTAs.
- **Typography & Hierarchy**:
  - *English Display*: `Cormorant Garamond` (Weights 500 & 600, `text-wrap: balance` to prevent orphan trailing words).
  - *Chinese Typography*: Locally bundled `Noto Serif SC` paired with native CJK serif fallbacks (`Songti SC`, `STSong`) for crisp character rendering in China.
  - *Interface & Body Labels*: Clean locally bundled `Plus Jakarta Sans` at `15px–16px` (`1.6` line height) with unboxed metadata separators (`·`)—no pill enclosures, no code-style prefixes, and no watermark ghost text.
- **Mobile-First Ergonomics & Spatial Math**:
  - Compact top chapter progress strip + persistent corner audio toggle strictly capped below `15%` of mobile viewport height, preserving over `85%` of vertical space for storytelling.
  - All buttons, envelope hitboxes, and modal close targets measure at least `44×44px`, placing primary chapter CTAs comfortably within the lower thumb-reach zone on `375px` viewports while expanding cleanly into balanced 2-column and 3-column layouts on desktop (`1440px`).

### Interactive Feedback & Motion
- Compositor-only animations (`transform`, `opacity`, `filter`) powered by smooth spring and ease-in-out curves (`150ms–200ms` button responsiveness; deliberate unhurried transitions between chapters).
- Full `prefers-reduced-motion` support that disables floating petals, fireflies, and swaying animations while keeping all narrative reveals instantaneous and accessible.

---

## 3. Key Product Decisions & Trade-Offs

- **Local Font & Asset Bundling for Mainland China Reliability**:
  - *Chosen Approach*: Bundle display, CJK serif, and body fonts locally within the build alongside local `/images/` and `/audio/` paths, with zero requests to Google Fonts, YouTube, Spotify, or external CDNs.
  - *Why*: Ensures rapid load times and reliable typography and media rendering behind mainland China network filters.
  - *Alternatives Considered*: Standard CDN font `<link>` tags, which frequently time out or block page rendering in China.
- **Hybrid Dual-Engine Audio Architecture**:
  - *Chosen Approach*: Wrap Howler.js playback around local MP3 slots while transparently synthesizing pentatonic guzheng notes, soft chimes, and paper cues via Web Audio API when MP3 files are absent or blocked.
  - *Why*: Guarantees the experience sounds complete out of the box and handles missing assets gracefully while remaining ready for custom MP3 drop-ins.
  - *Alternatives Considered*: Silent fallback only, which would leave the initial user experience without its intended atmospheric soundtrack.
- **Centralized Content & In-Browser Photo Preview Overlay**:
  - *Chosen Approach*: Keep all text, captions, envelope messages, and asset paths inside a single central content configuration, supplemented by a local browser preview uploader persisted in session/local storage.
  - *Why*: Lets you inspect the complete visual narrative with real photographs immediately in the browser before committing final files to the public images directory, without altering core code.
  - *Alternatives Considered*: Hardcoded static placeholders only, which make layout framing difficult to judge before deployment.
- **Vite React Static Build Adaptation**:
  - *Chosen Approach*: Deliver the modular React component architecture inside the workspace's existing Vite + React + Tailwind v4 runtime (producing a 100% static `dist/` bundle compatible with Vercel and static hosts with zero backend required).
  - *Why*: Aligns seamlessly with the active development environment and port 3000 preview server while honoring every functional, static-deployment, and component-boundary goal.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                        Central Content & State Layer                     │
│  ┌─────────────────────────┐   ┌──────────────────┐   ┌───────────────┐  │
│  │  Central Content Config │   │ Experience State │   │  Photo Store  │  │
│  │  (Text, Captions, Paths)│   │ (Chapter, Seals) │   │ (Disk + Local)│  │
│  └────────────┬────────────┘   └────────┬─────────┘   └───────┬───────┘  │
└───────────────┼─────────────────────────┼─────────────────────┼──────────┘
                │                         │                     │
                ▼                         ▼                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       Persistent Shell & Atmospheric Layer               │
│  ┌──────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  │
│  │ Chapter Progress │  │ Ambient FX (Lanterns,   │  │ Audio Engine    │  │
│  │ (Back/Unlock Nav)│  │ Petals, Fireflies)      │  │ (Howler + Synth)│  │
│  └──────────────────┘  └─────────────────────────┘  └─────────────────┘  │
└───────────────────────────────────────┬──────────────────────────────────┘
                                        │
        ┌───────────────┬───────────────┼───────────────┬───────────────┐
        ▼               ▼               ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 01.          │ │ 02.          │ │ 03.          │ │ 04.          │ │ 05.          │
│ Invitation   │ │ Garden &     │ │ Five Little  │ │ Rose From    │ │ Final Letter │
│ (Wax Seal &  │ │ Photo Modal  │ │ Envelopes    │ │ India        │ │ & Keepsake   │
│ Audio Unlock)│ │ & Uploader   │ │ (Independent)│ │ (Photo Focus)│ │ Celebration  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

### Data Model & State
- **Central Content Configuration**: Holds recipient name (`Zai Zai`), Chinese greeting (`生日快乐`), chapter titles, photo items (`id`, `src`, `alt`, `caption`, `fallbackLabel`), five envelope themes/messages, rose message, paragraph-structured final letter, and footer signature.
- **Experience State Hook**: Tracks `currentChapter` (`0` through `4`), `highestUnlockedChapter`, `invitationOpened`, `openedEnvelopes` (array/set of independent IDs), `roseRevealed`, `letterOpened`, `celebrationActive`, and `resetExperience()` for full replay.
- **Photo Preview Override State**: Maps asset keys (`zai-1`, `zai-2`, `zai-3`, `my-rose`) to optional user-uploaded data URLs stored in `localStorage`, cleanly resolving to the configured static path or artistic fallback card if neither exists.
- **Audio Engine Hook**: Manages playback status (`isPlaying`, `isMuted`, `volume`, `activeEngine`), persists mute/volume preferences, ducks background volume smoothly during Chapter 03 and Chapter 04's rose reveal, and routes SFX cues (`envelope`, `chime`, `celebration`) to Howler or the pentatonic Web Audio synth.

### Interactive Component & State Mapping
- **Chapter Navigation & Progress**: Clicking any unlocked chapter indicator transitions backward or forward smoothly without losing opened-envelope or rose-reveal state; locked future chapters remain non-clickable until reached naturally.
- **Photo Lightbox & Uploader**: Clicking a framed garden photograph locks body scroll, opens the high-contrast modal (`Escape` and backdrop-click dismissible), and displays the full image and caption; clicking the subtle "Customize Photos" trigger opens a compact drawer to preview custom local JPG/PNG files for any of the four slots or clear overrides.
- **Independent Envelope Grid**: Each of the five envelopes manages its own open/close toggle state independently, plays the subtle paper sound on first open, and allows advancing to Chapter 04 at any point.
- **Keepsake Card Canvas Generator**: Synthesizes a high-DPI portrait keepsake card (`1080×1440`) on an offscreen HTML5 Canvas using the loaded local typography and guofeng palette, exporting a PNG download alongside Web Share API / clipboard link-copy actions.
