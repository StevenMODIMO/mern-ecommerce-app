import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../components/Loader";

export default function Business() {
  const [address, setAddress] = useState("");
  const [business_name, setBusinessName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://mern-ecommerce-rhpa.onrender.com/api/app/seller", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ business_name, address }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setAddress("");
      setBusinessName("");
    }

    if (response.ok) {
      setError(null);
      const ls = localStorage.getItem("user");
      const value = JSON.parse(ls);
      value.role = json;
      const updated = JSON.stringify(value);
      localStorage.setItem("user", updated);
      navigate("/dashboard");
    }

    setLoading(false);
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
    <div className="flex flex-col gap-10 shadow-2xl mt-10 mx-2 border-t-2 border-black sm:mx-36 lg:mx-96 h-96">
      <header className="flex flex-col items-center mt-10">
        <div
          className="bg-yellow-400 p-1 rounded text-black w-fit flex gap-3"
          onClick={() => navigate("/")}
        >
          <BiArrowBack className="mt-1" />
          <button>Go Back</button>
        </div>
        <div className="text-xl">Register Your Business Now</div>
      </header>
      <form
        onSubmit={handleSubmission}
        onFocus={() => setError(null)}
        className="flex flex-col items-center justify-center gap-3 p-1 m-1 rounded"
      >
        <input
          type="text"
          value={business_name}
          onChange={(e) => setBusinessName(e.target.value)}
          className="border-2 border-yellow-400 outline-none rounded p-1 text-lg sm:w-80"
          placeholder="business name"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border-2 border-yellow-400 outline-none rounded p-1 text-lg sm:w-80"
          placeholder="address"
        />
        <label className="text-sm flex gap-1 ml-0 sm:text-lg">
          <input
            type="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
          />
          <span className="bg-yellow-200 px-1">Use current location ?</span>
        </label>
        {loading ? (
          <Loader />
        ) : (
          <button className="bg-yellow-500 p-1 rounded">
            Register Business
          </button>
        )}
        {error && (
          <div className="text-lg bg-red-400 px-1 rounded">
            <div>{error}</div>
          </div>
        )}
      </form>
    </div>
  );
}
