import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../assets/TRONIC_MALL.svg"
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { AiFillHome, AiOutlineUserAdd, AiOutlineLogin, AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai"
import { MdDashboard } from "react-icons/md"
import { BiUser } from 'react-icons/bi'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const { user, dispatch } = useAuth()
	const openNav = () => setOpen(!open)
	const closeNavbar = () => setOpen(false)
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
		<div className="md:flex justify-between">
			<header className="flex justify-between m-1">
				<img src={Logo} alt="app-logo" />
				<div onClick={openNav} className="text-3xl md:hidden">
					{open ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
				</div>
			</header>
			<main>
			     <nav className="flex gap-3">
			     {!user ? 
			     	<>
			     	<div className="flex">
			     	<AiFillHome />
			     		<NavLink to="/landing">Landing</NavLink>
			     	</div>
			     	<div className="flex">
			     	<AiOutlineUserAdd />
			     		<NavLink to="/signup">Signup</NavLink>
			     	</div>
			     	<div className="flex">
			     	<AiOutlineLogin />
			     		<NavLink to="/login">Login</NavLink>
			     	</div>
			     	</>
			     : <>
			          {user.role === "Buyer" &&
			          	<>
			          	<div className="flex">
			               <AiFillHome />
			          	<NavLink to="/">Home</NavLink>
			          </div>
			          <div className="flex">
			          <AiOutlineShoppingCart />
			          	<NavLink to="/cart">Cart</NavLink>
			          </div>
			          </>
			     }
			           {user.role === "Seller" &&
			           	<>
			           	<div className="flex">
			          <MdDashboard />
			          	<NavLink to="/dashboard">Dashboard</NavLink>
			          </div>
			          </>
			          }
			          {user.role === "Buyer" && (
                          <div className="flex">
                            <BiUser />
                            <NavLink to="/profile">{user.name}</NavLink>
                          </div>
                        )}
                        
                        {user.role === "Seller" && (
                          <div className="flex">
                            <BiUser />
                            <NavLink to="/profile">{user.name}</NavLink>
                          </div>
                        )}

			     	<div onClick={logoutEffect} className="cursor-pointer flex">
			     	     <AiOutlineLogout />
			     		<div>Logout</div>
			     	</div>
			     	</>
			     }
			     </nav>
			</main>
		</div>
		)
}