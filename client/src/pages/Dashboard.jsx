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
    <div className="w-screen">
      <main>
        <div>
          {products.map((product) => {
            return (
              <div key={product._id} className="shadow m-10">
                <img
                className="h-48 w-80"
                  src={`http://localhost:5000/${product.imagePath}`}
                  alt={product.imagePath}
                />
                <section className="text-sm">
                <div>{product.product_name}</div>
                <div>{product.quantity}</div>
                <div>{product.price}</div>
                <div>{product.currency}</div>
                <div>{product._id}</div>
                </section>
                <section className="flex justify-between text-xs">
                <button
                className="p-2 bg-red-500 rounded m-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete Product
                </button>
                <button className="p-2 bg-green-500 rounded m-2">Edit Info</button>
                </section>
              </div>
            );
          })}
        </div>
      </main>

      <main>
        <form
          onSubmit={handleSubmission}
          onFocus={() => setError(null)}
        >
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label>Product Name</label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setProduct_Name(e.target.value)}
            placeholder="Product Name"
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
          <label>Choose currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>Select an option</option>
            <option value="dollar">dollar</option>
            <option value="pound">pound</option>
            <option value="euro">euro</option>
          </select>
          <label>Select Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select an option</option>
            <option value="desktop computer">Desktop Computer</option>
            <option value="laptop">Laptop</option>
            <option value="camera">Camera</option>
            <option value="ram">Ram</option>
          </select>
          <button>
            Submit
          </button>
        </form>
        {error && (
          <div>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
