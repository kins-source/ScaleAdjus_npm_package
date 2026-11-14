export interface ScaleOptions {
  baseScale?: number;
  minScale?: number;
  maxScale?: number;
  enableMobile?: boolean;
  enableTablet?: boolean;
  enableDesktop?: boolean;
  enableLargeMonitor?: boolean;
  smoothTransition?: boolean;
  transitionDuration?: number;
  debug?: boolean;
  autoInit?: boolean;
  breakpoints?: Breakpoints;
  scaleFactors?: ScaleFactors;
  excludeSelectors?: string[];
  includeSelectors?: string[];
  customCSS?: string;
}

export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  largeMonitor?: number;
}

export interface ScaleFactors {
  mobile: number;
  tablet: number;
  desktop: number;
  largeMonitor?: number;
}

export interface DeviceInfo {
  type: DeviceType;
  width: number;
  height: number;
  scale: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeMonitor: boolean;
}

export interface ScaleEvent {
  device: DeviceType;
  scale: number;
  width: number;
  height: number;
  timestamp: number;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-monitor' | 'unknown';

export interface ScaleAdjusInstance {
  init(): void;
  destroy(): void;
  setScale(scale: number): void;
  resetScale(): void;
  updateOptions(options: Partial<ScaleOptions>): void;
  getCurrentScale(): number;
  getDeviceInfo(): DeviceInfo;
  getElementScale(element: HTMLElement): number;
  setElementScale(element: HTMLElement, scale: number): void;
  resetElementScale(element: HTMLElement): void;
  addEventListener(event: string, callback: (event: ScaleEvent) => void): void;
  removeEventListener(event: string, callback: (event: ScaleEvent) => void): void;
}

export interface AdapterOptions {
  container?: HTMLElement | string;
  autoApply?: boolean;
  watchChanges?: boolean;
  throttleDelay?: number;
}

export interface Plugin {
  name: string;
  version: string;
  apply(config: any): void;
}

export interface CSSOptions {
  prefix?: string;
  includeComponents?: string[];
  excludeComponents?: string[];
  customProperties?: Record<string, string>;
}