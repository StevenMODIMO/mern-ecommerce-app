import { useState, useEffect } from "react"

export default function Signup() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	return (
		<div>
		  <header>Signup Form</header>
		</div>
		)
}