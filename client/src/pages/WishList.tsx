import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader"

export default function WishList() {
  const params = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
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
      } setLoading(false)
    };

    getSingleProduct();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("https://mern-ecommerce-rhpa.onrender.com/api/app/add-wishlist", {
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
      navigate("/")
    }
    setLoading(false)
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
            className="flex flex-col justify-center gap-3  p-1 m-1 rounded-sm h-72"
          >
            <label>Quantity</label>
            <input
              type="number"
              min="0"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-2 border-yellow-500 outline-hidden p-1 rounded-sm"
              placeholder="Quantity of product e.g 4"
            />
            {loading ? (
              <div classame="ml-64  ">
                <Loader />
              </div>
            ) : (
              <main className="flex justify-center mt-3 gap-1 bg-yellow-400 p-1 rounded-sm">
                <button>Add to Wishlist</button>
              </main>
            )}
            {
              error && <div className="text-lg bg-red-400 px-1 rounded-sm">
                <div>{error}</div>
              </div>
            }
          </form>
        </main>
      </div>}
    </>
  );
}
