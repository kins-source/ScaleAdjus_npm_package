export const DEFAULT_OPTIONS = {
  baseScale: 1,
  minScale: 0.5,
  maxScale: 1.5,
  enableMobile: true,
  enableTablet: true,
  enableDesktop: true,
  enableLargeMonitor: true,
  smoothTransition: true,
  transitionDuration: 300,
  debug: false,
  autoInit: true,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
    largeMonitor: 1600,
  },
  scaleFactors: {
    mobile: 0.8,
    tablet: 0.9,
    desktop: 1,
    largeMonitor: 1.1,
  },
  excludeSelectors: [],
  includeSelectors: ['*'],
  customCSS: '',
};

export const CSS_PREFIX = 'sa';

export const EVENTS = {
  INIT: 'scaleadjus:init',
  SCALE: 'scaleadjus:scale',
  RESET: 'scaleadjus:reset',
  DESTROY: 'scaleadjus:destroy',
  UPDATE: 'scaleadjus:update',
  DEVICE_CHANGE: 'scaleadjus:device-change',
  ERROR: 'scaleadjus:error',
};

export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  LARGE_MONITOR: 'large-monitor',
  UNKNOWN: 'unknown',
} as const;

export const TRANSFORM_ORIGIN = 'top left';