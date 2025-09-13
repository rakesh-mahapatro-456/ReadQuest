import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <ThemeProvider>
    <BrowserRouter>
     <App />
     <Toaster/>
     </BrowserRouter>
     </ThemeProvider>
   </Provider>
  </StrictMode>,
)
