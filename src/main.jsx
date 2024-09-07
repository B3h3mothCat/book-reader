import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from "react-redux"
import store from "./store.js"

import { BrowserRouter } from 'react-router-dom'


const root = document.getElementById('root')

ReactDOM.createRoot(root).render(


  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
