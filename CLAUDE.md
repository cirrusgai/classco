# CLAUDE.md

## Project Overview

**OpenMAIC** (Open Multi-Agent Interactive Classroom) — an open-source AI platform that transforms topics or documents into rich, interactive classroom experiences. Built by THU-MAIC (Tsinghua University). Licensed under AGPL-3.0.

Upstream repo: `THU-MAIC/OpenMAIC`. This fork lives at `cirrusgai/classco`.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4, Radix UI, shadcn/ui
- **State:** Zustand (10 stores in `lib/store/`)
- **AI/LLM:** AI SDK 6, LangChain, LangGraph 1.1 — supports 10+ LLM providers
- **TTS/ASR:** OpenAI, Azure, GLM, Qwen, ElevenLabs
- **Package Manager:** pnpm 10
- **Testing:** Vitest (unit), Playwright (e2e)
- **Monorepo:** pnpm workspace with `packages/mathml2omml` and `packages/pptxgenjs`

## Commands

```bash
pnpm install          # Install deps (postinstall builds internal packages)
pnpm dev              # Dev server on :3000
pnpm build            # Production build
pnpm start            # Run production build
pnpm lint             # ESLint
pnpm lint --fix       # ESLint with auto-fix
pnpm format           # Prettier format
pnpm check            # Prettier check
pnpm test             # Unit tests (Vitest)
pnpm test:e2e         # E2E tests (Playwright, :3002)
npx tsc --noEmit      # Type check
```

## Project Structure

```
app/                  # Next.js App Router — pages and API routes
  api/                # 15+ API routes (generation, chat, PDF, quiz, TTS, etc.)
  classroom/[id]/     # Classroom playback page
  generation-preview/ # Generation preview page
components/           # React UI components (13 modules)
  ui/                 # shadcn/ui base primitives
  slide-renderer/     # Canvas-based slide editor/renderer
  whiteboard/         # SVG-based whiteboard
lib/                  # Core business logic
  generation/         # Two-stage lesson generation pipeline
  orchestration/      # LangGraph multi-agent orchestration (director graph)
  playback/           # Playback state machine
  action/             # Action execution engine (28+ action types)
  ai/                 # LLM provider abstraction
  store/              # Zustand stores
  types/              # Centralized TypeScript type definitions
  hooks/              # 13 custom React hooks
  audio/              # TTS & ASR providers
  i18n/               # Internationalization (en, zh)
  export/             # PPTX & HTML export
packages/             # Internal workspace packages
  mathml2omml/        # MathML to Office Math conversion
  pptxgenjs/          # Customized PowerPoint generation
configs/              # Shared constants (shapes, fonts, hotkeys, themes)
e2e/                  # Playwright e2e tests
tests/                # Vitest unit tests
```

## Code Conventions

- **Commits:** Conventional Commits — `<type>(<scope>): <description>` (feat, fix, docs, refactor, test, chore, ci, perf, style)
- **Branches:** `feat/`, `fix/`, `docs/` prefixes
- **Components:** PascalCase filenames and exports
- **Functions/variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Unused params:** prefix with `_`
- **Path alias:** `@/*` maps to project root
- **i18n:** All UI text must be internationalized — no hardcoded user-facing strings
- **PRs:** Must link an issue (`Closes #123`), keep focused, include screenshots for UI changes

## Pre-PR Checklist

```bash
pnpm format           # Format
pnpm lint --fix       # Lint
npx tsc --noEmit      # Type check
```

## Key Architecture

- **Two-stage generation pipeline:** outline generation → scene generation (slides, quizzes, interactive HTML, PBL)
- **Multi-agent orchestration:** LangGraph StateGraph with director pattern — decides which agent speaks next
- **Playback state machine:** idle → playing → live
- **Action engine:** 28+ action types executed during playback (speech, whiteboard, spotlight, etc.)
- **Client storage:** IndexedDB (Dexie) + localStorage

## Environment

Copy `.env.example` to `.env.local`. All variables are optional — only configure providers you need. Can also use `server-providers.yml`.

## Deployment

- **Vercel** (recommended, 1-click deploy)
- **Docker** (multi-stage build, Node 22-alpine, port 3000)
- **Self-hosted** (`pnpm build && pnpm start`)
