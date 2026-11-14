import { 
  ScaleOptions, 
  DeviceInfo, 
  ScaleEvent,
  ScaleAdjusInstance
} from './types';
import { DEFAULT_OPTIONS, CSS_PREFIX, EVENTS, TRANSFORM_ORIGIN } from './constants';
import { debounce, throttle } from '../utils/debounce';
import { getDeviceType } from '../utils/device';
import { EventEmitter } from '../utils/events';

export class ScaleAdjus implements ScaleAdjusInstance {
  private options: ScaleOptions;
  private currentScale: number;
  private deviceInfo: DeviceInfo;
  private initialized: boolean = false;
  private styleElement: HTMLStyleElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private eventEmitter: EventEmitter;
  private cleanupFunctions: (() => void)[] = [];

  constructor(options: Partial<ScaleOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.currentScale = this.options.baseScale || 1;
    this.deviceInfo = this.getDeviceInfo();
    this.eventEmitter = new EventEmitter();
    
    if (this.options.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.initialized) return;
    
    this.injectStyles();
    this.applyScale();
    this.setupResizeListener();
    this.setupMutationObserver();
    this.setupDeviceChangeListener();
    
    this.initialized = true;
    this.emitEvent(EVENTS.INIT, this.createEventData());
  }

  public destroy(): void {
    if (!this.initialized) return;
    
    this.removeInjectedStyles();
    this.removeEventListeners();
    this.resetAllElements();
    
    this.initialized = false;
    this.emitEvent(EVENTS.DESTROY, this.createEventData());
    this.eventEmitter.removeAllListeners();
  }

  public setScale(scale: number): void {
    const clampedScale = this.clampScale(scale);
    this.currentScale = clampedScale;
    this.applyScale();
    this.emitEvent(EVENTS.SCALE, this.createEventData());
  }

  public resetScale(): void {
    this.currentScale = this.options.baseScale || 1;
    this.applyScale();
    this.emitEvent(EVENTS.RESET, this.createEventData());
  }

  public updateOptions(options: Partial<ScaleOptions>): void {
    this.options = { ...this.options, ...options };
    this.deviceInfo = this.getDeviceInfo();
    this.applyScale();
    this.emitEvent(EVENTS.UPDATE, this.createEventData());
  }

  public getCurrentScale(): number {
    return this.currentScale;
  }

  public getDeviceInfo(): DeviceInfo {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = getDeviceType(width, this.options.breakpoints);
    const scale = this.calculateScale(width);
    
    return {
      type: deviceType,
      width,
      height,
      scale,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      isLargeMonitor: deviceType === 'large-monitor',
    };
  }

