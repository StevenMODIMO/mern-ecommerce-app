import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Payment() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const getSingleProduct = async () => {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/api/app/item/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
      }
    };

    getSingleProduct();
  }, []);
  return (
    <div>
      <header>
        <div>Payment Gateway Here:</div>
      </header>
    </div>
  );
}
