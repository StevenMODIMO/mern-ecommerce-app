import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Navigate } from "react-router-dom"
import { TbBusinessplan} from "react-icons/tb"
import { BiPurchaseTag } from "react-icons/bi"

export default function Home() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [currentUser, setCurrentUser] = useState(user)
	const sendBusinessPage = () => navigate("/register-business")
	const [products, setProducts] = useState([])


	const registerBuyer = async() => {
		const response = await fetch("http://localhost:5000/api/app/buyer", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		})

		const json = await response.json()

		if(response.ok) {
			const ls = localStorage.getItem("user")
			const value = JSON.parse(ls)
			value.role = json
			const updated = JSON.stringify(value)
			localStorage.setItem("user", updated)
			setCurrentUser(value)
			navigate("/")
		}

		if(!response.ok) {
			console.log(json.error)
		}
	}

	useEffect(() => {
		setCurrentUser(user)
	}, [user])

	useEffect(() => {
		const getProducts = async () => {
			const response = await fetch("http://localhost:5000/api/app", {
				headers: {
					Authorization: `Bearer ${user.token}`
				}
			})

			const json = await response.json()

			if(response.ok) {
				console.log(json)
			}
		}

		getProducts()
	})


	return (
    <div>
       	{currentUser.role === "None" &&
       		<>
       		<div className="flex flex-col items-center mt-20">
          	<header className="text-2xl underline text-center">Choose A Role</header>
          	<main className="w-screen">
          		    <div onClick={registerBuyer} className="flex gap-3 justify-center bg-green-400 text-black mx-auto rounded p-3 m-1 text-center cursor-pointer w-72 md:w-80"><BiPurchaseTag /> I Want To Buy</div>
          		    <div onClick={sendBusinessPage} className="flex gap-3 justify-center bg-green-400 text-black mx-auto rounded p-3 m-1 text-center cursor-pointer w-72 md:w-80"><TbBusinessplan /> 	I want To Sell</div>
          	</main>
         </div>
         </>}
         {currentUser.role === "Buyer" &&
         <>
         	<div>Start Buying</div>
         </>
      }

      {currentUser.role === "Seller" && <Navigate to="/dashboard" />}
    </div>
		)
}