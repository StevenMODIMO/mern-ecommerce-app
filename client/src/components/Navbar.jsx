import { useState } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../assets/TRONIC-CART.svg"
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
		<div>
			<div className="md:flex justify-between">
				<div className="flex justify-between m-1">
					<NavLink to="/" onClick={closeNavbar}>
						<img className="mt-2" src={Logo} alt="logo" />
					</NavLink>
					<motion.div onClick={openNav} className="md:hidden">
						{!open ? <IoIosArrowDropdown className="text-3xl mt-1" /> : <IoIosArrowDropup className="text-3xl mt-1" />}
					</motion.div>
				</div>
				<motion.nav className={!open ? "hidden md:flex gap-10 mr-5" : "flex flex-col items-center gap-3 mt-10"}>
				
					{!user ?
					<>
					<div className="flex flex-col items-center gap-2 md:flex-row gap-3">
						<AiFillHome />
					     <NavLink to="/landing" onClick={closeNavbar} className="mt-2">Home</NavLink>
					</div>
					<div className="flex flex-col items-center gap-2 md:flex-row">
						<AiOutlineUserAdd />
					     <NavLink to="/signup" onClick={closeNavbar} className="mt-2">Signup</NavLink>
					</div>
					<div className="flex flex-col items-center gap-2 md:flex-row">
						<AiOutlineLogin />
					     <NavLink to="/login" onClick={closeNavbar} className="mt-2">Login</NavLink>
					</div>
					</>
					:
					<>
					<div className="flex flex-col items-center gap-2 md:flex-row">
						<AiFillHome />
					     <NavLink to="/" onClick={closeNavbar} className="mt-2">Home</NavLink>
					</div>
					{user.role == "Seller" && <div className="flex flex-col items-center gap-2 md:flex-row">
											<MdDashboard />
					                        <NavLink to="/dashboard" onClick={closeNavbar} className="mt-2">Dashboard</NavLink>
										</div>}
                    <div className="flex flex-col items-center gap-2 md:flex-row">
                         <BiUser />
					<NavLink to="/profile" onClick={closeNavbar} className="mt-2">{user.name}</NavLink>
                    </div>
                    {user.role == "Buyer" && <div className="flex flex-col items-center m-3 md:flex-row">
                                             <NavLink to="/cart">
                                             <AiOutlineShoppingCart />
                                             </NavLink>                    
                                        </div>}
                    <div className="flex flex-col items-center gap-2 md:flex-row">
                         <AiOutlineLogout />
					<NavLink to="/profile" onClick={logoutEffect} className="mt-2">Logout</NavLink>
                    </div>
					</>
				}
				</motion.nav>
			</div>
		</div>
		)
}