import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Order() {
  const params = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/api/app/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setProduct(json);
        console.log(json)
      }
    };

    getSingleProduct();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/app/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        imagePath: product.imagePath,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        quantity: quantity,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setQuantity("");
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setQuantity("");
    }
  };
  return (
    <div>
      <main className="text-xs shadow drop-shadow-2xl mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0">
        <header className="flex justify-center">
          <img
            className="w-44"
            src={`http://localhost:5000/${product.imagePath}`}
            alt={product.imagePath}
          />
        </header>
        <div className="text-xl">{product.product_name}</div>
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
        <div className="bg-gray-800/10 p-1 rounded mt-2">id: {product._id}</div>
      </main>

      <main>
        <form
          onSubmit={handleSubmission}
          onFocus={() => setError(null)}
          className="flex flex-col rounded text-lg mx-2 px-2 py-2 shadow bg-white md:w-80 lg:w-96 lg:text-xl"
        >
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 border-green-500/50 outline-none p-1"
            placeholder="Quantity of product e.g 4"
          />
          <main className="flex justify-center mt-3 gap-1 bg-green-500/50 p-1 rounded">
            <button>Add to Cart</button>
          </main>
          {error && (
            <div className="bg-red-500/50 text-lg text-center mx-auto mt-3 p-1 rounded">
              {error}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
