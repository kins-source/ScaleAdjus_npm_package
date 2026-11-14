type EventCallback = (data: any) => void;

export class EventEmitter {
  private events: Map<string, EventCallback[]> = new Map();

  public on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(callback);
  }

  public off(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
    
    if (callbacks.length === 0) {
      this.events.delete(event);
    }
  }

  public emit(event: string, data: any): void {
    const callbacks = this.events.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  public removeAllListeners(): void {
    this.events.clear();
  }

  public listenerCount(event: string): number {
    return this.events.get(event)?.length || 0;
  }

  public eventNames(): string[] {
    return Array.from(this.events.keys());
  }
}