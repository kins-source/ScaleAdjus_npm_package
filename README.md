# ScaleAdjus

-Universal responsive scaling for websites and apps(compatible with npm) and applications across all devices.
-Implement scaleadjus npm package to your projects and you no need to extra work in adjusting components for website/apps across multi-devices (pc,laptop,tablet,phones) as it adjust the size of components/icons/buttons,etc throughout entire website.


[![npm version](https://badge.fury.io/js/scaleadjus.svg)](https://www.npmjs.com/package/scaleadjus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dm/scaleadjus.svg)](https://www.npmjs.com/package/scaleadjus)

ScaleAdjus is a small TypeScript package for automatic, device-aware scaling. It helps developers keep components, buttons, icons, cards, layouts, and text visually balanced across phones, tablets, laptops, desktops, and large monitors without rewriting the same responsive sizing rules again and again.

## Why Use It

- Automatically detects screen size and maps it to mobile, tablet, desktop, or large monitor.
- Applies a controlled scale factor to selected elements.
- Updates CSS variables such as `--sa-scale` and `--sa-device`.
- Includes vanilla JavaScript, React, Vue, Angular, CSS, and Tailwind entry points.
- Keeps framework adapters optional, so plain JavaScript users do not need React, Vue, or Angular installed.
- Ships TypeScript declarations and browser-ready UMD, CommonJS, and ESM builds.

## Installation

```bash
npm install scaleadjus
```

```bash
yarn add scaleadjus
```

```bash
pnpm add scaleadjus
```

```bash
bun add scaleadjus
```

## Quick Start

```ts
import ScaleAdjus from 'scaleadjus';
import 'scaleadjus/styles.css';

const scaler = new ScaleAdjus({
  autoInit: true,
  baseScale: 1,
  minScale: 0.75,
  maxScale: 1.25,
});

scaler.setScale(1.05);
```

By default, ScaleAdjus targets the page and updates itself on resize, orientation changes, and DOM changes.

## CDN Usage

```html
<link rel="stylesheet" href="https://unpkg.com/scaleadjus/dist/styles.css">
<script src="https://unpkg.com/scaleadjus/dist/index.umd.js"></script>
```

```html
<script>
  const scaler = new ScaleAdjus.ScaleAdjus({
    autoInit: true,
  });
</script>
```

## Options

```ts
const scaler = new ScaleAdjus({
  baseScale: 1,
  minScale: 0.75,
  maxScale: 1.25,
  smoothTransition: true,
  transitionDuration: 300,
  includeSelectors: ['body', '.app-shell', '.scale-me'],
  excludeSelectors: ['.sa-no-scale', '[data-no-scale]'],
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
    largeMonitor: 1600,
  },
  scaleFactors: {
    mobile: 0.85,
    tablet: 0.95,
    desktop: 1,
    largeMonitor: 1.1,
  },
});
```

## Framework Adapters

### React

```tsx
import { createReactHook } from 'scaleadjus/react';
import 'scaleadjus/styles.css';

export function App() {
  const { scale, deviceInfo, setScale, resetScale } = createReactHook();

  return (
    <main>
      <p>Current scale: {scale}</p>
      <p>Device: {deviceInfo?.type}</p>
      <button onClick={() => setScale(1.1)}>Scale up</button>
      <button onClick={resetScale}>Reset</button>
    </main>
  );
}
```

### Vue

```ts
import { createVuePlugin } from 'scaleadjus/vue';
import 'scaleadjus/styles.css';

const { scale, deviceInfo, setScale, resetScale } = createVuePlugin();
```

### Angular

```ts
import { createAngularService } from 'scaleadjus/angular';

// Provide createAngularService in Angular and inject it where scaling controls are needed.
```

## Vanilla Adapter

```ts
import { VanillaScaleAdjus } from 'scaleadjus';

const scaler = VanillaScaleAdjus({
  includeSelectors: ['.app', '.card', '.button'],
});
```

## CSS Utilities

Import the stylesheet once:

```ts
import 'scaleadjus/styles.css';
```

Useful classes:

- `sa-container` keeps content full-width and boxed correctly.
- `sa-grid` creates responsive grid columns.
- `sa-flex` enables wrapping flex layouts.
- `sa-responsive` scales text with `--sa-scale`.
- `sa-no-scale` excludes an element from ScaleAdjus transforms.
- `sa-hidden-mobile`, `sa-visible-mobile`, `sa-hidden-tablet`, and related helpers handle visibility by device range.

## Events

```ts
scaler.addEventListener('scaleadjus:scale', (event) => {
  console.log(event.scale, event.device, event.width, event.height);
});
```

Available events:

- `scaleadjus:init`
- `scaleadjus:scale`
- `scaleadjus:reset`
- `scaleadjus:destroy`
- `scaleadjus:update`
- `scaleadjus:device-change`

## API

- `init()` starts scaling.
- `destroy()` removes listeners, injected styles, and scaling state.
- `setScale(scale)` applies a manual scale.
- `resetScale()` returns to the configured base scale.
- `updateOptions(options)` changes runtime configuration.
- `getCurrentScale()` returns the current scale value.
- `getDeviceInfo()` returns the current device type, viewport size, and calculated scale.
- `setElementScale(element, scale)` scales one element.
- `resetElementScale(element)` removes scaling from one element.

## Build From Source

```bash
npm install
npm run build
npm run lint
```

Generated package files are written to `dist`.

## Package Entry Points

- `scaleadjus` for the core package, vanilla adapter, CSS plugin, and Tailwind plugin.
- `scaleadjus/react` for the React hook adapter.
- `scaleadjus/vue` for the Vue composition adapter.
- `scaleadjus/angular` for the Angular service adapter.
- `scaleadjus/styles.css` for packaged CSS utilities.

## License

MIT
