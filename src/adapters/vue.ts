import { ref, onMounted, onUnmounted } from 'vue';
import { ScaleAdjus } from '../core/ScaleAdjus';
import { ScaleOptions, DeviceInfo, ScaleEvent } from '../core/types';

export function createVuePlugin(options: ScaleOptions = {}) {
  const instance = ref<ScaleAdjus | null>(null);
  const scale = ref<number>(1);
  const deviceInfo = ref<DeviceInfo | null>(null);
  
  onMounted(() => {
    instance.value = new ScaleAdjus({
      ...options,
      autoInit: true,
    });
    
    instance.value.addEventListener('scaleadjus:scale', (data: ScaleEvent) => {
      scale.value = data.scale;
      deviceInfo.value = instance.value?.getDeviceInfo() || null;
    });
    
    scale.value = instance.value.getCurrentScale();
    deviceInfo.value = instance.value.getDeviceInfo();
  });
  
  onUnmounted(() => {
    instance.value?.destroy();
    instance.value = null;
  });
  
  const setScale = (newScale: number) => {
    instance.value?.setScale(newScale);
  };
  
  const resetScale = () => {
    instance.value?.resetScale();
  };
  
  const updateOptions = (newOptions: Partial<ScaleOptions>) => {
    instance.value?.updateOptions(newOptions);
  };
  
  return {
    instance,
    scale,
    deviceInfo,
    setScale,
    resetScale,
    updateOptions,
  };
}
