import './App.css'

// pages
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Book Detail Page */}
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  )
}

export default App
