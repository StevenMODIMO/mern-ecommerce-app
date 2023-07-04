import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";

export default function Payment() {
  const [order, setOrder] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpMonth, setExpMonth] = useState("");
  const [cardExpYear, setExpYear] = useState("");
  const [cardCvc, setCvc] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const params = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const getSingleProduct = async () => {
      setLoading(true);
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/api/app/item/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setOrder(json);
        setLoading(false);
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
        prevID: order._id,
        business_name: order.from,
        address: address,
        from: user.email,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCvc("");
      setAddress("");
      setError(null);
      navigate("/cart")
    }

    if (!response.ok) {
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCvc("");
      setAddress("");
      setError(json.error);
      console.log(json.error)
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(
        "https://ipinfo.io/json?token=b068a85af3c0f9"
      );
      const json = await response.json();

      if (response.ok) {
        setCity(json.city);
        setCountry(json.country);
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (check) {
      setAddress(city + "," + country);
    } else {
      setAddress("");
    }
  }, [check, city, country]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader />
        </div>
      ) : (
        <div>
          <header className="underline text-center text-lg">
            <div>Complete Payment:</div>
          </header>
          <section className="flex flex-col sm:mx-auto w-80 sm:flex-row w-full justify-center">
            <main className="text-xs shadow-xl mx-10 my-5 p-4 md:w-72 lg:w-64 lg:ml-16">
              <header className="flex justify-center">
                <img
                  className="w-36 mx-auto"
                  src={`http://localhost:5000/${order.imagePath}`}
                  alt={order.imagePath}
                />
              </header>
              <div className="text-xl">{order.product_name}</div>
              <div>Qunatity: {order.quantity}</div>
              <section className="flex gap-1">
                <div className="flex text-sm">
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
              <div className="text-xs mt-2">Id: {order._id}</div>
            </main>

            {
              <form
                onSubmit={handleSubmission}
                onFocus={() => setError(null)}
                className="flex flex-col rounded text-lg mx-2 px-2 py-2 shadow-xl bg-white md:w-80 lg:w-96 lg:text-lg"
              >
                <header className="flex gap-2 text-5xl">
                  <FaCcMastercard />
                  <FaCcVisa />
                </header>
                <label>card number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  type="text"
                  className="border-2 border-yellow-500 outline-none p-1"
                />
                <label>expire month</label>
                <input
                  value={cardExpMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  type="text"
                  className="border-2 border-yellow-500 outline-none p-1"
                  placeholder="e.g 09 or 10"
                />
                <label>expire year</label>
                <input
                  value={cardExpYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  type="text"
                  className="border-2 border-yellow-500 outline-none p-1"
                  placeholder="e.g 24/22/25"
                />
                <label>cvc code</label>
                <input
                  value={cardCvc}
                  onChange={(e) => setCvc(e.target.value)}
                  type="text"
                  className="border-2 border-yellow-500 outline-none p-1"
                  placeholder="Last three digits"
                />
                <label>Shipping Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="border-2 border-yellow-500 outline-none p-1"
                />
                <label className="text-sm flex gap-1 ml-0 sm:text-lg">
                  <input
                    type="checkbox"
                    checked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                  />
                  <span className="bg-yellow-200 px-1">
                    Use current location ?
                  </span>
                </label>
                <main className="flex justify-center mt-3 gap-1 bg-yellow-500 p-1 rounded">
                  <button>Complete Payment</button>
                </main>
                {error && (
                  <div className="text-sm mt-2 bg-red-400 px-1 rounded sm:w-fit sm:text-lg mx-auto">
                    <div>{error}</div>
                  </div>
                )}
              </form>
            }
          </section>
        </div>
      )}
    </>
  );
}
