const uglify = require('rollup-plugin-uglify')
const { minify } = require('uglify-es')
const gzip = require('rollup-plugin-gzip')
const buble = require('rollup-plugin-buble')
const resolve = require('rollup-plugin-node-resolve')

const camelCase = require('camelcase')
const pkg = require('./package.json')

const name =
  pkg.name === '@elmaz/elmaz'
    ? 'elmaz'
    : pkg.name.replace('@', '').replace('/', '-')

let config = {}

if (process.env.BROWSER) {
  config = {
    input: 'index.js',
    name: camelCase(name),
    sourcemap: true,
    plugins: [
      resolve(),
      buble({
        target: {
          ie: '10',
          edge: '12',
          safari: '9', // latest available in buble
          chrome: '52', // latest available in buble
          firefox: '48', // latest available in buble
        },
      }),
      uglify({ compress: { warnings: false } }, minify),
      gzip(),
    ],
    output: [{ file: `dest/${name}.umd.js`, format: 'umd' }],
  }
} else {
  config = {
    input: 'index.js',
    external: Object.keys(pkg.dependencies || {}),
    output: [
      {
        file: 'dest/index.js',
        format: 'cjs',
        interop: false,
      },
      {
        file: 'dest/index.es.js',
        format: 'es',
      },
    ],
  }
}

module.exports = config
