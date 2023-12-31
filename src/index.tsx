import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

// importation des styles
import './styles/index.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import 'reactjs-popup/dist/index.css'

// autres importations
import store from './redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer theme='dark' style={{ width: 500 }} toastStyle={{ textAlign: 'justify' }} />
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
