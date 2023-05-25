import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbJewishStar } from "react-icons/tb";
import { BsCartDash } from "react-icons/bs";

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wish, setWish] = useState([]);
  const [showTab, setShowTab] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch("http://localhost:5000/api/app/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setOrders(json);
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    const getWishList = async () => {
      const response = await fetch(
        "http://localhost:5000/api/app/get-wishlist",
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

    getWishList();
  }, []);

  const removeFromCart = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/app/remove-from-cart/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const newOrders = orders.filter((order) => order._id !== id);
    setOrders(newOrders);
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

    const newWishList = wish.filter((w) => w._id !== id);
    setWish(newWishList);
  };


  return (
    <div className="lg:flex">
      <header className="flex w-screen text-lg lg:flex lg:flex-col">
        <div
          onClick={() => setShowTab(true)}
          className={
            showTab
              ? "w-2/4 bg-green-500 rounded flex justify-center gap-1"
              : "w-2/4 text-start border-b border-green-500 rounded flex justify-center gap-1"
          }
        >
          <AiOutlineShoppingCart className="mt-1" />
          <button>Cart</button>
        </div>
        <div
          onClick={() => setShowTab(false)}
          className={
            !showTab
              ? "w-2/4 bg-green-500 rounded flex justify-center gap-1"
              : "w-2/4 text-start border-b border-green-500 rounded flex justify-center gap-1"
          }
        >
          <TbJewishStar className="mt-1" />
          <button>Wishlist</button>
        </div>
      </header>
      {showTab ? (
        <main className="lg:w-full">
          {orders.length == 0 ? (
            <div>No Orders</div>
          ) : (
            <div className="md:grid grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {orders.map((order) => {
                return (
                  <div
                    key={order._id}
                    className="shadow mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0"
                  >
                    <img
                      className="w-36"
                      src={`http://localhost:5000/${order.imagePath}`}
                      alt={order.imagePath}
                    />
                    <section className="text-sm ml-2">
                      <div className="text-2xl">{order.product_name}</div>
                      <div>Quantity: {order.quantity}</div>
                      <section className="flex gap-1">
                        <div className="text-xl">
                          {order.currency === "dollar"
                            ? "$"
                            : order.currency == "pound"
                            ? "£"
                            : order.currency == "euro"
                            ? "€"
                            : ""}
                        </div>
                        <div className="text-lg">{order.price}</div>
                      </section>
                      <section className="bg-gray-900/10 mt-2 rounded p-1">
                        <div>
                          Status:{" "}
                          {order.completed == false
                            ? "Not processed"
                            : "Processed"}
                        </div>
                      </section>
                      <section className="bg-gray-900/10 mt-2 rounded p-1">
                        <div className="underline text-lg">Info:</div>
                        <div>{order.description}</div>
                      </section>
                      <div className="bg-gray-800/10 p-1 rounded mt-2">
                        {order._id}
                      </div>
                    </section>
                    <section
                      onClick={() => removeFromCart(order._id)}
                      className="text-lg flex gap-1 justify-center bg-red-500 p-1 rounded"
                    >
                      <BsCartDash className="mt-1" />
                      <button>Remove from cart</button>
                    </section>
                    <section className="text-lg flex gap-1 justify-center bg-green-500 p-1 rounded">
                      <NavLink to={`/payment/${order._id}`}>Complete Order</NavLink>
                    </section>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      ) : (
        <main className="lg:w-full">
          {wish.length == 0 ? (
            <div>WishList Empty</div>
          ) : (
            <div className="md:grid grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {wish.map((w) => {
                return (
                  <div
                    key={w._id}
                    className="shadow mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0"
                  >
                    <img
                      className="w-36"
                      src={`http://localhost:5000/${w.imagePath}`}
                      alt={w.imagePath}
                    />
                    <section className="text-sm ml-2">
                      <div className="text-2xl">{w.product_name}</div>
                      <div>Quantity: {w.quantity}</div>
                      <section className="flex gap-1">
                        <div className="text-xl">
                          {w.currency === "dollar"
                            ? "$"
                            : w.currency == "pound"
                            ? "£"
                            : w.currency == "euro"
                            ? "€"
                            : ""}
                        </div>
                        <div className="text-lg">{w.price}</div>
                      </section>
                      <section className="bg-gray-900/10 mt-2 rounded p-1">
                        <div className="underline text-lg">Info:</div>
                        <div>{w.description}</div>
                      </section>
                      <div className="bg-gray-800/10 p-1 rounded mt-2">
                        {w._id}
                      </div>
                    </section>
                    <section
                      onClick={() => removeFromWishList(w._id)}
                      className="text-lg flex gap-1 justify-center bg-red-500 p-1 rounded"
                    >
                      <BsCartDash className="mt-1" />
                      <button>Remove Wishlist</button>
                    </section>
                    <section
                      className="text-lg flex gap-1 justify-center bg-green-500 p-1 rounded"
                    >
                      <NavLink to={`/cart/${w._id}`}>Add to Cart</NavLink>
                    </section>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
