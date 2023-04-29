import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  const { user } = useAuth()
  return (
    <div className="text-blue-400 font-mono text-2xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
