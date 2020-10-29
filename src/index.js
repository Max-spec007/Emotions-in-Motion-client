import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <div className='body'>
      <App />
    </div>
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
