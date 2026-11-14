import ScaleAdjus from 'scaleadjus';
import 'scaleadjus/styles.css';

const scaleAdjus = new ScaleAdjus({
  baseScale: 1,
  minScale: 0.5,
  maxScale: 1.5,
  debug: true,
  smoothTransition: true,
  transitionDuration: 300,
});

scaleAdjus.init();
