# The Hampstead Design Journal

A high-end digital publication focused on architecture, interiors, and living in North West London. Built with Next.js 14, Tailwind CSS, and Contentlayer.

## 🌟 Key Features (v2.0)

- **Editorial Design System:** Custom typography (`Playfair Display`), color palette, and spacing inspired by high-end print magazines.
- **Dynamic Content Engine:** Powered by `contentlayer` for type-safe MDX content management.
- **Interactive UI:**
  - **Animated Transitions:** Smooth entry animations using `framer-motion`.
  - **Sticky Navigation:** Elegant, backdrop-blur header with mobile menu.
  - **Newsletter Integration:** Animated subscription form with state handling.
- **Performance:**
  - Optimized images and fonts.
  - Client-side animations with Server-Side Rendering (SSR) for content.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Animation:** Framer Motion
- **Content:** Contentlayer (MDX)
- **Icons:** Lucide React
- **Utils:** `clsx`, `tailwind-merge`, `date-fns`

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    # Note: If you see peer dependency errors, use:
    npm install --legacy-peer-deps
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    This will start the server at `http://localhost:3000` and generate the `.contentlayer` types.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── articles/        # Article cards and layouts
│   ├── home/            # Homepage-specific components (Hero, Latest)
│   ├── layout/          # Header, Footer, Newsletter
│   └── ui/              # Reusable UI elements
├── content/             # MDX Article files
├── lib/                 # Utilities (cn, etc.)
└── styles/              # Global styles and fonts
```

## 🎨 Design System

- **Fonts:** Playfair Display (Headings), System Sans (Body)
- **Colors:**
  - Cream: `#F8F7F4` (Backgrounds)
  - Charcoal: `#333333` (Text)
  - Black: `#1a1a1a` (Accents)
  - Grey: `#E5E5E5` (Borders)

## 📝 Content Management

To add a new article, create a `.mdx` file in `src/content/articles/`:

```mdx
---
title: "Your Article Title"
excerpt: "A short summary for the card view."
date: "2025-11-26"
category: "Heritage & Architecture"
slug: "your-article-slug"
---

Your content goes here...
```