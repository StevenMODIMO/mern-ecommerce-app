import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

export default function WishToCart() {
  const { user } = useAuth();
  const params = useParams();
  const [wish, setWish] = useState({});
  const navigate = useNavigate();

  const handleSubmission = async () => {
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
    }
  };

  const removeFromWishList = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/app/remove-wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  const confirmAndRemove = (id) => {
    removeFromWishList(id);
    handleSubmission();
  };

  useEffect(() => {
    const getSingleProduct = async () => {
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
      }
    };

    getSingleProduct();
  }, []);

  return (
    <div>
      <main className="text-xs shadow drop-shadow-2xl mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0">
        <header className="flex justify-center">
          <img
            className="w-36"
            src={`http://localhost:5000/${wish.imagePath}`}
            alt={wish.imagePath}
          />
        </header>
        <div className="text-xl">{wish.product_name}</div>
        <section className="flex gap-1">
          <div className="text-xl">
            {wish.currency === "dollar"
              ? "$"
              : wish.currency == "pound"
              ? "£"
              : wish.currency == "euro"
              ? "€"
              : ""}
          </div>
          <div className="text-lg">{wish.price}</div>
        </section>
        <section className="bg-gray-900/10 mt-2 rounded p-1">
          <div className="underline text-lg">Info:</div>
          <div>{wish.description}</div>
        </section>
        <div className="bg-gray-800/10 p-1 rounded mt-2">id: {wish._id}</div>
        <div className="bg-gray-800/10 p-1 rounded mt-2 w-fit">
          Quantity: {wish.quantity}
        </div>
        <section
          className="flex justify-center"
          onClick={() => confirmAndRemove(wish._id)}
        >
          <button className="bg-green-500 p-1 rounded px-2">Confirm</button>
        </section>
      </main>
    </div>
  );
}
