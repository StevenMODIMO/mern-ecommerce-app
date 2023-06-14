import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function WishToCart() {
  const { user } = useAuth();
  const params = useParams();
  const [wish, setWish] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmission = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/app/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        imagePath: wish.imagePath,
        product_name: wish.product_name,
        description: wish.description,
        price: wish.price,
        currency: wish.currency,
        quantity: wish.quantity,
      }),
    });

    if (response.ok) {
      navigate("/cart");
      setLoading(false);
    }
  };

  const removeFromWishList = async (id) => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:5000/api/app/remove-wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setLoading(false);
  };

  const confirmAndRemove = (id) => {
    removeFromWishList(id);
    handleSubmission();
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      setLoading(true)
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/api/app/get-wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setWish(json);
        setLoading(false);
      }
    };

    getSingleProduct();
  }, []);

  return (
    <>
    {loading ? <div className="flex items-center justify-center h-96">
      <Loader />
    </div> : <div className="mt-10 px-4 mx-10 text-sm flex flex-col gap-10 sm:items-center lg:text-lg">
      <main className="shadow-lg h-fit">
        <div className="bg-gray-100">
          <img
            className="w-36 mx-auto"
            src={`http://localhost:5000/${wish.imagePath}`}
            alt={wish.imagePath}
          />
        </div>
        <div className="text-yellow-500 text-lg">{wish.product_name}</div>
        <section className="flex text-sm">
          <div>
            {wish.currency === "dollar"
              ? "$"
              : wish.currency == "pound"
              ? "£"
              : wish.currency == "euro"
              ? "€"
              : ""}
          </div>
          <div>{wish.price}</div>
        </section>
        <div className="text-sm">Id: {wish._id}</div>
        <div className="text-lg">Quantity: {wish.quantity}</div>
        <section
          className="flex justify-center my-3"
          onClick={() => confirmAndRemove(wish._id)}
        >
          <button className="bg-yellow-500 p-1  px-2">Confirm</button>
        </section>
      </main>
    </div>}
    </>
  );
}
