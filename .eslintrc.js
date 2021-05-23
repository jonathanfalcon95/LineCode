require('events').EventEmitter.defaultMaxListeners = 50

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: 'vuetify',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/valid-v-slot': 'off',
    'camelcase': 'off',
    'vue/custom-event-name-casing': 'off',
    semi: 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
