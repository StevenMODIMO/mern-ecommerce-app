import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"

function App() {
  const { user } = useAuth()
  return (
    <div className="text-blue-400 font-mono text-2xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={user && <Profile />} />
          <Route path="/dashboard" element={user && <Dashboard />} />
          <Route path="/signup" element={!user && <Signup />} />
          <Route path="/login" element={!user && <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
