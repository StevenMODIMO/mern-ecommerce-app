import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wish, setWish] = useState([]);
  const [activeTab, setActiveTab] = useState("orders"); // Added state for active tab

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch("http://localhost:5000/api/app/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
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
      const response = await fetch("http://localhost:5000/api/app/get-wishlist", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (response.ok) {
        setWish(json);
      }
    };

    getWishList();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-container">
        <button
          className={`tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => handleTabClick("orders")}
        >
          Orders
        </button>
        <button
          className={`tab ${activeTab === "wishlist" ? "active" : ""}`}
          onClick={() => handleTabClick("wishlist")}
        >
          Wishlist
        </button>
      </div>
      <main>
        {activeTab === "orders" &&
          orders.map((order) => (
            <div key={order._id}>
              <header className="flex justify-center">
                <img className="w-40" src={`http://localhost:5000/${order.imagePath}`} alt={`Order ${order._id}`} />
              </header>
            </div>
          ))}
      </main>
      <main>
        {activeTab === "wishlist" &&
          wish.map((item) => (
            <div key={item._id}>
              <header className="flex justify-center">
                <img className="w-40" src={`http://localhost:5000/${item.imagePath}`} alt={`Wishlist Item ${item._id}`} />
              </header>
            </div>
          ))}
      </main>
    </div>
  );
}
