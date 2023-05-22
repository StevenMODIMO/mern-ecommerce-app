import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { MdOutlineSend } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [product_name, setProduct_Name] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("Select an option");
  const [category, setCategory] = useState("");

  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/api/app/products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setProducts(json.products);
      }

      if (!response.ok) {
        console.log(json.error);
      }
    };
    getProducts();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("product_name", product_name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("currency", currency);
    formData.append("category", category);

    const response = await fetch("http://localhost:5000/api/app/new-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setProduct_Name("");
      setDescription("");
      setPrice("");
      setCurrency("");
      setCategory("");
      setQuantity("");
      setImage("");
    }
  };

  useEffect(() => {});

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/app/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const newProducts = products.filter((product) => product._id !== id);
    setProducts(newProducts);
  };

  return (
    <div className="lg:flex gap-20">
      <main className="lg:w-full">
        <div className="md:grid grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="shadow mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0"
              >
                <img
                  className="w-36"
                  src={`http://localhost:5000/${product.imagePath}`}
                  alt={product.imagePath}
                />
                <section className="text-sm ml-2">
                  <div className="text-2xl">{product.product_name}</div>
                  <div>Quantity: {product.quantity}</div>
                  <section className="flex gap-1">
                    <div className="text-xl">
                      {product.currency === "dollar"
                        ? "$"
                        : product.currency == "pound"
                        ? "£"
                        : product.currency == "euro"
                        ? "€"
                        : ""}
                    </div>
                    <div className="text-lg">{product.price}</div>
                  </section>
                  <section className="bg-gray-900/10 mt-2 rounded p-1">
                    <div className="underline text-lg">Info:</div>
                    <div>{product.description}</div>
                  </section>
                  <div className="bg-gray-800/10 p-1 rounded mt-2">
                    {product._id}
                  </div>
                </section>
                <section className="flex justify-between text-xs">
                  <button
                    className="p-2 bg-red-500 rounded m-2"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete Product
                  </button>
                  <NavLink
                    to={`/edit/${product._id}`}
                    className="px-1 text-center bg-green-500 rounded m-2"
                  >
                    Edit Info
                  </NavLink>
                </section>
              </div>
            );
          })}
        </div>
      </main>
      <main>
        <header>
          <div className="text-center">New Product</div>
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
              value={product_name}
              onChange={(e) => setProduct_Name(e.target.value)}
              placeholder="e.g Dell Desktop"
            />
            <label>Description</label>
            <textarea
              className="border-2 border-green-500/50 outline-none  p-1 h-24"
              placeholder="separate by comma e.g Ram 4GB, intel core i9, 500GB, Nvidia graphics"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="mt-3">Price</label>
            <input
              className="border-2 border-green-500/50 outline-none p-1"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g 5000"
            />
            <label className="mt-3">Quantity</label>
            <input
              className="border-2 border-green-500/50 outline-none p-1"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g 4"
            />
            <label className="mx-auto mt-3">Choose currency:</label>
            <select
              className="border-2 border-green-500/50 p-1 outline-none w-40 mx-auto"
              value={currency}
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
              value={category}
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
  );
}
