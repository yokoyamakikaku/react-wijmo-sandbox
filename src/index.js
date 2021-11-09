import React from 'react'
import ReactDOM from 'react-dom'
import { setLicenseKey } from '@grapecity/wijmo'
import 'dotenv'
import '@grapecity/wijmo.styles/wijmo.css'

import App from './components/App'

setLicenseKey(process.env.WIJIMO_LICENSE)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
