import { Injectable, OnDestroy } from '@angular/core';
import { ScaleAdjus } from '../core/ScaleAdjus';
import { ScaleOptions, DeviceInfo, ScaleEvent } from '../core/types';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class createAngularService implements OnDestroy {
  private instance: ScaleAdjus | null = null;
  private scaleSubject = new Subject<ScaleEvent>();
  private deviceSubject = new Subject<DeviceInfo>();
  
  public scale$: Observable<ScaleEvent> = this.scaleSubject.asObservable();
  public device$: Observable<DeviceInfo> = this.deviceSubject.asObservable();
  
  constructor() {
    this.instance = new ScaleAdjus({
      autoInit: true,
    });
    
    this.instance.addEventListener('scaleadjus:scale', (data) => {
      this.scaleSubject.next(data);
      const deviceInfo = this.instance?.getDeviceInfo();
      if (deviceInfo) {
        this.deviceSubject.next(deviceInfo);
      }
    });
  }
  
  public getScale(): number {
    return this.instance?.getCurrentScale() || 1;
  }
  
  public getDeviceInfo(): DeviceInfo | null {
    return this.instance?.getDeviceInfo() || null;
  }
  
  public setScale(scale: number): void {
    this.instance?.setScale(scale);
  }
  
  public resetScale(): void {
    this.instance?.resetScale();
  }
  
  public updateOptions(options: Partial<ScaleOptions>): void {
    this.instance?.updateOptions(options);
  }
  
  public destroy(): void {
    this.instance?.destroy();
    this.instance = null;
    this.scaleSubject.complete();
    this.deviceSubject.complete();
  }

  public ngOnDestroy(): void {
    this.destroy();
  }
}