  public getElementScale(element: HTMLElement): number {
    const computedStyle = getComputedStyle(element);
    const transform = computedStyle.transform;
    if (transform && transform !== 'none') {
      const match = transform.match(/scale\(([^)]+)\)/);
      if (match) {
        return parseFloat(match[1]);
      }
    }
    return this.currentScale;
  }

  public setElementScale(element: HTMLElement, scale: number): void {
    const clampedScale = this.clampScale(scale);
    element.style.transform = `scale(${clampedScale})`;
    element.style.transformOrigin = TRANSFORM_ORIGIN;
  }

  public resetElementScale(element: HTMLElement): void {
    element.style.transform = '';
    element.style.transformOrigin = '';
  }

  public addEventListener(event: string, callback: (event: ScaleEvent) => void): void {
    this.eventEmitter.on(event, callback);
  }

  public removeEventListener(event: string, callback: (event: ScaleEvent) => void): void {
    this.eventEmitter.off(event, callback);
  }

  private injectStyles(): void {
    if (this.styleElement) return;
    
    this.styleElement = document.createElement('style');
    this.styleElement.id = `${CSS_PREFIX}-styles`;
    this.styleElement.textContent = this.generateCSS();
    document.head.appendChild(this.styleElement);
  }

  private removeInjectedStyles(): void {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }

  private generateCSS(): string {
    const prefix = CSS_PREFIX;
    const duration = this.options.smoothTransition ? this.options.transitionDuration : 0;
    
    return `
      [data-${prefix}] {
        transition: all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: ${TRANSFORM_ORIGIN};
      }
      
      .${prefix}-scaled {
        transition: all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .${prefix}-container {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      
      .${prefix}-no-scale {
        transform: none !important;
        transition: none !important;
      }
      
      .${prefix}-responsive {
        font-size: calc(1rem * var(--${prefix}-scale, 1));
      }
      
      ${this.options.customCSS || ''}
    `;
  }

  private applyScale(): void {
    const elements = this.getTargetElements();
    const scale = this.currentScale;
    
    elements.forEach(element => {
      if (this.shouldExcludeElement(element)) return;
      
      if (element === document.body || element === document.documentElement) {
        element.style.transform = `scale(${scale})`;
        element.style.transformOrigin = TRANSFORM_ORIGIN;
        element.style.width = `${100 / scale}%`;
        element.style.minHeight = '100vh';
      } else {
        element.setAttribute(`data-${CSS_PREFIX}`, '');
        element.style.transform = `scale(${scale})`;
        element.style.transformOrigin = TRANSFORM_ORIGIN;
      }
    });
    
    this.updateCSSVariables();
  }

  private resetAllElements(): void {
    const elements = this.getTargetElements();
    elements.forEach(element => {
      element.style.transform = '';
      element.style.transformOrigin = '';
      element.style.width = '';
      element.style.minHeight = '';
      element.removeAttribute(`data-${CSS_PREFIX}`);
    });
  }

  private getTargetElements(): HTMLElement[] {
    const selectors = this.options.includeSelectors || ['*'];
    const elements: HTMLElement[] = [];
    
    if (selectors.includes('*')) {
      elements.push(document.body);
      const allElements = document.body.querySelectorAll('*');
      elements.push(...Array.from(allElements) as HTMLElement[]);
    } else {
      selectors.forEach(selector => {
        const found = document.querySelectorAll(selector);
        elements.push(...Array.from(found) as HTMLElement[]);
      });
    }
    
    return [...new Set(elements)];
  }

  private shouldExcludeElement(element: HTMLElement): boolean {
    const excludeSelectors = this.options.excludeSelectors || [];
    return excludeSelectors.some(selector => 
      element.matches(selector) || element.closest(selector) !== null
    );
  }

  private calculateScale(width: number): number {
    const deviceType = getDeviceType(width, this.options.breakpoints);
    const factors = this.options.scaleFactors || DEFAULT_OPTIONS.scaleFactors;
    const factor = factors[deviceType as keyof typeof factors] || 1;
    const baseScale = this.options.baseScale || 1;
    const scale = factor * baseScale;
    return this.clampScale(scale);
  }

  private clampScale(scale: number): number {
    const min = this.options.minScale || 0.5;
    const max = this.options.maxScale || 1.5;
    return Math.max(min, Math.min(max, scale));
  }

  private updateCSSVariables(): void {
    const prefix = CSS_PREFIX;
    const root = document.documentElement;
    root.style.setProperty(`--${prefix}-scale`, String(this.currentScale));
    root.style.setProperty(`--${prefix}-device`, this.deviceInfo.type);
    root.setAttribute(`data-${prefix}-device`, this.deviceInfo.type);
  }

  private setupResizeListener(): void {
    const handleResize = debounce(() => {
      this.deviceInfo = this.getDeviceInfo();
      const newScale = this.calculateScale(window.innerWidth);
      if (newScale !== this.currentScale) {
        this.currentScale = newScale;
        this.applyScale();
        this.emitEvent(EVENTS.SCALE, this.createEventData());
      }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    this.cleanupFunctions.push(() => window.removeEventListener('resize', handleResize));
    
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(throttle(handleResize, 100));
      this.resizeObserver.observe(document.body);
      this.cleanupFunctions.push(() => this.resizeObserver?.disconnect());
    }
  }

  private setupMutationObserver(): void {
    if (!window.MutationObserver) return;
    
    const handleMutation = debounce(() => {
      this.applyScale();
    }, 100);
    
    this.mutationObserver = new MutationObserver(handleMutation);
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });
    
    this.cleanupFunctions.push(() => this.mutationObserver?.disconnect());
  }

  private setupDeviceChangeListener(): void {
    const handleOrientationChange = () => {
      setTimeout(() => {
        this.deviceInfo = this.getDeviceInfo();
        const newScale = this.calculateScale(window.innerWidth);
        if (newScale !== this.currentScale) {
          this.currentScale = newScale;
          this.applyScale();
          this.emitEvent(EVENTS.DEVICE_CHANGE, this.createEventData());
        }
      }, 300);
    };
    
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
      this.cleanupFunctions.push(() => 
        window.screen?.orientation?.removeEventListener('change', handleOrientationChange)
      );
    }
    
    window.addEventListener('orientationchange', handleOrientationChange);
    this.cleanupFunctions.push(() => 
      window.removeEventListener('orientationchange', handleOrientationChange)
    );
  }

  private removeEventListeners(): void {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  private createEventData(): ScaleEvent {
    return {
      device: this.deviceInfo.type,
      scale: this.currentScale,
      width: this.deviceInfo.width,
      height: this.deviceInfo.height,
      timestamp: Date.now(),
    };
  }

  private emitEvent(event: string, data: ScaleEvent): void {
    this.eventEmitter.emit(event, data);
    
    const customEvent = new CustomEvent(event, {
      detail: data,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(customEvent);
  }
}
