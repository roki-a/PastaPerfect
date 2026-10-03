# Design System

The Pasta Perfect design system defines the visual rules and reusable
components used across the application. The system covers colour,
typography, spacing, shapes, visual assets, responsive behaviour, and
accessibility.

The visual design system is also provided as a PDF with colour swatches,
contrast checks, type samples, spacing rules, and component information.

## Styling approach

Pasta Perfect uses CSS Modules with CSS custom properties for shared
design tokens. There is no external UI component library.

The design tokens are defined in:

`client/src/styles/tokens.css`

Components use the shared token values instead of defining unrelated
visual values for individual screens.

## Logo

The Pasta Perfect logo is used consistently throughout the application.

- The cream logo is used on the green page background.
- The green logo is used on cream cards and panels.
- The logo is kept at least 56px tall.
- The logo is not stretched or recoloured.
- The pixel tomato is reserved for the favicon and empty states.

## Colour

| Token | Name | Hex | Use |
|---|---|---|---|
| `--color-bg` | Pakistan Green | `#16330D` | Page background |
| `--color-text` | Pakistan Green | `#16330D` | Text on cream cards, panels, and inputs |
| `--color-surface` | Dutch White | `#E5DCB7` | Cards, panels, and inputs |
| `--color-text-on-bg` | Dutch White | `#E5DCB7` | Text on the green page background |
| `--color-primary` | Falu Red | `#701414` | Buttons, links, timer digits, and dial band on cream |
| `--color-accent` | Poppy | `#DB3E3E` | Tomato graphics, navigation underline, focus ring, and CheckerBand |
| `--color-secondary` | Asparagus | `#7EA366` | Small text and lines on green, pixel shadows, Info tags, and tomato leaves |

The intended colour balance is approximately 60% green page background,
30% cream cards, and 10% accent colours.

## Colour contrast

Text colour combinations are designed to meet the WCAG minimum contrast
ratio of 4.5:1 for normal text. Graphics use a minimum ratio of 3:1.

The documented contrast ratios include:

| Foreground | Background | Ratio | Use |
|---|---|---:|---|
| Dutch White | Pakistan Green | 10.08:1 | Text on the page |
| Pakistan Green | Dutch White | 10.08:1 | Text on cards |
| Dutch White | Falu Red | 8.48:1 | Primary button text and Done window |
| Falu Red | Dutch White | 8.48:1 | Links, errors, and timer digits |
| Asparagus | Pakistan Green | 4.84:1 | Small text on the page |
| Pakistan Green | Asparagus | 4.84:1 | Text inside Info tags |
| Poppy | Dutch White | 3.20:1 | Graphics only |
| Poppy | Pakistan Green | 3.15:1 | Graphics only |

Poppy is not used as a normal text colour because its documented
contrast ratios are suitable for graphics but not normal text.

The contrast checks were verified using WebAIM. The detailed visual
verification is included in the design-system PDF. :contentReference[oaicite:2]{index=2} :contentReference[oaicite:3]{index=3}

## Typography

Pasta Perfect uses two font families:

- Bricolage Grotesque for headings and timer digits.
- DM Sans for body text, labels, buttons, and supporting information.

| Token | Size | Weight | Use |
|---|---:|---:|---|
| `--font-size-xl` | 32px | 800 | Screen titles |
| `--font-size-lg` | 20px | 700 | Card titles |
| `--font-size-base` | 16px | 400 / 600 | Body text, inputs, and buttons |
| `--font-size-sm` | 14px | 400 | Tags, labels, errors, and footer |

The tomato timer uses responsive sizing. Its width uses:

`clamp(240px, 80vw, 420px)`

The timer digits scale with the tomato while remaining readable on
smaller screens.

## Spacing

The application uses an 8px base spacing unit.

| Token | Size | Use |
|---|---:|---|
| `--space-1` | 8px | Icon-to-label spacing and tag gaps |
| `--space-2` | 16px | Card padding and phone edge padding |
| `--space-3` | 24px | Gaps between cards |
| `--space-4` | 32px | Section spacing and desktop edge padding |
| `--space-5` | 48px | Page top and bottom spacing |

This spacing scale is reused throughout the interface rather than
using unrelated values for individual components. :contentReference[oaicite:4]{index=4}

## Shape and visual style

The interface uses a pixel-inspired visual style.

