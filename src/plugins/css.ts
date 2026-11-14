import { Plugin, CSSOptions } from '../core/types';
import { CSS_PREFIX } from '../core/constants';

export const cssPlugin: Plugin = {
  name: 'css',
  version: '1.0.0',
  apply(options: CSSOptions = {}): void {
    const prefix = options.prefix || CSS_PREFIX;
    const customProperties = options.customProperties || {};
    
    const css = `
      :root {
        --${prefix}-scale: 1;
        --${prefix}-device: desktop;
        ${Object.entries(customProperties).map(([key, value]) => 
          `--${prefix}-${key}: ${value};`
        ).join('\n')}
      }
      
      [data-${prefix}] {
        transform: scale(var(--${prefix}-scale));
        transform-origin: top left;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .${prefix}-container {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
        margin: 0 auto;
      }
      
      .${prefix}-flex {
        display: flex;
        flex-wrap: wrap;
      }
      
      .${prefix}-grid {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
      
      .${prefix}-fluid-text {
        font-size: calc(1rem * var(--${prefix}-scale));
        line-height: 1.6;
      }
      
      .${prefix}-fluid-heading {
        font-size: calc(2rem * var(--${prefix}-scale));
        line-height: 1.2;
      }
      
      .${prefix}-responsive-image {
        max-width: 100%;
        height: auto;
        display: block;
      }
      
      .${prefix}-video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
      }
      
      .${prefix}-video-container iframe,
      .${prefix}-video-container video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      @media (max-width: 768px) {
        .${prefix}-hidden-mobile {
          display: none !important;
        }
        .${prefix}-visible-mobile {
          display: block !important;
        }
      }
      
      @media (min-width: 769px) and (max-width: 1024px) {
        .${prefix}-grid {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      }
      
      @media (min-width: 1025px) and (max-width: 1600px) {
        .${prefix}-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      }
      
      @media (min-width: 1601px) {
        .${prefix}-grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
      }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = `${prefix}-plugin-styles`;
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  },
};