import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Edit() {
    const [image, setImage] = useState("");
    const [product_name, setProduct_Name] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [currency, setCurrency] = useState("Select an option");
    const [category, setCategory] = useState("");

    const params = useParams()
    const { user } = useAuth()

    useEffect(() => {
        const getProductDetails = async () => {
            const id = params.id.toString()
            const response = await fetch(`http://localhost:5000/api/app/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(response.ok) {
                console.log(json)
            }
        }

        getProductDetails()
    })
    return (
        <div>
            <div>Edit Info Here</div>
        </div>
    )
}