
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Home() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const sendBusinessPage = () => navigate("/register-business")
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
		}

		if(!response.ok) {
			console.log(json.error)
		}
	}
	return (
    <div>
       {user.role == "None" ? <div>
              	<header className="text-2xl underline">Choose A Role</header>
              	    <main className="w-screen">
              		    <div onClick={registerBuyer} className="bg-green-400 text-black mx-auto rounded p-1 m-1 text-center">I Want To Buy</div>
              		    <div onClick={sendBusinessPage} className="bg-green-400 text-black mx-auto rounded p-1 m-1 text-center">I want To Sell</div>
              	    </main>
               </div>: <div>
              	<header className="text-2xl underline">Welcome to Tronic Cart</header>
               </div>}
    </div>
		)
}