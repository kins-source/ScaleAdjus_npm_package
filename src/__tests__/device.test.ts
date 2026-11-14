import { getDeviceScaleFactor, getDeviceType, isDeviceType } from '../utils/device';

const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
  largeMonitor: 1600,
};

describe('device utilities', () => {
  it('detects viewport device categories from breakpoints', () => {
    expect(getDeviceType(375, breakpoints)).toBe('mobile');
    expect(getDeviceType(900, breakpoints)).toBe('tablet');
    expect(getDeviceType(1366, breakpoints)).toBe('desktop');
    expect(getDeviceType(1920, breakpoints)).toBe('large-monitor');
  });

  it('checks a specific device category', () => {
    expect(isDeviceType('tablet', 900, breakpoints)).toBe(true);
    expect(isDeviceType('desktop', 900, breakpoints)).toBe(false);
  });

  it('falls back to desktop scale factor', () => {
    expect(
      getDeviceScaleFactor('unknown', {
        mobile: 0.85,
        tablet: 0.95,
        desktop: 1,
      })
    ).toBe(1);
  });
});
