import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import Landing from "./pages/Landing"
import Business from "./pages/Business"

function App() {
  const { user } = useAuth()
  return (
    <div className="text-blue-400 font-mono text-2xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user && <Home />} />
          <Route path="/profile" element={user && <Profile />} />
          <Route path="/dashboard" element={user && <Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register-business" element={user && <Business />} />
          <Route path="/landing" element={!user && <Landing />} />
          <Route path="/signup" element={!user && <Signup />} />
          <Route path="/login" element={!user && <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
