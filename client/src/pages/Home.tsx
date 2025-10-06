import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { TbBusinessplan } from "react-icons/tb";
import { BiPurchaseTag, BiDownArrow } from "react-icons/bi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsFillBuildingsFill, BsFillStarFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Rates from "../components/Rates";
import Loader from "../components/Loader";
import { HiTemplate } from "react-icons/hi";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const sendBusinessPage = () => navigate("/register-business");
  const [products, setProducts] = useState([]);
  const [expandedProductIds, setExpandedProductIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleProductExpansion = (productId) => {
    if (expandedProductIds.includes(productId)) {
      setExpandedProductIds(
        expandedProductIds.filter((id) => id !== productId)
      );
    } else {
      setExpandedProductIds([...expandedProductIds, productId]);
    }
  };

  const registerBuyer = async () => {
    const response = await fetch("https://mern-ecommerce-rhpa.onrender.com/api/app/buyer", {
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
    const getProducts = async (category) => {
      setLoading(true);
      const response = await fetch(
        `https://mern-ecommerce-rhpa.onrender.com/api/app`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
      setLoading(false);
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
          <section>
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader />
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="mt-5 sm:mt-20">
                    <div className="flex justify-center">
                      <HiTemplate className="text-9xl text-yellow-300" />
                    </div>
                    <h1 className="text-lg text-center">
                      Sorry the store is empty
                    </h1>
                  </div>
                ) : (
                  <div className="my-5 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4">
                    {products.map((prod) => {
                      const isExpanded = expandedProductIds.includes(prod._id);
                      return (
                        <main key={prod._id} className="shadow-xl h-fit">
                          <section className="flex justify-between my-3 bg-gray-200">
                            <div className="flex text-2xl gap-1 p-1 text-yellow-500 rounded">
                              <NavLink to={`/order/${prod._id}`}>
                                {" "}
                                <MdOutlineAddShoppingCart />
                              </NavLink>
                            </div>
                            <div className="flex text-2xl gap-1 p-1 text-yellow-500 rounded">
                              <NavLink to={`/wishlist/${prod._id}`}>
                                <BsFillStarFill />
                              </NavLink>
                            </div>
                          </section>
                          <div className="bg-gray-100">
                            <img
                              className="w-36 mx-auto"
                              src={`https://mern-ecommerce-rhpa.onrender.com/${prod.imagePath}`}
                              alt={prod.imagePath}
                            />
                          </div>
                          <div className="text-yellow-500 text-lg">
                            {prod.product_name}
                          </div>
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
                          <section className="px-2 m-2">
                            <div>
                              {isExpanded
                                ? prod.description
                                : prod.description.length > 100
                                  ? prod.description.slice(0, 100) + "..."
                                  : prod.description}
                            </div>
                            {prod.description.length > 100 && (
                              <div
                                className="ml-48"
                                onClick={() => toggleProductExpansion(prod._id)}
                              >
                                <button className="bg-yellow-500 px-1 h-fit w-fit rounded">
                                  {isExpanded ? "less" : "more"}
                                </button>
                              </div>
                            )}
                          </section>
                          <div className="bg-gray-30 w-fit text-xs p-1 rounded mt-2">
                            Id: {prod._id}
                          </div>
                          <div></div>
                          <div className="text-xl"></div>
                          <div className="flex justify-end m-3">
                            <Rates rates={prod.rates} />
                          </div>
                        </main>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </section>
        </>
      )}

      {currentUser.role === "Seller" && <Navigate to="/dashboard" />}
    </div>
  );
}
