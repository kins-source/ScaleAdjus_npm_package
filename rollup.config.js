const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser').default;

const external = ['react', 'vue', '@angular/core', 'rxjs'];
const plugins = [
  resolve({ browser: true }),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
];

module.exports = [
  {
    input: 'src/index.ts',
    external,
    output: [
      { file: 'dist/index.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/index.mjs', format: 'esm', sourcemap: true },
      { file: 'dist/index.umd.js', format: 'umd', name: 'ScaleAdjus', sourcemap: true, exports: 'named' },
    ],
    plugins,
  },
  {
    input: 'src/index.ts',
    external,
    output: { file: 'dist/index.min.js', format: 'umd', name: 'ScaleAdjus', sourcemap: true, exports: 'named' },
    plugins: [...plugins, terser()],
  },
  {
    input: 'src/adapters/react.ts',
    external,
    output: [
      { file: 'dist/react.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/react.mjs', format: 'esm', sourcemap: true },
    ],
    plugins,
  },
  {
    input: 'src/adapters/vue.ts',
    external,
    output: [
      { file: 'dist/vue.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/vue.mjs', format: 'esm', sourcemap: true },
    ],
    plugins,
  },
  {
    input: 'src/adapters/angular.ts',
    external,
    output: [
      { file: 'dist/angular.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/angular.mjs', format: 'esm', sourcemap: true },
    ],
    plugins,
  },
];
