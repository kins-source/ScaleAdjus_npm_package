import { Breakpoints, DeviceType } from '../core/types';
import { DEFAULT_OPTIONS } from '../core/constants';

export function getDeviceType(
  width: number,
  breakpoints: Breakpoints = DEFAULT_OPTIONS.breakpoints
): DeviceType {
  if (width <= breakpoints.mobile) return 'mobile';
  if (width <= breakpoints.tablet) return 'tablet';
  if (breakpoints.largeMonitor && width <= breakpoints.largeMonitor) return 'desktop';
  if (breakpoints.largeMonitor && width > breakpoints.largeMonitor) return 'large-monitor';
  return 'desktop';
}

export function detectDevice(): {
  type: DeviceType;
  width: number;
  height: number;
  isTouchDevice: boolean;
  pixelRatio: number;
} {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const pixelRatio = window.devicePixelRatio || 1;
  
  return {
    type: getDeviceType(width),
    width,
    height,
    isTouchDevice,
    pixelRatio,
  };
}

export function isDeviceType(
  type: DeviceType,
  width: number,
  breakpoints: Breakpoints
): boolean {
  return getDeviceType(width, breakpoints) === type;
}

export function getDeviceScaleFactor(
  deviceType: DeviceType,
  scaleFactors: Record<string, number>
): number {
  return scaleFactors[deviceType] || scaleFactors.desktop || 1;
}