---
name: senangwebs-modals
description: Customizable modal dialogs via HTML data attributes or JavaScript API with positioning, animations, and accessibility.
version: 1.1.1
package: senangwebs-modals
---

# SenangWebs Modals (SWM)

## Quick Reference

- **Purpose**: Modal dialog system with declarative HTML and JS API
- **Entry**: `dist/swm.js`
- **Dependencies**: none
- **Scripts**: `npm run build`, `npm run dev`, `npm run prepublishOnly`

## Workflow

Start in `C:\wamp64\www\sw-libraries\senangwebs-modals`. Read `README.md`, `package.json`, and touched source files. Match existing patterns, CSS prefix `swm-`.

## HTML Data Attributes

### Modal container
| Attribute | Description |
|---|---|
| `data-swm` | Modal container flag |

### Trigger button
| Attribute | Values |
|---|---|
| `data-swm-btn` | Marks element as modal trigger |
| `data-swm-title` | Modal title text |
| `data-swm-position` | `center`, `top`, `top left`, `top right`, `bottom`, `bottom left`, `bottom right`, `left`, `right` |
| `data-swm-bg-color` | Overlay color (hex) |
| `data-swm-bg-opacity` | Overlay opacity (0–1) |
| `data-swm-bg-blur` | Backdrop blur (px) |
| `data-swm-z-index` | Overlay z-index |
| `data-swm-footer` | Footer text |

### Content
| Attribute | Description |
|---|---|
| `data-swm-body` | Modal body content container |

## JavaScript API

```js
// Create modal programmatically (returns { closeModal })
const { closeModal } = SWM.createModal({
  title, content, footer, position,
  bgColor, bgOpacity, bgBlur, zIndex
})

// Open an HTML-defined modal
SWM.openModal('#myModal')

// Close programmatic modal
closeModal()
```

## Focus Areas

- Modal trigger/content wiring via `data-swm` + `data-swm-btn` + `data-swm-body`
- Positioning: 9 fixed positions
- Overlay: color, opacity, backdrop-blur, z-index
- Open/close lifecycle: animation, topmost-modal focus trapping, dialog ARIA attributes
- Close triggers: X button, overlay click, Escape key
- Repeated instances: multiple modals on same page
- Focus management: moves to the close button, cycles with Tab/Shift+Tab, returns to trigger on close

## Implementation Guidance

- Preserve backward compatibility for all attributes, method signatures, and CSS classes
- Test Escape key and overlay-click close on all positions
- Verify Tab and Shift+Tab cannot leave the topmost open modal
- Verify focus returns to the triggering element after close
- Check nested modals don't break z-index stacking

## Validation

```bash
npm run build
npm run prepublishOnly
```
