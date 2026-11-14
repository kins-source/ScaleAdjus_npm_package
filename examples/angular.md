# Angular Example

```ts
import { Component, OnInit } from '@angular/core';
import { createAngularService } from 'scaleadjus/angular';
import type { DeviceInfo, ScaleEvent } from 'scaleadjus';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>Current Scale: {{ scale }}</p>
      <p>Device: {{ deviceInfo?.type }}</p>
      <p>Width: {{ deviceInfo?.width }}px</p>
      <button (click)="setScale(1.2)">Set Scale 1.2</button>
      <button (click)="setScale(0.8)">Set Scale 0.8</button>
      <button (click)="resetScale()">Reset to Default</button>
    </div>
  `,
})
export class AppComponent implements OnInit {
  scale = 1;
  deviceInfo: DeviceInfo | null = null;

  constructor(private scaleAdjus: createAngularService) {}

  ngOnInit(): void {
    this.scaleAdjus.scale$.subscribe((data: ScaleEvent) => {
      this.scale = data.scale;
      this.deviceInfo = this.scaleAdjus.getDeviceInfo();
    });
  }

  setScale(scale: number): void {
    this.scaleAdjus.setScale(scale);
  }

  resetScale(): void {
    this.scaleAdjus.resetScale();
  }
}
```
