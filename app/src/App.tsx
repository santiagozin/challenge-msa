import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import './App.css'
import Home from './pages/home'
import Historial from './pages/historial'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historial" element={<Historial />} />
       
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
