/**
 * Changes to support the flat config format:
 * - The `extends` key has been deprecated.
 * - The `parserOptions` key has been moved under the new `languageOptions` key.
 * - The `env` key has been deprecated and moved to `languageOptions.globals`.
 * - The `plugins` key is no longer a list but an object.
 */

const {
  extends: airbnbRules,
  ...airbnbConfig
} = require('.');
const importPlugin = require('eslint-plugin-import/flat');
const globals = require('globals');

const envMapping = {
  builtin: 'builtin',
  es5: 'es5',
  es6: 'es2015',
  es2016: 'es2015',
  es2017: 'es2017',
  es2018: 'es2017',
  es2019: 'es2017',
  es2020: 'es2020',
  es2021: 'es2021',
  es2022: 'es2021',
  es2023: 'es2021',
  es2024: 'es2021',
  browser: 'browser',
  worker: 'worker',
  node: 'node',
  nodeBuiltin: 'nodeBuiltin',
  commonjs: 'commonjs',
  amd: 'amd',
  mocha: 'mocha',
  jasmine: 'jasmine',
  jest: 'jest',
  qunit: 'qunit',
  phantomjs: 'phantomjs',
  couch: 'couch',
  rhino: 'rhino',
  nashorn: 'nashorn',
  wsh: 'wsh',
  jquery: 'jquery',
  yui: 'yui',
  shelljs: 'shelljs',
  prototypejs: 'prototypejs',
  meteor: 'meteor',
  mongo: 'mongo',
  applescript: 'applescript',
  serviceworker: 'serviceworker',
  atomtest: 'atomtest',
  embertest: 'embertest',
  protractor: 'protractor',
  'shared-node-browser': 'shared-node-browser',
  webextensions: 'webextensions',
  greasemonkey: 'greasemonkey',
  devtools: 'devtools'
};

function convertIntoEslintFlatConfig(config) {
  const newConfig = { ...config, languageOptions: {} };

  // Handle the `env` key
  if ('env' in newConfig) {
    newConfig.languageOptions.globals = Object.fromEntries(
      Object.keys(newConfig.env)
        .filter(
          (key) => newConfig.env[key] === true &&
            key in envMapping &&
            envMapping[key] in globals
        )
        .flatMap((key) => Object.entries(globals[envMapping[key]]))
    );
    delete newConfig.env;
  }

  // Handle the `parserOptions` key
  if ('parserOptions' in newConfig) {
    newConfig.languageOptions.parserOptions = newConfig.parserOptions;
    delete newConfig.parserOptions;
  }

  // Remove the `plugins` key as it will be spread directly during export
  if ('plugins' in newConfig) {
    delete newConfig.plugins;
  }

  return newConfig;
}

module.exports = [
  ...airbnbRules.map((rule) => convertIntoEslintFlatConfig(require(rule))),
  convertIntoEslintFlatConfig(airbnbConfig),
  ...importPlugin,
];