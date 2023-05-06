import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"

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
			navigate("/dashboard")
		}
	}
	return (
		<div className="flex flex-col gap-10">
            <header className="flex flex-col items-center mt-10">
                <div className="bg-green-400 p-1  rounded text-black w-fit flex gap-3" onClick={() => navigate("/")}>
                    <BiArrowBack className="mt-1" />
                	<button>Go Back</button>
                </div>
            	<div className="text-xl">Register Your Business Now</div>
            </header>
            <form onSubmit={handleSubmission} onFocus={() => setError(null)} className="flex flex-col items-center justify-center gap-3  p-1 m-1 rounded">
            <input type="text" value={business_name} onChange={(e) => setBusinessName(e.target.value)} className="border-2 border-green-400 outline-none rounded p-1" placeholder="business name" />
		    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="border-2 border-green-400 outline-none rounded p-1" placeholder="address" />
		  	<button className="bg-green-500 p-1 rounded">Register Business</button>
		  	{error && <div className="bg-red-300 text-center text-base m-2 p-3 rounded">{error}</div>}
		  </form>
		  
        </div>
		)
}