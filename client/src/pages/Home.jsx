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
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const sendBusinessPage = () => navigate("/register-business");
  const [products, setProducts] = useState([]);
  const [expandedProductIds, setExpandedProductIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [show, setShow] = useState(false);

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
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/app`,
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

  const toggle = (cat) => {
    setCategory(cat);
    setShow(false);
  };

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
            <header className="bg-yellow-500 -mt-20 mb-5 rounded border-2 border-yellow-500 w-fit cursor-pointer flex mx-auto text-xl">
              <div className="bg-yellow-500 px-1 border-r border-black">
                Sort
              </div>
              <div
                className="flex bg-yellow-300 px-1"
                onClick={() => setShow(!show)}
              >
                <h1>{category}</h1>
                <BiDownArrow className="mt-1" />
              </div>
            </header>
            <motion.ul
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8 }}
              className={
                show
                  ? "text-lg bg-yellow-200 w-44 rounded absolute left-16 top-32 ml-3 mt-2 cursor-pointer sm:left-56 md:left-72 lg:left-1/3 lg:ml-32 lg:mt-5"
                  : "hidden"
              }
            >
              <li
                className="p-2 rounded hover:bg-yellow-400"
                onClick={() => toggle("all")}
              >
                all
              </li>
              <li
                className="p-2 rounded hover:bg-yellow-400"
                onClick={() => toggle("computer")}
              >
                computer
              </li>
              <li
                className="p-2 rounded hover:bg-yellow-400"
                onClick={() => toggle("ram")}
              >
                ram
              </li>
              <li
                className="p-2 rounded hover:bg-yellow-400"
                onClick={() => toggle("laptop")}
              >
                laptop
              </li>
              <li
                className="p-2 rounded hover:bg-yellow-400"
                onClick={() => toggle("camera")}
              >
                camera
              </li>
              <li
                className="p-2 rounded hover:bg-yellow-400"
                onClick={() => toggle("other")}
              >
                other
              </li>
            </motion.ul>
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
                              src={`http://localhost:5000/${prod.imagePath}`}
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
