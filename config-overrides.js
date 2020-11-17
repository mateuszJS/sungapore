/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

// FIX: https://github.com/facebook/create-react-app/issues/9868#issuecomment-715572947
// TODO: update react-scripts when will be relased
const setAutoFreeze = require('react-dev-utils/immer').setAutoFreeze
setAutoFreeze(false)

module.exports = override(
  addWebpackAlias({
    ['~']: path.resolve(__dirname, 'src'),
    ['assets']: path.resolve(__dirname, 'assets'),
    ['redux-store']: path.resolve(__dirname, 'src/redux'),
    ['hooks']: path.resolve(__dirname, 'src/hooks'),
  }),
)
