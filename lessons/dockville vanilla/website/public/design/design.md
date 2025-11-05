Nice — here’s a clean, accessible **Rating Summary** component you can drop into your Dockville site.
It shows the average rating (big), star icons, review count, and a 5→1 star breakdown with percentage bars. I used the same token ideas from your design spec (primary blue and accent yellow), and set `1rem = 10px` so the sizes are easy to adapt to your existing tokens.

Paste the HTML + CSS into your project (no JS required unless you want to set values dynamically). I included comments and a small example of how to change the numeric/percentage values.

---

### HTML

```html
<!-- Rating Summary Component -->
<section class="rating-summary" aria-labelledby="rating-title">
  <div class="rating-summary__left">
    <div class="rating-average" role="img" aria-label="Average rating 4.6 out of 5">
      <div class="rating-average__value">4.6</div>
      <div class="rating-average__stars" aria-hidden="true">
        <!-- 5 stars, fill according to average (visual only) -->
        <span class="star filled">★</span>
        <span class="star filled">★</span>
        <span class="star filled">★</span>
        <span class="star filled">★</span>
        <span class="star half">★</span>
      </div>
      <div class="rating-average__meta">Based on <strong>234</strong> reviews</div>
    </div>
  </div>

  <div class="rating-summary__right" aria-hidden="false">
    <h3 id="rating-title" class="sr-only">Customer rating summary</h3>

    <!-- Each row: change --pct to the percentage value for that star level -->
    <div class="rating-row">
      <div class="rating-row__label">5</div>
      <div class="rating-row__bar" style="--pct: 62">
        <div class="rating-row__fill"></div>
      </div>
      <div class="rating-row__count">145</div>
    </div>

    <div class="rating-row">
      <div class="rating-row__label">4</div>
      <div class="rating-row__bar" style="--pct: 18">
        <div class="rating-row__fill"></div>
      </div>
      <div class="rating-row__count">42</div>
    </div>

    <div class="rating-row">
      <div class="rating-row__label">3</div>
      <div class="rating-row__bar" style="--pct: 10">
        <div class="rating-row__fill"></div>
      </div>
      <div class="rating-row__count">23</div>
    </div>

    <div class="rating-row">
      <div class="rating-row__label">2</div>
      <div class="rating-row__bar" style="--pct: 6">
        <div class="rating-row__fill"></div>
      </div>
      <div class="rating-row__count">14</div>
    </div>

    <div class="rating-row">
      <div class="rating-row__label">1</div>
      <div class="rating-row__bar" style="--pct: 4">
        <div class="rating-row__fill"></div>
      </div>
      <div class="rating-row__count">10</div>
    </div>
  </div>
</section>
```

---

### CSS

