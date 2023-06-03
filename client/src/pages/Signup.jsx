import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(false);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/");
    }
  };
  return (
    <div className="bg-gradient-to-t from-indigo-50 h-96">
      <header className="text-center m-2 underline">Register Now</header>
      <form
        onSubmit={handleSubmission}
        onFocus={() => setError(null)}
        className="flex flex-col items-center justify-center gap-3 p-1 m-1 rounded h-80"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-blue-200 outline-none rounded p-1"
          placeholder="email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-blue-200 outline-none rounded p-1"
          placeholder="password"
        />
        <button className="border-2 border-blue-200 p-1 rounded bg-blue-200">
          Register
        </button>
        {error && (
          <div className="bg-red-300 text-center text-base m-2 p-3 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
