import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import Edit from "./pages/Edit"
import UserDashboard from "./pages/UserDashboard"
import Landing from "./pages/Landing"
import Business from "./pages/Business"
import Order from "./pages/Order"
import WishList from "./pages/WishList"
import WishToCart from "./pages/WishToCart"
import Payment from "./pages/Payment"

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
          <Route path="/edit/:id" element={user ? <Edit /> : <Navigate to="/landing" /> } />
          <Route path="/cart" element={user ? <UserDashboard /> : <Navigate to="/landing" />} />
          <Route path="/order/:id" element={user ? <Order /> : <Navigate to="/landing" />} />
          <Route path="/wishlist/:id" element={user ? <WishList /> : <Navigate to="/landing" />} />
          <Route path="/cart/:id" element={user ? <WishToCart /> : <Navigate to="/landing" />} />
          <Route path="/payment/:id" element={user ? <Payment /> : <Navigate to="/landing" />} />
          <Route path="/register-business" element={user ? <Business /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
