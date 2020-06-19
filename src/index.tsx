import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import * as serviceWorker from './serviceWorker'

import App from './App'
import { QuizProvider } from './Context'

ReactDOM.render(
  <QuizProvider>
    <App />
  </QuizProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
