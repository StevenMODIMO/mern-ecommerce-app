import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Signup() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { dispatch } = useAuth()
	const navigate = useNavigate()

	const handleSubmission = async (e) => {
		e.preventDefault()
		const response = await fetch("http://localhost:5000/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email, password})
		})

		const json = await response.json()

		if(!response.ok) {
			setError(json.error)
			setLoading(false)
			setEmail("")
			setPassword("")
		}

		if(response.ok) {
			setError(false)
			setLoading(true)
			localStorage.setItem("user", JSON.stringify(json))
			dispatch({ type: "LOGIN",payload: json})
			navigate("/")
		}
	}
	return (
		<div>
		  <header className="text-center m-2 underline">Register Now</header>
		  <form onSubmit={handleSubmission} onFocus={() => setError(null)} className="flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-indigo-50 p-1 m-1 rounded h-80">
		  	<input type="text" className="border-2 border-blue-200 outline-none rounded p-1" placeholder="email address" />
		  	<input type="password" className="border-2 border-blue-200 outline-none rounded p-1" placeholder="password" />
		  	<button className="border-2 border-blue-200 p-1 rounded bg-blue-200">Register</button>
		  </form>
		  {error && <div className="bg-red-300 text-center m-2 rounded bg-gradient-to-r from-indigo-50">{error}</div>}
		</div>
		)
}