import { useState } from "react"
import { NavLink } from 'react-router-dom'
import Logo from "../assets/TRONIC-CART.svg"
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const { user } = useAuth()
	const openNav = () => setOpen(!open)
	const closeNavbar = () => setOpen(false)
	return (
		<div>
			<div className="">
				<div className="flex justify-between m-1">
					<NavLink to="/">
						<img className="mt-2" src={Logo} alt="logo" />
					</NavLink>
					<motion.div onClick={openNav}>
						{!open ? <IoIosArrowDropdown className="text-3xl mt-1" /> : <IoIosArrowDropup className="text-3xl mt-1" />}
					</motion.div>
				</div>
				<nav className={!open ? "-ml-40 transition-all duration-250 flex flex-col" : "m-0 transition-all duration-250 flex flex-col"}>
					<NavLink to="/signup" onClick={closeNavbar}>Signup</NavLink>
					<NavLink to="/login" onClick={closeNavbar}>Login</NavLink>
				</nav>
			</div>
		</div>
		)
}