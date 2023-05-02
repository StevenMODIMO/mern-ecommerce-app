import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Business() {
	const [address, setAddress] = useState("")
	const [business_name, setBusinessName] = useState("")
	const [error, setError] = useState(null)
	const { user } = useAuth()
	const navigate = useNavigate()

	const handleSubmission = async(e) => {
		e.preventDefault()

		const response = await fetch("http://localhost:5000/api/app/seller", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${user.token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({business_name,address})
		})

		const json = await response.json()

		if(!response.ok) {
			setError(json.error)
			setAddress("")
			setBusinessName("")
		}

		if(response.ok) {
			setError(null)
			const ls = localStorage.getItem("user")
			const value = JSON.parse(ls)
			value.role = json
			const updated = JSON.stringify(value)
			localStorage.setItem("user", updated)
			navigate("/")
		}
	}
	return (
		<div>
            <div>Welcome To Business Page</div>
            <form onSubmit={handleSubmission} onFocus={() => setError(null)} className="flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-indigo-50 p-1 m-1 rounded h-80">
            <input type="text" value={business_name} onChange={(e) => setBusinessName(e.target.value)} className="border-2 border-blue-200 outline-none rounded p-1" placeholder="business name" />
		    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="border-2 border-blue-200 outline-none rounded p-1" placeholder="address" />
		  	<button className="border-2 border-blue-200 p-1 rounded bg-blue-200">Register Business</button>
		  </form>
		  {error && <div className="bg-red-300 text-center m-2 rounded bg-gradient-to-r from-indigo-50">{error}</div>}
        </div>
		)
}