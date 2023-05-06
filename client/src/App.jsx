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
    <div className="text-black-400 font-mono text-2xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/landing" element={!user ? <Landing /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user && <Signup />} />
          <Route path="/login" element={!user && <Login />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/landing" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/landing" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/landing" />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/landing" />} />
          <Route path="/register-business" element={user ? <Business /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
