import { useEffect, useRef, useState, useCallback } from 'react';
import { ScaleAdjus } from '../core/ScaleAdjus';
import { ScaleOptions, DeviceInfo, ScaleEvent } from '../core/types';

export function createReactHook(options: ScaleOptions = {}) {
  const instanceRef = useRef<ScaleAdjus | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [scale, setScaleState] = useState<number>(1);

  useEffect(() => {
    if (!instanceRef.current) {
      instanceRef.current = new ScaleAdjus({
        ...options,
        autoInit: true,
      });
      
      instanceRef.current.addEventListener('scaleadjus:scale', (data: ScaleEvent) => {
        setScaleState(data.scale);
        setDeviceInfo(instanceRef.current?.getDeviceInfo() || null);
      });
      
      setDeviceInfo(instanceRef.current.getDeviceInfo());
      setScaleState(instanceRef.current.getCurrentScale());
    }
    
    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  const setScale = useCallback((newScale: number) => {
    instanceRef.current?.setScale(newScale);
  }, []);

  const resetScale = useCallback(() => {
    instanceRef.current?.resetScale();
  }, []);

  const updateOptions = useCallback((newOptions: Partial<ScaleOptions>) => {
    instanceRef.current?.updateOptions(newOptions);
  }, []);

  return {
    scale,
    deviceInfo,
    setScale,
    resetScale,
    updateOptions,
    instance: instanceRef.current,
  };
}
