import path from 'path'

import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import styles from 'rollup-plugin-styles'

import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

import eslint from '@rollup/plugin-eslint'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${pkg.jsdelivr}`,
        format: 'umd',
        name: 'MiniSandbox',
        sourcemap: true,
      },
    ],
    plugins: [
      eslint({
        include: ['src/**/*.js', 'src/**/*.ts'],
      }),
      styles(),
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.js', '.ts'],
      }),
      json(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      livereload(),
      serve({
        open: false,
        openPage: '/docs/demo.html',
        contentBase: './',
      }),
    ],
  },
  {
    input: 'src/docsify-plugin.js',
    output: [
      {
        file: 'dist/docsify-plugin.js',
        format: 'umd',
        name: 'MiniSandboxDocsify',
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
]