- Cards use a 4px border radius.
- Cards use 2px borders.
- Cards use a hard pixel shadow of `4px 4px 0` in Asparagus.
- Soft blur shadows are not used.
- Pressed buttons move 2px into their shadow.
- The CheckerBand uses Poppy and Dutch White 8px tiles in two rows.
- The CheckerBand is decorative and uses `aria-hidden`.

## Visual assets

Pasta icons use a pixel style and are displayed on 56px green tiles.

The icon shapes include:

- Bowl: spaghetti, linguine, fettuccine, and angel hair
- Bow tie: farfalle
- Tube: penne, rigatoni, and macaroni
- Shell: fusilli and ravioli

Decorative pasta icons use empty alternative text when the pasta name is
already provided separately.

The pixel tomato is used for the favicon and empty states.

The tomato timer is the main visual element of the Cook screen. It uses
a cream window for the remaining time and doneness, with a dial band
around the tomato for adjusting the cooking time. :contentReference[oaicite:5]{index=5}

## Reusable components

The application uses reusable components so that common interface
elements remain visually consistent.

| Component | Level | Used on |
|---|---|---|
| Button | Atom | All screens |
| Tag | Atom | Presets, Cook, Editor, Recipes |
| PastaIcon | Atom | Presets, Cook, Editor, Recipes |
| CheckerBand | Atom | Header and Footer |
| FormField | Molecule | Editor and Presets search |
| SegmentedControl | Molecule | Presets, Cook, Editor |
| PresetCard | Molecule | Presets and Editor preview |
| RecipeCard | Molecule | Recipes |
| TimerDisplay | Molecule | Cook |
| TimerControls | Molecule | Cook |
| Header / Footer | Organism | Every screen |

Tags have three tones: Recommended, My time, and Info.

The SegmentedControl is used for the three doneness options:

- Al dente
- Firm
- Soft

PresetCard displays the pasta, cooking time, tag, and Start button.
Starting a preset opens the Cook screen with the tomato timer. :contentReference[oaicite:6]{index=6}

## Component interaction and accessibility states

Interactive components use visible keyboard focus states.

The focus ring uses Poppy and is approximately 3px wide.

Buttons and inputs have a minimum height of 44px.

The timer dial is implemented as a slider so it can be controlled with
the keyboard as well as by dragging.

The timer supports:

- Idle state
- Running state
- Done state

At zero, the timer displays the completed state visually and provides
an audio alert. Reduced-motion preferences prevent the tomato from
shaking.

The documented design system also defines a `disabled` property for
the reusable Button component and an `error` property for FormField.
The design-system PDF does not define a separate loading visual state,
so no additional loading appearance is specified here. :contentReference[oaicite:7]{index=7}

## Application states

The main documented timer states are:

- Idle: `10:00`, Al dente
- Running: `06:12`, Al dente
- Done: `00:00`, Drain now!

The application also uses empty and error states where appropriate.
The pixel tomato is reserved for empty-state visuals.

Timer completion is communicated visually through the red timer window
and through sound. `aria-live` announces the timer at each minute and
at zero rather than every second.

## Responsive design

The responsive layout uses two main breakpoints.

Below 640px:

- Cards become one column.
- Navigation collapses into a menu button.
- Buttons become full width.
- The layout uses 16px edge padding.

At 640px and above:

- Navigation becomes inline.
- Cards display two to three across using
  `repeat(auto-fill, minmax(260px, 1fr))`.
- The Cook screen can split the timer and details.
- Desktop edge padding is 32px.

The interface is designed to avoid horizontal scrolling at a 375px
viewport width. :contentReference[oaicite:8]{index=8}

## Accessibility

The design system follows these accessibility rules:

- Text colour combinations meet the documented contrast requirements.
- Semantic HTML is used for headers, navigation, main content, and footers.
- Interactive controls use real buttons where appropriate.
- Meaningful images have alternative text.
- Decorative images use empty alternative text.
- Form fields have matching labels.
- Interactive elements can be reached using the keyboard.
- The timer dial supports keyboard controls.
- Focus states use a visible focus ring.
- Buttons and inputs are at least 44px tall.
- Timer completion is communicated visually and through sound.
- Reduced-motion preferences are respected.
- The decorative CheckerBand is hidden from assistive technology.

## Design system assets

The visual design-system PDF is included with the project documentation.
It contains the colour swatches, contrast verification, typography,
spacing rules, visual assets, reusable component documentation, and
accessibility details.

The colour, typography, spacing, and component rules are reused across
the Presets, Cook, Preset Form, and Recipes screens so that the
application maintains a consistent visual language.