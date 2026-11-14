# Vue Example

```vue
<template>
  <div>
    <p>Current Scale: {{ scale }}</p>
    <p>Device: {{ deviceInfo?.type }}</p>
    <p>Width: {{ deviceInfo?.width }}px</p>
    <button @click="setScale(1.2)">Set Scale 1.2</button>
    <button @click="setScale(0.8)">Set Scale 0.8</button>
    <button @click="resetScale">Reset to Default</button>
    <button @click="updateOptions({ smoothTransition: false })">
      Disable Transitions
    </button>
  </div>
</template>

<script setup lang="ts">
import { createVuePlugin } from 'scaleadjus/vue';
import 'scaleadjus/styles.css';

const {
  scale,
  deviceInfo,
  setScale,
  resetScale,
  updateOptions,
} = createVuePlugin();
</script>
```
