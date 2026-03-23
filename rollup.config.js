import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  { input: 'src/artime.js', output: { file: pkg.module,  format: 'es'  } },
  { input: 'src/artime.js', output: { file: pkg.main,    format: 'cjs', exports: 'named' } },
  { input: 'src/artime.js', output: { file: pkg.browser, format: 'umd', name: 'ArTime', exports: 'named' } }
];