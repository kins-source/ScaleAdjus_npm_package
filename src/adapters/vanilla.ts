import { ScaleAdjus } from '../core/ScaleAdjus';
import { ScaleOptions, ScaleAdjusInstance } from '../core/types';

export function vanillaAdapter(options: ScaleOptions = {}): ScaleAdjusInstance {
  const instance = new ScaleAdjus({
    ...options,
    autoInit: true,
  });
  
  return instance;
}