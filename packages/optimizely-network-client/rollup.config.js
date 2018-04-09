import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'

export default [{
    input: 'lib/index.js',
    output: {
      file: 'dist/index.browser.cjs.js',
      format: 'cjs',
      name: 'OptimizelySDK.NetworkClient'
    },
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      json(),
      babel({
        presets: [
          ['env', {
            modules: false,
            targets: {
              browsers: ['last 2 versions', '>0.1%']
            }
          }],
          'stage-3'
        ],
        plugins: [
          'external-helpers'
        ],
        exclude: 'node_modules/**'
      }),
      commonjs()
    ]
  },
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.node.cjs.js',
      format: 'cjs',
      name: 'OptimizelySDK.NetworkClient'
    },
    external: [
      'buffer',
      'http',
      'https',
      'stream',
      'url',
      'util',
      'zlib'
    ],
    plugins: [
      resolve({
        main: true,
        preferBuiltins: false
      }),
      json(),
      babel({
        presets: [
          ['env', {
            modules: false,
            targets: {
              node: '6.0'
            }
          }],
          'stage-3'
        ],
        plugins: [
          'external-helpers'
        ],
        exclude: 'node_modules/**'
      }),
      commonjs()
    ]
  }
]