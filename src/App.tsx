import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import MortgagePage from './pages/MortgagePage'
import StudentLoanPage from './pages/StudentLoanPage'
import GasPage from './pages/GasPage'
import './index.css'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mortgage" element={<MortgagePage />} />
            <Route path="/student-loan" element={<StudentLoanPage />} />
            <Route path="/gas" element={<GasPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

 