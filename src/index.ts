import { ScaleAdjus } from './core/ScaleAdjus';
import { vanillaAdapter } from './adapters/vanilla';
import { tailwindPlugin } from './plugins/tailwind';
import { cssPlugin } from './plugins/css';

export * from './core/types';
export { ScaleAdjus };
export { vanillaAdapter as VanillaScaleAdjus };
export { tailwindPlugin as TailwindScaleAdjus };
export { cssPlugin as CSSScaleAdjus };

export default ScaleAdjus;
