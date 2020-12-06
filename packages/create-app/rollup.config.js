
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/main.js',
  output: {
    file: 'lib/main.js',
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    terser()
  ]
};