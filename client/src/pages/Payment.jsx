import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Payment() {
  const [order, setOrder] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpMonth, setExpMonth] = useState("");
  const [cardExpYear, setExpYear] = useState("");
  const [cardCvc, setCvc] = useState("");
  const [error, setError] = useState(null);
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
        setOrder(json);
      }

      if (!response.ok) {
        console.log(json.error);
      }
    };

    getSingleProduct();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/app/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        cardNumber: cardNumber,
        cardExpMonth: cardExpMonth,
        cardExpYear: cardExpYear,
        cardCvc: cardCvc,
        product_name: order.product_name,
        description: order.description,
        price: order.price,
        currency: order.currency,
        quantity: order.quantity,
        imagePath: order.imagePath,
        prevID: order._id
      }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCvc("");
      setError(null);
    }

    if (!response.ok) {
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCvc("");
      setError(json.error);
    }
  };
  return (
    <div>
      <header>
        <div>Payment Gateway Here:</div>
      </header>
      <section className="flex">
        <main className="text-xs shadow drop-shadow-2xl mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0">
          <header className="flex justify-center">
            <img
              className="w-44"
              src={`http://localhost:5000/${order.imagePath}`}
              alt={order.imagePath}
            />
          </header>
          <div className="text-xl">{order.product_name}</div>
          <div>Qunatity: {order.quantity}</div>
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
            <div className="underline text-lg">Info:</div>
            <div>{order.description}</div>
          </section>
          <div className="bg-gray-800/10 p-1 rounded mt-2">id: {order._id}</div>
        </main>

        {
          <form
            onSubmit={handleSubmission}
            onFocus={() => setError(null)}
            className="flex flex-col rounded text-lg mx-2 px-2 py-2 shadow bg-white md:w-80 lg:w-96 lg:text-xl"
          >
            <label>card number</label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              type="text"
              className="border-2 border-green-500/50 outline-none p-1"
            />
            <label>expire month</label>
            <input
              value={cardExpMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              type="text"
              className="border-2 border-green-500/50 outline-none p-1"
            />
            <label>expire year</label>
            <input
              value={cardExpYear}
              onChange={(e) => setExpYear(e.target.value)}
              type="text"
              className="border-2 border-green-500/50 outline-none p-1"
            />
            <label>cvc code</label>
            <input
              value={cardCvc}
              onChange={(e) => setCvc(e.target.value)}
              type="text"
              className="border-2 border-green-500/50 outline-none p-1"
            />
            <main className="flex justify-center mt-3 gap-1 bg-green-500/50 p-1 rounded">
              <button>Complete Payment</button>
            </main>
            {error && (
              <div className="bg-red-500/50 text-lg text-center mx-auto mt-3 p-1 rounded">
                {error}
              </div>
            )}
          </form>
        }
      </section>
    </div>
  );
}
