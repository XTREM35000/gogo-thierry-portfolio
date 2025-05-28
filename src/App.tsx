
import { Routes, Route } from 'react-router-dom'
import Layout from '../app/layout'
import HomePage from '../app/page'
import '../app/globals.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
    </Routes>
  )
}

export default App
