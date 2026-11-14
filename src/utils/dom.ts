export function getElement(selector: string | HTMLElement): HTMLElement | null {
  if (typeof selector === 'string') {
    return document.querySelector(selector) as HTMLElement;
  }
  return selector;
}

export function getElements(selector: string | NodeList | HTMLElement[]): HTMLElement[] {
  if (typeof selector === 'string') {
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  }
  if (selector instanceof NodeList) {
    return Array.from(selector) as HTMLElement[];
  }
  return selector;
}

export function getElementRect(element: HTMLElement): DOMRect {
  return element.getBoundingClientRect();
}

export function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    element.offsetParent !== null
  );
}

export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className);
}

export function setStyle(
  element: HTMLElement,
  styles: Record<string, string | number>
): void {
  Object.entries(styles).forEach(([property, value]) => {
    element.style[property as any] = String(value);
  });
}

export function getStyle(element: HTMLElement, property: string): string {
  return getComputedStyle(element)[property as any];
}

export function getParentElement(element: HTMLElement): HTMLElement | null {
  return element.parentElement;
}

export function getChildrenElements(element: HTMLElement): HTMLElement[] {
  return Array.from(element.children) as HTMLElement[];
}