import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message"
import Loader from "../components/Loader"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(false);
      setLoading(true);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/");
    }

    setLoading(false);
  };


  return (
    <div className="shadow-xl rounded border-t-2 border-black py-2 px-2 mx-4  sm:w-96 mx-auto mt-10">
      {error && <Message text={error} />}
      <header className="text-center m-2 underline lg:mt-12">Login To Countinue</header>
      <form
        onSubmit={handleSubmission}
        onFocus={() => setError(null)}
        className="flex flex-col items-center justify-center gap-3  p-1 m-1 rounded h-80 "
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-yellow-400 outline-none rounded p-1 text-lg w-80"
          placeholder="email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-yellow-400 outline-none rounded p-1 text-lg w-80"
          placeholder="password"
        />
        {loading ? <Loader /> :<button disabled={loading} className=" p-1 rounded bg-yellow-500">
          Login
        </button>}
      </form>
    </div>
  );
}
