import { Plugin } from '../core/types';

export const tailwindPlugin: Plugin = {
  name: 'tailwind',
  version: '1.0.0',
  apply(config: any): void {
    config.theme = {
      ...config.theme,
      extend: {
        ...config.theme?.extend,
        screens: {
          ...config.theme?.extend?.screens,
          'sa-mobile': '768px',
          'sa-tablet': '1024px',
          'sa-desktop': '1200px',
          'sa-large': '1600px',
        },
        spacing: {
          ...config.theme?.extend?.spacing,
          'sa': 'var(--sa-scale)',
        },
        fontSize: {
          ...config.theme?.extend?.fontSize,
          'sa-fluid': 'calc(1rem * var(--sa-scale))',
        },
      },
    };
    
    config.plugins = [
      ...(config.plugins || []),
      function({ addUtilities, addComponents }: any) {
        addUtilities({
          '.sa-scale': {
            '--sa-scale': '1',
            transform: 'scale(var(--sa-scale))',
            transformOrigin: 'top left',
          },
          '.sa-no-scale': {
            transform: 'none !important',
            transition: 'none !important',
          },
          '.sa-responsive': {
            'font-size': 'calc(1rem * var(--sa-scale))',
          },
        });
        
        addComponents({
          '.sa-container': {
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            padding: '0 15px',
            margin: '0 auto',
          },
          '.sa-grid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          },
        });
      },
    ];
  },
};
