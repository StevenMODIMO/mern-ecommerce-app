import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbJewishStar } from "react-icons/tb";
import { BsStar, BsCartDash } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlinePayment, MdOutlineAddShoppingCart } from "react-icons/md";
import Invoice from "../components/Invoice";

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wish, setWish] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showTab, setShowTab] = useState(true);
  const [model, setModel] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch("https://mern-ecommerce-rhpa.onrender.com/api/app/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setOrders(json)
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    const getWishList = async () => {
      const response = await fetch(
        "https://mern-ecommerce-rhpa.onrender.com/api/app/get-wishlist",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log(json)
        setWish(json);
      }
    };

    getWishList();
  }, []);

  const removeFromCart = async (id) => {
    const response = await fetch(
      `https://mern-ecommerce-rhpa.onrender.com/api/app/remove-from-cart/${id}`,
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
      `https://mern-ecommerce-rhpa.onrender.com/api/app/remove-wishlist/${id}`,
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

  const getInvoice = async () => {
    const response = await fetch(
      "https://mern-ecommerce-rhpa.onrender.com/api/app/buyer-invoice",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setInvoices(json);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <div>
      <header className="text-lg flex flex-col gap-0 sm:grid grid-cols-3 lg:grid-cols-3">
        <div
          onClick={() => setShowTab(true)}
          className={
            showTab
              ? "cursor-pointer flex gap-2 text-lg bg-none border border-yellow-500 p-1"
              : "cursor-pointer flex gap-2 text-lg bg-yellow-500 p-1"
          }
        >
          <AiOutlineShoppingCart className="mt-1" />
          <button>Cart</button>
        </div>
        <div
          onClick={() => setShowTab(false)}
          className={
            !showTab
              ? "cursor-pointer flex gap-2 text-lg bg-none border border-yellow-500 p-1"
              : "cursor-pointer flex gap-2 text-lg bg-yellow-500 p-1"
          }
        >
          <TbJewishStar className="mt-1" />
          <button>Wishlist</button>
        </div>
        <div
          onClick={() => setModel(true)}
          className="cursor-pointer flex gap-2 text-lg bg-yellow-500 p-1"
        >
          <FaFileInvoice className="mt-1" />
          <button>Generate Inovice</button>
        </div>
      </header>
      <section>
        {model && <Invoice orders={invoices} setModel={setModel} />}
      </section>
      {showTab ? (
        <main>
          {orders.length === 0 ? (
            <div className="mt-5 sm:mt-20">
              <div className="flex justify-center">
                <AiOutlineShoppingCart className="text-9xl text-yellow-300" />
              </div>
              <h1 className="text-lg text-center">
                Cart is Empty
              </h1>
            </div>
          ) : (
            <div className="my-10 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4 lg:text-lg">
              {orders.map((order) => {
                return (
                  <div key={order._id} className=" mx-4 shadow-lg h-fit">
                    <div className="shadow-lg h-fit">
                      <img
                        className="w-36 mx-auto"
                        src={`https://mern-ecommerce-rhpa.onrender.com/${order.imagePath}`}
                        alt={order.imagePath}
                      />
                    </div>
                    <section>
                      <div className="text-yellow-500 text-lg">
                        {order.product_name}
                      </div>
                      <div className="text-lg">Quantity: {order.quantity}</div>
                      <section className="flex text-sm">
                        <div>
                          {order.currency === "dollar"
                            ? "$"
                            : order.currency == "pound"
                              ? "£"
                              : order.currency == "euro"
                                ? "€"
                                : ""}
                        </div>
                        <div>{order.price}</div>
                      </section>
                      <section>
                        <div className="text-sm">
                          Status:{" "}
                          {order.completed == false
                            ? "Not processed"
                            : "Processed"}
                        </div>
                      </section>
                      <div className="text-sm">Id: {order._id}</div>
                    </section>
                    <div className="bg-gray-200 flex justify-between px-4 text-2xl">
                      <section
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => removeFromCart(order._id)}
                      >
                        <BsCartDash className="mt-1" />
                      </section>
                      <section className="text-yellow-500 cursor-pointer">
                        <NavLink to={`/payment/${order._id}`} className="flex">
                          <MdOutlinePayment className="mt-1" />
                        </NavLink>
                      </section>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      ) : (
        <main>
          {wish.length === 0 ? (
            <div className="mt-5 sm:mt-20">
              <div className="flex justify-center">
                <TbJewishStar className="text-9xl text-yellow-300" />
              </div>
              <h1 className="text-lg text-center">
                Wishlist is empty
              </h1>
            </div>
          ) : (
            <div className="my-10 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4 lg:text-lg">
              {wish.map((w) => {
                return (
                  <div key={w._id} className="shadow-lg h-fit">
                    <div className="bg-gray-100">
                      <img
                        className="w-36 mx-auto"
                        src={`https://mern-ecommerce-rhpa.onrender.com/${w.imagePath}`}
                        alt={w.imagePath}
                      />
                    </div>
                    <section>
                      <div className="text-yellow-500 text-lg">
                        {w.product_name}
                      </div>
                      <div className="text-lg">Quantity: {w.quantity}</div>
                      <section className="flex text-sm">
                        <div>
                          {w.currency === "dollar"
                            ? "$"
                            : w.currency == "pound"
                              ? "£"
                              : w.currency == "euro"
                                ? "€"
                                : ""}
                        </div>
                        <div>{w.price}</div>
                      </section>
                      <div className="text-sm">Id: {w._id}</div>
                    </section>
                    <div className="bg-gray-200 flex justify-between px-4 text-2xl">
                      <section onClick={() => removeFromWishList(w._id)}>
                        <BsStar className="mt-1 cursor-pointer text-yellow-500" />
                      </section>
                      <section className="cursor-pointer">
                        <NavLink to={`/cart/${w._id}`}>
                          <MdOutlineAddShoppingCart className="mt-1 text-yellow-500" />
                        </NavLink>
                      </section>
                    </div>
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
