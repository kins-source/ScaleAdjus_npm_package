# React Example

```tsx
import { createReactHook } from 'scaleadjus/react';
import 'scaleadjus/styles.css';

export function App() {
  const {
    scale,
    deviceInfo,
    setScale,
    resetScale,
    updateOptions,
  } = createReactHook({
    baseScale: 1,
    minScale: 0.5,
    maxScale: 1.5,
    smoothTransition: true,
  });

  return (
    <div>
      <p>Current Scale: {scale}</p>
      <p>Device: {deviceInfo?.type}</p>
      <p>Width: {deviceInfo?.width}px</p>
      <button onClick={() => setScale(1.2)}>Set Scale 1.2</button>
      <button onClick={() => setScale(0.8)}>Set Scale 0.8</button>
      <button onClick={resetScale}>Reset to Default</button>
      <button onClick={() => updateOptions({ smoothTransition: false })}>
        Disable Transitions
      </button>
    </div>
  );
}
```
