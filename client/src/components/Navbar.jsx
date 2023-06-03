import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import { FaTimes, FaBars, FaTruckMoving } from "react-icons/fa";
import { BsFillBagFill } from "react-icons/bs";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useAuth();
  const openNav = () => setOpen(!open);
  const closeNavbar = () => setOpen(false);
  const closePanel = () => setOpen(false);
  const [country, setCountry] = useState("");
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const logoutEffect = () => {
    logout();
    closePanel();
  };

  useEffect(() => {
    const getCountry = async () => {
      const response = await fetch(
        "https://ipinfo.io/json?token=b068a85af3c0f9"
      );
      const json = await response.json();
      if (response.ok) {
        setCountry(json.country);
      }
    };
    getCountry();
  }, []);

  const getCountryFlagClass = (countryCode) => {
    return `fi fi-${countryCode.toLowerCase()}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full z-20">
      <section className="flex gap-2 justify-center text-lg bg-green-900/10">
        <div className="flex gap-1">
          <FaTruckMoving className="mt-1" />
          <h1>Free Shipping to</h1>
        </div>
        <div className="flex gap-1 text-sm">
          <div className={getCountryFlagClass(country)}></div>
          <div className="text-xs">{country}</div>
        </div>
      </section>
      <header className="flex justify-between mt-4 lg:m-5">
        <section className="flex gap-1">
          <div className="text-lg ml-2">
            mern<span className="text-xl">Ecommerce</span>
          </div>
          <BsFillBagFill className="text-sm mt-2" />
        </section>
        <div onClick={openNav} className="text-sm mr-2 mt-2 lg:hidden">
          <FaBars />
        </div>
      </header>
      <hr />
      <main
        onClick={closePanel}
        className={
          open
            ? "z-10 absolute left-0 top-0 bg-black bg-opacity-90 w-full h-screen text-green-500 transition-all duration-700 ease-in-out"
            : "z-10 absolute -left-full top-0 bg-black bg-opacity-90 w-full h-full text-green-500 transition-all duration-700 ease-in-out lg:relative lg:left-0 lg:h-0 lg:flex-row lg:gap-5 lg:mr-10 lg:mt-5"
        }
      >
        <section className="flex gap-2 justify-center text-lg">
          <div className="flex gap-1">
            <FaTruckMoving className="mt-1" />
            <h1>Free Shipping to</h1>
          </div>
          <div className="flex gap-1 text-sm">
            <div className={getCountryFlagClass(country)}></div>
            <div className="text-xs">{country}</div>
          </div>
        </section>
        <header className="flex justify-between mt-4 lg:m-5">
          <section className="flex gap-1">
            <div className="text-lg ml-2">
              mern<span className="text-xl">Ecommerce</span>
            </div>
            <BsFillBagFill className="text-sm mt-2" />
          </section>
          <div onClick={closePanel} className="text-lg mr-2 mt-1 lg:hidden">
            <FaTimes />
          </div>
        </header>
        <hr />
        <nav className="bg-black bg-opacity-50 top-0 w-3/4 h-5/6 flex flex-col justify-between">
          <section className="text-lg">
            {!user ? (
              <div>
                <NavLink
                  to="/landing"
                  className={({ isActive }) =>
                    isActive
                      ? "flex gap-2 mt-4 bg-green-900/100 rounded-r-xl rounded-l-xl ml-2 bg-opacity-50 w-fit px-2 py-1"
                      : "flex gap-2 mt-4 bg-none ml-2 bg-opacity-50 w-fit px-2 py-1"
                  }
                  onClick={closeNavbar}
                >
                  <AiFillHome className="mt-1" />
                  Home
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "flex gap-2 mt-4 bg-green-900/100 rounded-r-xl rounded-l-xl ml-2 bg-opacity-50 w-fit px-2 py-1"
                      : "flex gap-2 mt-4 bg-none ml-2 bg-opacity-50 w-fit px-2 py-1"
                  }
                  onClick={closeNavbar}
                >
                  <AiOutlineUserAdd className="mt-1" />
                  Signup
                </NavLink>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "flex gap-2 mt-4 bg-green-900/100 rounded-r-xl rounded-l-xl ml-2 bg-opacity-50 w-fit px-2 py-1"
                      : "flex gap-2 mt-4 bg-none ml-2 bg-opacity-50 w-fit px-2 py-1"
                  }
                  onClick={closeNavbar}
                >
                  <AiOutlineLogin className="mt-1" />
                  Login
                </NavLink>
              </div>
            ) : (
              <>
                {user.role === "Buyer" && (
                  <>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "flex gap-2 mt-4 bg-green-900/100 rounded-r-xl rounded-l-xl ml-2 bg-opacity-50 w-fit px-2 py-1"
                          : "flex gap-2 mt-4 bg-none ml-2 bg-opacity-50 w-fit px-2 py-1"
                      }
                      onClick={closeNavbar}
                    >
                      <AiFillHome className="mt-1" />
                      Home
                    </NavLink>

                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive
                          ? "flex gap-2 mt-4 bg-green-900/100 rounded-r-xl rounded-l-xl ml-2 bg-opacity-50 w-fit px-2 py-1"
                          : "flex gap-2 mt-4 bg-none ml-2 bg-opacity-50 w-fit px-2 py-1"
                      }
                      onClick={closeNavbar}
                    >
                      <AiOutlineShoppingCart className="mt-1" />
                      Dashboard
                    </NavLink>
                  </>
                )}
                {user.role === "Seller" && (
                  <>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "flex gap-2 mt-4 bg-green-900/100 rounded-r-xl rounded-l-xl ml-2 bg-opacity-50 w-fit px-2 py-1"
                          : "flex gap-2 mt-4 bg-none ml-2 bg-opacity-50 w-fit px-2 py-1"
                      }
                      onClick={closeNavbar}
                    >
                      <MdDashboard className="mt-1" />
                      Dashboard
                    </NavLink>
                  </>
                )}

                <div
                  onClick={logoutEffect}
                  className={
                    user.role == "Buyer"
                      ? "flex gap-2 ml-2 mt-4 md:ml-80 lg:ml-0 lg:mt-0 cursor-pointer"
                      : "flex gap-2 ml-2 mt-4 md:ml-80 lg:ml-0 lg:mt-0 cursor-pointer"
                  }
                >
                  <AiOutlineLogout className="mt-1" />
                  <div>Logout</div>
                </div>
              </>
            )}
          </section>
          <footer className="text-sm text-center">
            <div className="flex justify-center">
              <span className="text-2xl mr-2">&copy;</span>
              <span className="mt-2 mr-1">2023 mernEcommerce</span>
              <BsFillBagFill className="mt-2" />
            </div>
            <p> All rights reserved.</p>
          </footer>
        </nav>
      </main>
    </div>
  );
}
