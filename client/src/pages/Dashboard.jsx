import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [product_name, setProduct_Name] = useState("");
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/app/new-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        product_name: product_name,
        description: description,
        price: price,
        quantity: quantity,
        currency: currency,
        category: category,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setProduct_Name("")
      setDescription("")
      setPrice("")
      setCurrency("")
      setCategory("")
      setQuantity("")
    }
  };
  return (
    <div>
      <header>
        <div className="text-2xl underline">Dashboard</div>
      </header>
      <main>
        <form
          onSubmit={handleSubmission}
          onFocus={() => setError(null)}
          className="text-xl flex flex-col items-center justify-center gap-3 p-1 m-1 rounded"
        >
          <label className="w-72">Product Name</label>
          <input
            type="text"
            className="border-2 border-green-200 outline-none rounded p-1 w-72"
            value={product_name}
            onChange={(e) => setProduct_Name(e.target.value)}
            placeholder="Product Name"
          />
          <label className="w-72">Description</label>
          <input
            type="text"
            className="border-2 border-green-200 outline-none rounded p-1 w-72"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="w-72">Price</label>
          <input
            type="text"
            className="border-2 border-green-200 outline-none rounded p-1 w-72"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <label className="w-72">Quantity</label>
          <input
            type="number"
            className="border-2 border-green-200 outline-none rounded p-1 w-72"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
          <label className="w-72">
            Choose currency:
          </label>
          <select
          defaultValue="Choose Currency"
            className="w-72 border-2 border-green-200 outline-none rounded p-1"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>
              Select an option
            </option>
            <option value="dollar">dollar</option>
            <option value="pound">pound</option>
            <option value="euro">euro</option>
          </select>
          <label className="w-72">
            Select Category:
          </label>
          <select
            className="w-72 border-2 border-green-200 outline-none rounded p-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            <option value="desktop computer">Desktop Computer</option>
            <option value="laptop">Laptop</option>
            <option value="camera">Camera</option>
            <option value="ram">Ram</option>
          </select>
          <button className="flex gap-3 justify-center bg-green-400 text-black mx-auto rounded p-3 m-1 text-center cursor-pointer w-72 md:w-80">
            Submit
          </button>
        </form>
        {error && (
          <div className="bg-red-300 text-center text-base m-2 p-3 rounded">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
