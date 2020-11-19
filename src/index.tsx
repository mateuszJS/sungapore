import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './ui/theme'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from '~/redux'
import { QueryParamProvider } from 'use-query-params'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './i18n'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <CssBaseline />
            <App />
          </QueryParamProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
