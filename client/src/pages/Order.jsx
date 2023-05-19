import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Order() {
    const params = useParams()
    const { user } = useAuth()

    useEffect(() => {
        const getSingleProduct = async () => {
            const id = params.id.toString()
            const response = await fetch(`http://localhost:5000/api/app/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                console.log(json)
            }
        }

        getSingleProduct()
    })
    return (
        <div></div>
    )
}