```css
/* root: set 1rem = 10px (use if your project follows that) */
:root {
  font-size: 62.5%; /* 1rem = 10px assuming browser default 16px */
  --color-primary: #0B47D1; /* Dockville primary */
  --color-accent:  #FFB400; /* Dockville accent */
  --text-dark: #0F1724;
  --muted: #6B7280;
  --card-bg: #ffffff;
  --bar-bg: #e6e9ee;
  --radius: 1.0rem; /* 10px */
}

/* Component layout */
.rating-summary {
  display: grid;
  grid-template-columns: 30rem 1fr; /* left (average) and right (breakdown) */
  gap: 3.2rem;
  align-items: start;
  background: var(--card-bg);
  padding: 2.4rem;
  border-radius: 1.2rem;
  box-shadow: 0 0.8rem 2.4rem rgba(15, 23, 36, 0.06);
  width: 100%;
  max-width: 72rem; /* 720px */
}

/* Left — Average */
.rating-average {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap: 1.2rem;
}
.rating-average__value {
  font-size: 4.0rem; /* 40px */
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1;
}
.rating-average__stars {
  font-size: 1.8rem; /* 18px */
  color: var(--color-accent);
  display:flex;
  gap: .4rem;
  align-items:center;
}
.star { 
  display:inline-block;
  transform: translateY(.05rem);
  color: #E6E9EE; /* empty default */
  text-shadow: none;
}
/* filled = full star color */
.star.filled { color: var(--color-accent); }
/* half star - use darker primary to indicate partial  (you can replace with SVG for exact half) */
.star.half { 
  /* visually make half star by overlay trick would need SVG; this is a simple color hint */
  color: linear-gradient(90deg, var(--color-accent) 50%, #e6e9ee 50%);
  color: var(--color-accent);
  opacity: 0.85;
}

/* small meta text */
.rating-average__meta {
  font-size: 1.4rem; /* 14px */
  color: var(--muted);
}

/* Right — breakdown rows */
.rating-summary__right {
  display:flex;
  flex-direction:column;
  gap: .8rem;
}

/* each row */
.rating-row {
  display: grid;
  grid-template-columns: 2.4rem 1fr 4.4rem; /* label, bar, count */
  gap: 1.2rem;
  align-items: center;
}
.rating-row__label {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-dark);
  text-align: center;
}
.rating-row__bar {
  height: 1.6rem;
  background: var(--bar-bg);
  border-radius: 1.6rem;
  overflow: hidden;
  position: relative;
  /* set width by the custom property --pct (0..100) */
}
.rating-row__fill {
  /* width uses the --pct property in the inline style of the .rating-row__bar */
  width: calc(var(--pct, 0) * 1%);
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 1.6rem;
  transition: width .5s ease;
}
.rating-row__count {
  font-size: 1.4rem;
  color: var(--muted);
  text-align: right;
}

/* small helper: visually-hidden for accessibility */
.sr-only {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* Responsive */
@media (max-width: 60rem) { /* 600px */
  .rating-summary { grid-template-columns: 1fr; }
  .rating-average { align-items: center; text-align: center; }
  .rating-row { grid-template-columns: 3.2rem 1fr 3.6rem; }
}
```

---

### How to update values dynamically

* To change the percentage of each breakdown bar, update the inline `style="--pct: xx"` on the `.rating-row__bar` element (xx is 0–100).
* To change the counts or average rating, update the text nodes.
* If you want dynamic updates from data (e.g., from an API), you can set those CSS variables with JavaScript:

```js
// Example: set the 5-star percentage to 62
document.querySelector('.rating-row__bar[style]').style.setProperty('--pct', 62);
```

---

### Accessibility notes

* The big average uses `role="img"` with `aria-label` to communicate the rating to screen readers.
* Consider adding `aria-live="polite"` to the container if the rating updates in real-time.
* For pixel-perfect half-stars, replace the star text with SVGs and use masks or two-tone SVGs to show half fills.

---

Perfect — let’s analyze **the “About Dockville” page (the last one you uploaded)** in full detail.

---

## 🎨 **Dockville “About” Page — Design Analysis**

---

### 🧱 1. **Layout & Structure**

* **Page width:** Approx. 1200–1300px fixed-width layout centered on the page.
* **Container padding:**

  * Left/Right: **~64px (4rem)**
  * Section vertical padding: **~80px (5rem)**
* **Grid system:**

  * Two-column layout for *Mission/Vision* section.
  * Four equal columns for *Core Values*.
  * Three columns for *Meet Our Team* and *Awards & Certifications*.
* **Alignment:** Center-aligned headers, consistent vertical rhythm.

---

### 🎯 2. **Typography**

| Section                                                   | Font Family                      | Font Weight    | Font Size                                   | Notes                            |
| --------------------------------------------------------- | -------------------------------- | -------------- | ------------------------------------------- | -------------------------------- |
| Main headings (e.g. “About Dockville”, “Our Core Values”) | **Inter / Poppins (sans-serif)** | **700 (Bold)** | **32–36px**                                 | Clean, modern, high readability. |
| Subheadings (e.g. “Our Mission”, “Meet Our Team”)         | **600 (Semi-bold)**              | 20–24px        | Strong hierarchy, slightly smaller than H1. |                                  |
| Body text / paragraph                                     | **400 (Regular)**                | **14–16px**    | Neutral gray tone for readability.          |                                  |
| Buttons / CTAs                                            | **600**                          | 14px           | Uppercase or high contrast for emphasis.    |                                  |
| Footer text                                               | **400**                          | 12–13px        | Muted gray for secondary content.           |                                  |

