import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

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
      setProducts(
        [...products, json.product].sort((a, b) =>
          a.category.localeCompare(b.category)
        )
      );
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
    <div>
      <header>
        <div className="text-2xl underline">Dashboard</div>
      </header>

      <main>
        <div>
          {products.map((product) => {
            return (
              <div key={product._id}>
                <img
                  className="w-40 h-40"
                  src={`http://localhost:5000/${product.imagePath}`}
                  alt={product.imagePath}
                />
                <div>{product.product_name}</div>
                <div>{product.quantity}</div>
                <div>{product.price}</div>
                <div>{product.currency}</div>
                <div>{product._id}</div>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="flex gap-3 justify-center bg-green-400 text-black mx-auto rounded p-3 m-1 text-center cursor-pointer w-72 md:w-80"
                >
                  Delete Product
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <main>
        <form
          onSubmit={handleSubmission}
          onFocus={() => setError(null)}
          className="text-xl flex flex-col items-center justify-center gap-3 p-1 m-1 rounded"
        >
          <label className="w-72">Product Image</label>
          <input
            type="file"
            name="image"
            className="border-2 border-green-200 outline-none rounded p-1 w-72"
            onChange={(e) => setImage(e.target.files[0])}
          />
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
          <label className="w-72">Choose currency:</label>
          <select
            className="w-72 border-2 border-green-200 outline-none rounded p-1"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>Select an option</option>
            <option value="dollar">dollar</option>
            <option value="pound">pound</option>
            <option value="euro">euro</option>
          </select>
          <label className="w-72">Select Category:</label>
          <select
            className="w-72 border-2 border-green-200 outline-none rounded p-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select an option</option>
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
