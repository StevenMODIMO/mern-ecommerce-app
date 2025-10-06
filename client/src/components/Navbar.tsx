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
import { FaTimes, FaBars, FaTruckMoving } from "react-icons/fa";
import {
  BsFillBagFill,
  BsFillBagCheckFill,
  BsFillBagDashFill,
  BsFillBagHeartFill,
} from "react-icons/bs";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { FiPhoneCall } from "react-icons/fi";

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
    <div className="lg:flex flex-col">
      <section className="flex gap-2 justify-center text-lg bg-green-900/10">
        <div className="flex gap-1">
          <FaTruckMoving className="mt-1 text-yellow-500" />
          <h1>Free Shipping to</h1>
        </div>
        <div className="flex gap-1 text-sm">
          <div className={getCountryFlagClass(country)}></div>
          <div className="text-xs">{country}</div>
        </div>
        <div className="hidden lg:flex gap-2 ml-48">
          <FiPhoneCall className="mt-1 text-yellow-500" />
          <p>Contact Us 900-567-435</p>
        </div>
      </section>
      <section className="lg:flex justify-between w-full">
        <header className="flex justify-between mt-4 lg:m-5">
          <section className="flex gap-1">
            <div className="text-lg ml-2">
              mern<span className="text-xl">Ecommerce</span>
            </div>
            <BsFillBagFill className="text-sm text-yellow-600 mt-2" />
          </section>
          <div onClick={openNav} className="text-3xl mr-2 mt-2 lg:hidden">
            <FaBars className="text-yellow-500" />
          </div>
        </header>
        <hr className="lg:hidden" />
        <main
          onClick={closePanel}
          className={
            open
              ? "z-10 absolute left-0 top-0 bg-black  w-full h-screen text-yellow-500 transition-all duration-700 ease-in-out"
              : "z-10 absolute -left-full top-0 bg-black  w-full h-full text-yellow-500 transition-all duration-700 ease-in-out lg:relative lg:left-0 lg:h-0 lg:w-0 lg:mt-1 lg:gap-5 lg:mr-96"
          }
        >
          <section className="flex gap-2 text-yellow-600 bg-yellow-900/10 justify-center text-lg lg:hidden">
            <div className="flex gap-1">
              <FaTruckMoving className="mt-1" />
              <h1>Free Shipping to</h1>
            </div>
            <div className="flex gap-1 text-sm">
              <div className={getCountryFlagClass(country)}></div>
              <div className="text-xs">{country}</div>
            </div>
          </section>
          <header className="flex justify-between text-white mt-4 lg:hidden">
            <section className="flex gap-1">
              <div className="text-lg ml-2">
                mern<span className="text-xl">Ecommerce</span>
              </div>
              <BsFillBagFill className="text-sm text-yellow-600 mt-2" />
            </section>
            <div onClick={closePanel} className="text-3xl mr-2 mt-1 lg:hidden">
              <FaTimes className="text-yellow-600" />
            </div>
          </header>
          <hr className="lg:hidden" />
          <nav className="bg-black text-white top-0 h-5/6 flex flex-col justify-between lg:items-start lg:h-0 lg:w-0 lg:text-black">
            <section className="text-lg">
              {!user ? (
                <div className="lg:flex">
                  <NavLink
                    to="/landing"
                    className={({ isActive }) =>
                      isActive
                        ? "flex gap-2 mt-4 bg-yellow-500 rounded-r-xl rounded-l-xl ml-4  w-fit px-2 py-1"
                        : "flex gap-2 mt-4 bg-none ml-4 bg-opacity-50 w-fit px-2 py-1 lg:text-black"
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
                        ? "flex gap-2 mt-4 bg-yellow-500 rounded-r-xl rounded-l-xl ml-4  w-fit px-2 py-1"
                        : "flex gap-2 mt-4 bg-none ml-4 bg-opacity-50 w-fit px-2 py-1 lg:text-black"
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
                        ? "flex gap-2 mt-4 bg-yellow-500 rounded-r-xl rounded-l-xl ml-4  w-fit px-2 py-1"
                        : "flex gap-2 mt-4 bg-none ml-4 bg-opacity-50 w-fit px-2 py-1 lg:text-black"
                    }
                    onClick={closeNavbar}
                  >
                    <AiOutlineLogin className="mt-1" />
                    Login
                  </NavLink>
                </div>
              ) : (
                <div className="lg:flex">
                  {user.role === "Buyer" && (
                    <>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "flex gap-2 mt-4 bg-yellow-500 rounded-r-xl rounded-l-xl ml-4  w-fit px-2 py-1"
                            : "flex gap-2 mt-4 bg-none ml-4 bg-opacity-50 w-fit px-2 py-1 lg:text-black"
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
                            ? "flex gap-2 mt-4 bg-yellow-500 rounded-r-xl rounded-l-xl ml-4  w-fit px-2 py-1"
                            : "flex gap-2 mt-4 bg-none ml-4 bg-opacity-50 w-fit px-2 py-1 lg:text-black"
                        }
                        onClick={closeNavbar}
                      >
                        <AiOutlineShoppingCart className="mt-1" />
                        Dashboard
                      </NavLink>
                      <div
                        onClick={logoutEffect}
                        className={
                          user.role == "Buyer"
                            ? "flex gap-2 ml-4 mt-4 cursor-pointer lg:text-black lg:mt-5"
                            : "flex gap-2 ml-4 mt-4 cursor-pointer lg:text-black"
                        }
                      >
                        <AiOutlineLogout className="mt-1" />
                        <div>Logout</div>
                      </div>
                    </>
                  )}
                  {user.role === "Seller" && (
                    <>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          isActive
                            ? "flex gap-2 mt-4 bg-yellow-500 rounded-r-xl rounded-l-xl ml-4 w-fit px-2 py-1"
                            : "flex gap-2 mt-4 bg-none ml-4 bg-opacity-50 w-fit px-2 py-1 lg:text-black"
                        }
                        onClick={closeNavbar}
                      >
                        <MdDashboard className="mt-1" />
                        Dashboard
                      </NavLink>
                      <div
                        onClick={logoutEffect}
                        className={
                          user.role == "Buyer"
                            ? "flex gap-2 ml-4 mt-4 cursor-pointer lg:text-black lg:mt-5"
                            : "flex gap-2 ml-4 mt-4 cursor-pointer lg:text-black lg:mt-5"
                        }
                      >
                        <AiOutlineLogout className="mt-1" />
                        <div>Logout</div>
                      </div>
                    </>
                  )}

                  {user.role == "None" && <div
                    onClick={logoutEffect}
                    className=
                      "flex gap-2 ml-4 mt-4 cursor-pointer lg:text-black lg:mt-5"
                    
                  >
                    <AiOutlineLogout className="mt-1" />
                    <div>Logout</div>
                  </div>}
                </div>
              )}
            </section>
            <footer className="text-sm text-yellow-500 text-center lg:hidden">
              <div className="flex justify-center">
                <span className="text-2xl mr-2">&copy;</span>
                <span className="mt-2 mr-1">2023 mernEcommerce</span>
                <BsFillBagFill className="mt-2" />
              </div>
              <p> All rights reserved.</p>
            </footer>
          </nav>
        </main>
      </section>
      <div>
        <hr />
      </div>
    </div>
  );
}
