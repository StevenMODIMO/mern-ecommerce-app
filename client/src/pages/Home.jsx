import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { TbBusinessplan } from "react-icons/tb";
import { BiPurchaseTag } from "react-icons/bi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbJewishStar } from "react-icons/tb";
import { BsFillBuildingsFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Rates from "../components/Rates";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const sendBusinessPage = () => navigate("/register-business");
  const [products, setProducts] = useState([]);

  const registerBuyer = async () => {
    const response = await fetch("http://localhost:5000/api/app/buyer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      const ls = localStorage.getItem("user");
      const value = JSON.parse(ls);
      value.role = json;
      const updated = JSON.stringify(value);
      localStorage.setItem("user", updated);
      setCurrentUser(value);
      navigate("/");
    }

    if (!response.ok) {
      console.log(json.error);
    }
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/api/app", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="mt-24">
      {currentUser.role === "None" && (
        <>
          <section className="sm:w-full flex justify-center">
          <div className="flex flex-col items-center shadow-xl p-2 mx-4 rounded border-t-2 border-black sm:w-96 h-60 justify-center mx-auto">
            <header className="text-2xl underline text-center">
              Choose A Role
            </header>
            <main className="w-screen">
              <div
                onClick={registerBuyer}
                className="flex gap-3 justify-center bg-yellow-400 text-black mx-auto rounded p-3 m-1 text-center cursor-pointer w-72 md:w-80"
              >
                <BiPurchaseTag /> I Want To Buy
              </div>
              <div
                onClick={sendBusinessPage}
                className="flex gap-3 justify-center bg-yellow-400 text-black mx-auto rounded p-3 m-1 text-center cursor-pointer w-72 md:w-80"
              >
                <TbBusinessplan /> I want To Sell
              </div>
            </main>
          </div>
          </section>
        </>
      )}
      {currentUser.role === "Buyer" && (
        <>
          <div className="md:grid grid-cols-2 lg:grid-cols-4">
            {products.map((prod) => {
              return (
                <main
                  key={prod._id}
                  className="text-xs shadow drop-shadow-2xl mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0"
                >
                  <img
                    className="w-36"
                    src={`http://localhost:5000/${prod.imagePath}`}
                    alt={prod.imagePath}
                  />
                  <div className="text-xl">{prod.product_name}</div>
                  <section className="flex gap-1">
                    <div className="text-xl">
                      {prod.currency === "dollar"
                        ? "$"
                        : prod.currency == "pound"
                        ? "£"
                        : prod.currency == "euro"
                        ? "€"
                        : ""}
                    </div>
                    <div className="text-lg">{prod.price}</div>
                  </section>
                  <section className="flex gap-1 bg-gray-800/10 p-1 rounded mt-2 w-fit">
                    <BsFillBuildingsFill className="mt-1" />
                    <div className="text-sm">By {prod.from}</div>
                  </section>
                  <section className="bg-gray-900/10 mt-2 rounded p-1">
                    <div className="underline text-lg">Info:</div>
                    <div>{prod.description}</div>
                  </section>
                  <div className="bg-gray-800/10 p-1 rounded mt-2">
                    id: {prod._id}
                  </div>
                  <div></div>
                  <div className="text-xl"></div>
                  <section className="flex justify-between mt-2">
                    <div className="flex text-lg gap-1 p-1 bg-green-400 rounded">
                      <MdOutlineAddShoppingCart className="mt-1" />
                      <NavLink to={`/order/${prod._id}`}>Add</NavLink>
                    </div>
                    <div className="flex text-lg gap-1 p-1 bg-green-400 rounded">
                      <TbJewishStar className="mt-1" />
                      <NavLink to={`/wishlist/${prod._id}`}>Wishlist</NavLink>
                    </div>
                  </section>
                  <div>
                    <Rates rates={prod.rates} />
                  </div>
                </main>
              );
            })}
          </div>
        </>
      )}

      {currentUser.role === "Seller" && <Navigate to="/dashboard" />}
    </div>
  );
}
