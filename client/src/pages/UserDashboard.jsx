import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wish, setWish] = useState([]);

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
        console.log(json);
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
        console.log(json);
      }
    };

    getWishList();
  }, []);

  return <div></div>;
}
