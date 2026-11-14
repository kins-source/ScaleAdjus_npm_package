declare module 'react' {
  export interface MutableRefObject<T> {
    current: T;
  }

  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useRef<T>(initialValue: T): MutableRefObject<T>;
  export function useState<T>(initialValue: T): [T, (value: T) => void];
  export function useCallback<T extends (...args: never[]) => unknown>(callback: T, deps?: unknown[]): T;
}

declare module 'vue' {
  export interface Ref<T> {
    value: T;
  }

  export function ref<T>(value: T): Ref<T>;
  export function onMounted(callback: () => void): void;
  export function onUnmounted(callback: () => void): void;
}

declare module '@angular/core' {
  export interface OnDestroy {
    ngOnDestroy(): void;
  }

  export function Injectable(options?: { providedIn?: string }): ClassDecorator;
}

declare module 'rxjs' {
  export class Observable<T> {
    readonly value?: T;
  }

  export class Subject<T> extends Observable<T> {
    asObservable(): Observable<T>;
    next(value: T): void;
    complete(): void;
  }
}
