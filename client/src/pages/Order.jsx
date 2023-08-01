import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Order() {
  const params = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const getSingleProduct = async () => {
      setLoading(true)
      const id = params.id.toString();
      const response = await fetch(
        `https://mern-ecommerce-rhpa.onrender.com/api/app/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setProduct(json);
      }
      setLoading(false)
    };

    getSingleProduct();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://mern-ecommerce-rhpa.onrender.com/api/app/cart", {
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
        rate: rate,
        product_id: product.product_id,
        business_name: product.from,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setQuantity("");
      setRate("");
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setQuantity("");
      setRate("");
      navigate("/cart")
    }

    setLoading(false);
  };
  return (
    <>
      {loading ? <div className="flex items-center justify-center h-96">
        <Loader />
      </div> : <div className="sm:w-80 shadow-2xl mx-auto lg:mt-10">
        <main className="mt-5 mx-10 text-sm flex flex-col sm:w-72 mx-auto">
          <div className="bg-gray-100">
            <img
              className="w-36 mx-auto"
              src={`https://mern-ecommerce-rhpa.onrender.com/${product.imagePath}`}
              alt={product.imagePath}
            />
          </div>
          <div className="text-yellow-500 text-lg">{product.product_name}</div>
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
          <div className="text-sm">Id: {product._id}</div>
        </main>
        <main className="-mt-10 text-sm">
          <form
            onSubmit={handleSubmission}
            onFocus={() => setError(null)}
            className="flex flex-col justify-center gap-3  p-1 m-1 rounded h-72"
          >
            <label>Quantity</label>
            <input
              className="border-2 border-yellow-500 outline-none p-1 rounded"
              type="number"
              min="0"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity e.g 4"
            />
            <label>Rate this product</label>
            <div>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={
                      index <= rate >= 1 ? "text-yellow-500" : "text-black"
                    }
                    onClick={() => setRate(index)}
                  >
                    <span className="text-3xl">&#9733;</span>
                  </button>
                );
              })}
            </div>
            {loading ? (
              <div classame="ml-64  ">
                <Loader />
              </div>
            ) : (
              <main className="flex justify-center mt-3 gap-1 bg-yellow-500 p-1 rounded">
                <button>Add to Cart</button>
              </main>
            )}
            {error && (
              <div className="text-sm mt-2 bg-red-400 px-1 rounded sm:w-fit sm:text-lg mx-auto">
                <div>{error}</div>
              </div>
            )}
          </form>
        </main>
      </div>}
    </>
  );
}
