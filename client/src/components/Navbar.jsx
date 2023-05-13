import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/TRONIC_MALL.svg";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  AiFillHome,
  AiOutlineUserAdd,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { BiUser } from "react-icons/bi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useAuth();
  const openNav = () => setOpen(!open);
  const closeNavbar = () => setOpen(false);
  const closePanel = () => setOpen(false);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const logoutEffect = () => {
    logout();
    closePanel();
  };

  return (
    <div className="lg:flex">
      <header className="flex justify-between m-1">
        <img src={Logo} alt="app-logo" />
        <div onClick={openNav} className="lg:hidden">
          {open ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </div>
      </header>
      <main>
        <nav
          className={
            open
              ? "absolute left-0 bg-black w-full h-96 text-green-500 transition-all duration-700 ease-in-out rounded mt-2 flex flex-col gap-5 lg:relative"
              : "absolute -left-full bg-black w-full h-96 text-green-500 transition-all duration-700 ease-in-out rounded mt-2 flex flex-col gap-5"
          }
        >
          {!user ? (
            <div>
              <div className="flex gap-2 ml-24 mt-14 md:ml-80">
                <AiFillHome />
                <NavLink to="/landing" onClick={closeNavbar}>Landing</NavLink>
              </div>
              <div className="flex gap-2 ml-24 mt-14 md:ml-80">
                <AiOutlineUserAdd />
                <NavLink to="/signup" onClick={closeNavbar}>Signup</NavLink>
              </div>
              <div className="flex gap-2 ml-24 mt-14 md:ml-80">
                <AiOutlineLogin />
                <NavLink to="/login" onClick={closeNavbar}>Login</NavLink>
              </div>
            </div>
          ) : (
            <>
              {user.role === "Buyer" && (
                <>
                  <div className="flex gap-2 ml-24 mt-14 md:ml-80">
                    <AiFillHome />
                    <NavLink to="/" onClick={closeNavbar}>Home</NavLink>
                  </div>
                  <div className="flex gap-2 ml-24 mt-5 md:ml-80">
                    <AiOutlineShoppingCart />
                    <NavLink to="/cart" onClick={closeNavbar}>Cart</NavLink>
                  </div>
                </>
              )}
              {user.role === "Seller" && (
                <>
                  <div className="flex gap-2 ml-24 mt-14 md:ml-80">
                    <MdDashboard className="mt-1" />
                    <NavLink to="/dashboard" onClick={closeNavbar}>Dashboard</NavLink>
                  </div>
                </>
              )}
              {user.role === "Buyer" && (
                <div className="flex gap-2 ml-24 mt-5 md:ml-80">
                  <BiUser className="mt-1" />
                  <NavLink to="/profile" onClick={closeNavbar}>{user.name}</NavLink>
                </div>
              )}

              {user.role === "Seller" && (
                <div className="flex gap-2 ml-24 mt-14 md:ml-80">
                  <BiUser className="mt-1" />
                  <NavLink to="/profile" onClick={closeNavbar}>{user.name}</NavLink>
                </div>
              )}

              <div onClick={logoutEffect} className={user.role == "Buyer" ? "flex gap-2 ml-24 mt-5 md:ml-80" : "flex gap-2 ml-24 mt-10 md:ml-80"}>
                <AiOutlineLogout className="mt-1" />
                <div>Logout</div>
              </div>
            </>
          )}
        </nav>
      </main>
    </div>
  );
}
