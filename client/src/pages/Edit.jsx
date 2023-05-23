import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { AiFillFileAdd } from "react-icons/ai"
import { MdOutlineSend} from "react-icons/md"

export default function Edit() {
    const [product, setProduct] = useState({})
    const [image, setImage] = useState("");
    const [product_name, setProduct_Name] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [currency, setCurrency] = useState("Select an option");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null)
    const navigate = useNavigate()
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
                setProduct(json)
            }

            if(!response.ok) {
                setError(json.error)
            }
        }

        getProductDetails()
    }, [])

    const handleSubmission = async(e) => {
        e.preventDefault()

        const formData = new FormData();
    formData.append("image", product.image);
    formData.append("product_name", product.product_name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("currency", product.currency);
    formData.append("category", product.category);

        const response = await fetch("http://localhost:5000/api/app/edit-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: formData
        })

        const json = await response.json()

        if(response.ok) {
            navigate("/dashboard")
        }
    }
    return (
        <div>
            <div>Edit Info Here</div>
            <div>
            <main>
        <header>
          <div className="text-center">Edit Product Info</div>
        </header>
        <section className="md:flex justify-center">
          <form
            className="flex flex-col rounded text-lg mx-2 px-2 py-2 shadow bg-white md:w-80 lg:w-96 lg:text-xl"
            onSubmit={handleSubmission}
            onFocus={() => setError(null)}
          >
            <label
              htmlFor="fileInput"
              className=" mt-3 cursor-pointer gap-1 bg-green-500/50 rounded p-1"
            >
              <input
                id="fileInput"
                className="hidden"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {!image ? (
                <div className="flex justify-center">
                  <AiFillFileAdd className=" text-2xl lg:text-3xl" />
                  <span>Upload Image</span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <TiTick className=" text-2xl lg:text-3xl" />
                  <span>Image Uploaded</span>
                </div>
              )}
            </label>

            <label className="mt-3">Product Name</label>
            <input
              className="border-2 border-green-500/50 outline-none p-1"
              type="text"
              value={product.product_name}
              onChange={(e) => setProduct_Name(e.target.value)}
              placeholder="e.g Dell Desktop"
            />
            <label>Description</label>
            <textarea
              className="border-2 border-green-500/50 outline-none  p-1 h-24"
              placeholder="separate by comma e.g Ram 4GB, intel core i9, 500GB, Nvidia graphics"
              value={product.description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="mt-3">Price</label>
            <input
              className="border-2 border-green-500/50 outline-none p-1"
              type="number"
              value={product.price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g 5000"
            />
            <label className="mt-3">Quantity</label>
            <input
              className="border-2 border-green-500/50 outline-none p-1"
              type="number"
              value={product.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g 4"
            />
            <label className="mx-auto mt-3">Choose currency:</label>
            <select
              className="border-2 border-green-500/50 p-1 outline-none w-40 mx-auto"
              value={product.currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option className="text-sm">Choose....</option>
              <option className="text-sm" value="dollar">
                dollar
              </option>
              <option className="text-sm" value="pound">
                pound
              </option>
              <option className="text-sm" value="euro">
                euro
              </option>
            </select>
            <label className="mx-auto mt-3">Select Category:</label>
            <select
              className="border-2 border-green-500/50 p-1 outline-none w-40 mx-auto"
              value={product.category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option className="text-sm">Choose....</option>
              <option className="text-sm" value="desktop computer">
                Desktop Computer
              </option>
              <option className="text-sm" value="laptop">
                Laptop
              </option>
              <option className="text-sm" value="camera">
                Camera
              </option>
              <option className="text-sm" value="ram">
                Ram
              </option>
            </select>
            <main className="flex justify-center mt-3 gap-1 bg-green-500/50 p-1 rounded">
              <MdOutlineSend className=" text-2xl" />
              <button>Submit</button>
            </main>
            {error && (
              <div className="bg-red-500/50 text-lg text-center mx-auto mt-3 p-1 rounded">
                {error}
              </div>
            )}
          </form>
        </section>
      </main>
            </div>
        </div>
    )
}