🧩 **Line-height:** around **1.5–1.6**, giving a comfortable reading experience.
🧩 **Letter-spacing:** standard (0–0.2px).

---

### 🌈 3. **Color Palette**

| Role                     | Color                                               | Hex (approximate)      |
| ------------------------ | --------------------------------------------------- | ---------------------- |
| **Primary Blue**         | Deep, vivid blue (used in hero & footer background) | `#1A56DB` or `#004BFF` |
| **Accent Yellow/Orange** | Used for icons and highlights                       | `#F9B234` or `#FFA500` |
| **Green (Success)**      | Used in some icons / emphasis                       | `#28A745`              |
| **Gray Background**      | Page background                                     | `#F9FAFB`              |
| **Card White**           | Card backgrounds                                    | `#FFFFFF`              |
| **Text Primary**         | Headings                                            | `#1F2937`              |
| **Text Secondary**       | Body                                                | `#4B5563`              |
| **Footer Dark**          | Dark navy / grayish black                           | `#111827`              |

The contrast between **blue hero sections** and **white content cards** establishes a clear visual flow.

---

### 🔲 4. **Cards, Buttons & UI Elements**

* **Cards:**

  * Background: White `#FFF`
  * Padding: **24–32px**
  * Border-radius: **12–16px**
  * Shadow: **subtle, soft gray (#0000001a)**

* **Buttons:**

  * Primary (Blue): `#1A56DB`
  * Secondary (Yellow): `#F9B234`
  * Padding: **12px 24px**
  * Border-radius: **8px–10px**
  * Text: white (for contrast)

* **Icons:** Circular colored backgrounds (Blue, Green, Orange, Red) sized ~48–56px.

---

### 📏 5. **Spacing & Hierarchy**

| Element                            | Top Margin | Bottom Margin | Notes                      |
| ---------------------------------- | ---------- | ------------- | -------------------------- |
| Section title (e.g. “Our Mission”) | 40–60px    | 20–30px       | Gives breathing space      |
| Between cards (horizontal gap)     | 24px       | –             | Consistent grid            |
| Between sections                   | ~80–100px  | –             | Clearly separates sections |
| Paragraphs inside cards            | 10–16px    | –             | Improves readability       |

This consistent spacing pattern maintains rhythm across the entire page.

---

### 🧭 6. **Hero Section**

* **Background:** Primary blue (#1A56DB)
* **Heading (“About Dockville”)**: White text, bold ~36px
* **Subtitle:** Smaller white/grayish text (~16px, line-height 1.6)
* **Padding:** Top/bottom ~100px
* **Alignment:** Centered both vertically and horizontally

---

### ⚙️ 7. **Footer**

* **Two-tone structure:**

  * Upper CTA area (blue background, white text)
  * Lower information area (dark background, light gray text)

* **Padding:** 60–80px vertical total

* **Icons:** Small, white, evenly spaced (~24px)

---

### 💡 8. **Design Summary**

| Design Quality               | Rating (out of 5) | Notes                                                |
| ---------------------------- | ----------------- | ---------------------------------------------------- |
| **Typography Consistency**   | ⭐⭐⭐⭐              | Modern and legible; consistent sizing hierarchy.     |
| **Color Contrast**           | ⭐⭐⭐⭐½             | Excellent legibility; good accessibility.            |
| **Spacing & Rhythm**         | ⭐⭐⭐⭐⭐             | Exceptional vertical spacing; clean section flow.    |
| **Responsiveness Potential** | ⭐⭐⭐⭐              | Grid system adaptable to smaller screens.            |
| **Visual Hierarchy**         | ⭐⭐⭐⭐½             | Headers, cards, and buttons clearly distinguishable. |

---

### 🧠 **In short:**

Great — using **1rem = 10px** (custom base) as requested. Below is the **Markdown-style design-tokens file** for the Dockville designs (both screenshots). It’s developer-ready, responsive-first (desktop base), and cleaned/professionalized.

You can copy/paste this whole file into your repo or docs. Every token includes the `rem` value (with `px` equivalent in comments) so it’s easy to implement.

---

# Dockville — Design Tokens & Developer Handoff (Desktop-first, 1rem = 10px)

> Notes: base font-size = `10px` so `1rem = 10px`. This makes visual math simpler (`2.4rem = 24px`). Fonts chosen from visual: **Inter** (fallback `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`).

---

## 0. Usage / Implementation notes

* Root base: `html { font-size: 62.5%; } /* 1rem = 10px (assuming browser default 16px) */`
* Desktop canvas used: **1440px** width, content container max-width **1200px**.
* Grid: 12-column system, gutter `3.2rem` (32px), outer page padding `8rem` (80px) on desktop.
* Spacing system follows a 4px baseline scaled to rems (0.4rem increments possible).

---

## 1. Color Tokens

```md
## Color Tokens
--color-primary: #0B47D1;    /* ≈ primary blue (hero) */
--color-primary-600: #0A3DB9;
--color-accent:  #FFB400;    /* bright yellow/orange (cta) */
--color-success: #10B981;    /* green for success badges */
--color-muted:   #6B7280;    /* body grey */
--color-text:    #0F1724;    /* primary dark text */
--color-bg:      #F5F6F8;    /* page light background */
--color-card:    #FFFFFF;    /* card background */
--color-footer:  #0F1724;    /* footer background (dark) */
--color-outline: #E6E9EE;    /* subtle borders / dividers */
--color-danger:  #EF4444;    /* error / negative */
```

> Accessibility tip: Primary blue (#0B47D1) on white passes contrast for large text. Use accent for small CTAs carefully — ensure contrast on blue backgrounds by switching to white text.

---

## 2. Typography Tokens

Font family and weights:

```md
--font-family-heading: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-body:    'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

--font-weight-regular: 400;
--font-weight-medium:  500; /* nav, subhead */
--font-weight-semibold:600; /* card titles, buttons */
--font-weight-bold:    700; /* headings strong */
--font-weight-xbold:   800; /* hero heavy */
```

Responsive scale (desktop base). Values are in `rem` (1rem = 10px):

```md
## Headings & Body (desktop)
--fs-h1: 5.4rem;   /* 54px */
--lh-h1: 1.05;     /* 56.7px line-height ≈ 57px */

--fs-h2: 3.6rem;   /* 36px */
--lh-h2: 1.2;      /* ≈ 43px */

--fs-h3: 2.8rem;   /* 28px */
--lh-h3: 1.25;     /* ≈ 35px */

--fs-h4: 2.2rem;   /* 22px */
--lh-h4: 1.3;

--fs-body-large: 1.9rem; /* 19px (hero subtext, lead) */
--lh-body-large: 1.5;

--fs-body: 1.6rem; /* 16px (default paragraph) */
--lh-body: 1.6;

--fs-small: 1.4rem; /* 14px (captions, small UI) */
--lh-small: 1.5;
```

**Suggested usage**

* Hero heading → `--fs-h1` (5.4rem, heavy)
* Section titles → `--fs-h2` or `--fs-h3`
* Cards titles → `--fs-h4` or `--fs-h3` depending on prominence
* Paragraphs → `--fs-body`
* Micro/captions → `--fs-small`

**Letter spacing**

* Headings: `0` or `0.01rem` (negligible)
* Buttons/uppercase: `0.08rem` (0.8px)
* Body text: normal

---

## 3. Spacing & Rhythm (scale)

Using a 4px baseline but expressed in rems:

```md
--space-xxs: 0.4rem; /* 4px */
--space-xs:  0.8rem; /* 8px */
--space-s:   1.2rem; /* 12px */
--space-m:   1.6rem; /* 16px */
--space-lg:  2.4rem; /* 24px */
--space-xl:  3.2rem; /* 32px */
--space-xxl: 4.8rem; /* 48px */
--space-xxxl:8.0rem; /* 80px */
```

**Page container & sections**

* Page side padding (desktop): `8.0rem` (80px) each side
* Content container max width: `120rem` (1200px)
* Section vertical rhythm: typically `--space-xxxl` (80px) between major sections, inner spacing uses `--space-lg` → `--space-xxl` depending on grouping.

---

## 4. Grid & Layout

```md
## Grid
- Canvas width: 1440px
- Container max-width: 1200px (120rem)
- Columns: 12
- Gutter: 3.2rem (32px)
- Column width: computed based on container width and gutter
- Outer page padding: 8.0rem (80px)
```

Hero uses a 2-column layout (content left, image/card right) with center vertical alignment on desktop. Services and cards use a 3-column grid with consistent card widths and equal gaps.

---

## 5. Components — Specs

### Navbar

```md
Height: 7.2rem (72px)
Padding: 0 8.0rem (left/right)
Logo size: 2.2rem font (22px)
Nav links: --fs-body (1.6rem / 16px), weight 500, spacing between links ~2.4rem
Background: white
Bottom border: 0.1rem solid --color-outline
```

### Hero (top of page in first image)

```md
Hero container height: 44rem (440px) /* approximate, scaled to content */
Hero padding (top-bottom): 6.0rem (60px)
Hero layout: 2-column (left text, right image)
Hero H1: --fs-h1 (5.4rem / 54px), weight 800
Hero subtext: --fs-body-large (1.9rem / 19px), weight 400
Primary CTA (filled accent):
  - Height: 4.8rem (48px)
  - Padding: 0 2.4rem
  - Font: --fs-body (1.6rem), weight 600
  - Border-radius: 0.8rem (8px)
Secondary CTA (outline):
  - Same height
  - Border: 0.16rem solid var(--color-primary)
  - Background: transparent
Image card: rounded radius 1.6rem (16px); shadow: 0 2.4rem 6.0rem rgba(11,71,209,0.08) (soft)
```

### Service Card (three across)

```md
Card width: fluid — column dependent; typical card max-width ~34rem (340px)
Padding: 2.4rem (24px) inner
Border-radius: 1.4rem (14px)
Background: var(--color-card)
Shadow: 0 0.8rem 2.4rem rgba(15,23,36,0.06)
Icon circle: 5.6rem (56px) diameter with colored background for icon
Title: --fs-h4 (2.2rem / 22px), weight 600
Price/number emphasis: e.g., 2.4rem-3.6rem depending on section
Buttons:
  - Height: 4.6rem (46px)
  - Border-radius: 0.8rem (8px)
  - Primary filled -> use accent or primary depending on context
```

### Pricing / Table (from second screenshot)

```md
Table container max-width: 90% of content width
Row height: 4.8rem (48px)
Text: --fs-body (1.6rem)
Badges (features): pill with small text --fs-small (1.4rem), padding 0.6rem 1.2rem, border-radius 2.0rem
Table border: 0.08rem solid --color-outline
```

### Stats bar (middle blue strip)

```md
Height: 10.0rem (100px)
Stat number: 3.6rem (36px) weight 700
Stat label: 1.4rem (14px)
Background: var(--color-primary)
```

### Testimonials

```md
Card width: ~46rem (460px)
Padding: 2.4rem
Border-radius: 1.2rem
Shadow: subtle
Avatar size: 4.0rem (40px)
Stars/ratings: use icon size 1.4rem
Text: --fs-small for body inside testimonial
```

### Footer

```md
Footer top area height: 12.0rem
Background: var(--color-footer)
Footer text: --fs-small (1.4rem), color: #E6EDF4 (light on dark)
Footer logo small: 2.2rem
```

---

## 6. Border radius & shadows

```md
--radius-xs: 0.6rem;   /* 6px */
--radius-sm: 0.8rem;   /* 8px */
--radius-md: 1.2rem;   /* 12px */
--radius-lg: 1.6rem;   /* 16px */
--radius-xl: 2.0rem;   /* 20px */

--shadow-1: 0 0.8rem 2.4rem rgba(15,23,36,0.06);  /* cards */
--shadow-2: 0 2.4rem 6.0rem rgba(11,71,209,0.08); /* hero image / large lifts */
```

---

## 7. Buttons (detailed)

**Primary (Accent filled)**

```md
- Height: 4.8rem (48px)
- Font: --fs-body (1.6rem) / weight 600
- Padding: 0 2.4rem
- Border-radius: --radius-sm (0.8rem)
- Background: var(--color-accent)
- Text color: #0F1724 (dark) or #ffffff if on dark bg
- Box-shadow: none or subtle
```

**Secondary (Primary filled / outline)**

```md
- Filled Primary: background var(--color-primary) with white text
- Outline Primary: transparent bg, border 0.16rem solid var(--color-primary), text color var(--color-primary)
```

**Ghost / Link**

* Minimal padding, small uppercase, letter-spacing `0.08rem`.

---

## 8. Tokens — Full code block (Markdown)

```md
## CSS-like tokens (rem values, comments for px)
--base: 1rem; /* 10px */

--color-primary: #0B47D1;
--color-accent:  #FFB400;
--color-success: #10B981;
--color-muted:   #6B7280;
--color-text:    #0F1724;
--color-bg:      #F5F6F8;
--color-card:    #FFFFFF;
--color-outline: #E6E9EE;
--color-footer:  #0F1724;

--font-family-heading: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-body:    var(--font-family-heading);

--fw-regular: 400;
--fw-medium:  500;
--fw-semi:    600;
--fw-bold:    700;
--fw-xbold:   800;

--fs-h1: 5.4rem;   /* 54px */
--fs-h2: 3.6rem;   /* 36px */
--fs-h3: 2.8rem;   /* 28px */
--fs-h4: 2.2rem;   /* 22px */
--fs-lead: 1.9rem; /* 19px */
--fs-body: 1.6rem; /* 16px */
--fs-sm:   1.4rem; /* 14px */

--lh-h1: 1.05;
--lh-h2: 1.2;
--lh-h3: 1.25;
--lh-body: 1.6;

--space-xxs: 0.4rem; /* 4px */
--space-xs:  0.8rem; /* 8px */
--space-s:   1.2rem; /* 12px */
--space-m:   1.6rem; /* 16px */
--space-lg:  2.4rem; /* 24px */
--space-xl:  3.2rem; /* 32px */
--space-xxl: 4.8rem; /* 48px */
--space-xxxl:8.0rem; /* 80px */

--radius-sm: 0.8rem;  /* 8px */
--radius-md: 1.2rem;  /* 12px */
--radius-lg: 1.6rem;  /* 16px */

--shadow-card: 0 0.8rem 2.4rem rgba(15,23,36,0.06);
--shadow-hero: 0 2.4rem 6.0rem rgba(11,71,209,0.08);
```

---

## 9. Responsive Rules (brief)

Breakpoints (rem values, base 10px):

```md
--bp-desktop: 120rem; /* 1200px & up */
--bp-laptop:  100rem; /* 1000px */
--bp-tablet:  76.8rem;/* 768px */
--bp-mobile:  37.5rem;/* 375px */
```

**Scaling hints**

* H1: `5.4rem` → scale down to `3.6rem` at tablet (`--fs-h1-tablet: 3.6rem`) and `2.4rem` on mobile.
* Buttons: reduce height from `4.8rem` → `4.0rem` on tablet → `3.6rem` on mobile.
* Grid goes 3 columns → 2 columns → 1 column at mobile.

---

## 10. Implementation example (CSS excerpt) — optional for your devs

```css
/* root (use 62.5% trick to make 1rem=10px) */
:root{
  font-size:62.5%;
  --color-primary:#0B47D1;
  --color-accent:#FFB400;
  --font-family-heading: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  --fs-h1:5.4rem;
  --fs-body:1.6rem;
  --space-lg:2.4rem;
  --radius-lg:1.6rem;
}

/* usage */
h1{ font-family:var(--font-family-heading); font-size:var(--fs-h1); line-height:1.05; font-weight:800; color:var(--color-primary); }
p{ font-size:var(--fs-body); line-height:var(--lh-body); color:var(--color-muted); }
.btn-primary{ background:var(--color-accent); padding:0 2.4rem; height:4.8rem; border-radius:0.8rem; font-weight:600; }
```

---






