import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AiFillFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { MdOutlineSend } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Rates from "../components/Rates";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaFileInvoice, FaTrash } from "react-icons/fa";
import { TfiViewListAlt } from "react-icons/tfi";
import { BiBorderAll } from "react-icons/bi";
import Invoice from "../components/Invoice";

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [product_name, setProduct_Name] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("Select an option");
  const [category, setCategory] = useState("");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [model, setModel] = useState(false);
  const [text, setText] = useState(false);
  const [expandedProductIds, setExpandedProductIds] = useState([]);

  const toggleProductExpansion = (productId) => {
    if (expandedProductIds.includes(productId)) {
      setExpandedProductIds(
        expandedProductIds.filter((id) => id !== productId)
      );
    } else {
      setExpandedProductIds([...expandedProductIds, productId]);
    }
  };

  const handleTabs = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/api/app/products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setProducts(json.products);
        setRates(json.rates);
      }

      if (!response.ok) {
        console.log(json.error);
      }
    };
    getProducts();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("product_name", product_name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("currency", currency);
    formData.append("category", category);

    const response = await fetch("http://localhost:5000/api/app/new-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setProduct_Name("");
      setDescription("");
      setPrice("");
      setCurrency("");
      setCategory("");
      setQuantity("");
      setImage("");
    }

    setLoading(false);
  };

  useEffect(() => {});

  const deleteProduct = async (id) => {
    setLoading(true);
    await fetch(`http://localhost:5000/api/app/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const newProducts = products.filter((product) => product._id !== id);
    setProducts(newProducts);
    setLoading(false);
  };

  const getInvoice = async () => {
    const response = await fetch(
      "http://localhost:5000/api/app/seller-invoice",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setOrders(json);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <div>
      <main className="flex flex-col gap-0 sm:grid grid-cols-2 lg:grid-cols-4">
        <section
          onClick={() => handleTabs(0)}
          className="cursor-pointer flex gap-2 text-lg bg-yellow-400 p-1"
        >
          <TfiViewListAlt className="mt-1" />
          <div>Your Products</div>
        </section>
        <section
          onClick={() => handleTabs(1)}
          className="cursor-pointer flex gap-2 text-lg bg-yellow-400 p-1"
        >
          <AiOutlineFolderAdd className="mt-1" />
          <div>New Product</div>
        </section>
        <section
          onClick={() => handleTabs(2)}
          className="cursor-pointer flex gap-2 text-lg bg-yellow-400 p-1"
        >
          <BiBorderAll className="mt-1" />
          <div>Orders</div>
        </section>
        <section
          onClick={() => setModel(true)}
          className="cursor-pointer flex gap-2 text-lg bg-yellow-400 p-1"
        >
          <FaFileInvoice className="mt-1" />
          <div>Invoices</div>
        </section>
      </main>
      <section>
        {model && <Invoice orders={orders} setModel={setModel} />}
      </section>
      {activeTab === 0 && (
        <main>
          <div className="my-10 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const productRates = rates.filter(
                (rate) => rate.product_id === product._id
              );
              const isExpanded = expandedProductIds.includes(product._id);
              return (
                <div key={product._id} className="shadow-xl h-fit">
                  <div className="bg-gray-100">
                    <img
                      className="w-36 mx-auto"
                      src={`http://localhost:5000/${product.imagePath}`}
                      alt={product.imagePath}
                    />
                  </div>
                  <div className="text-yellow-500">{product.product_name}</div>
                  <main className="my-2">
                    <section>
                      <div className="px-2">Quantity: {product.quantity}</div>
                      <section className="px-2">
                        <div>
                          {isExpanded
                            ? product.description
                            : product.description.length > 100
                            ? product.description.slice(0, 100) + "..."
                            : product.description}
                        </div>
                        {product.description.length > 100 && (
                          <div className="ml-48"
                            onClick={() => toggleProductExpansion(product._id)}
                          >
                            <button className="bg-yellow-300 px-1 h-fit w-fit rounded">
                              {isExpanded ? "less" : "more"}
                            </button>
                          </div>
                        )}
                      </section>
                      <div className="text-sm px-2">Id: {product._id}</div>
                    </section>
                    <div className="flex justify-between px-2">
                      <section className="flex">
                        <div>
                          {product.currency === "dollar"
                            ? "$"
                            : product.currency == "pound"
                            ? "£"
                            : product.currency == "euro"
                            ? "€"
                            : ""}
                        </div>
                        <div>{product.price}</div>
                      </section>
                      <Rates rates={productRates} />
                    </div>
                  </main>
                  {loading ? (
                    <div className="flex justify-center p-1 m-1">
                      <Loader />
                    </div>
                  ) : (
                    <section className="bg-red-400 w-fit p-1 m-1 rounded mx-auto">
                      <button
                        className="flex gap-1"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <FaTrash className="mt-1" /> Remove
                      </button>
                    </section>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      )}

      {activeTab === 2 && (
        <main>
          <h1 className="text-center underline text-lg">Your Orders</h1>
          <div  className="my-10 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4 text-sm">
            {orders.map((order) => {
              return (
                <div
                  key={order._id}
                  className="shadow-xl h-fit"
                >
                  <div className="bg-gray-100">
                    <img
                      className="w-36 mx-auto"
                      src={`http://localhost:5000/${order.imagePath}`}
                      alt={order.imagePath}
                    />
                  </div>
                  <section className="text-sm">
                    <div className="text-2xl text-yellow-500">{order.product_name}</div>
                    <div>Quantity ordered: {order.quantity}</div>
                    <section className="flex gap-1">
                      <div className="text-xl">
                        {order.currency === "dollar"
                          ? "Total: $"
                          : order.currency == "pound"
                          ? "Total: £"
                          : order.currency == "euro"
                          ? "Total: €"
                          : ""}
                      </div>
                      <div className="text-lg">{order.price * order.quantity}</div>
                    </section>
                  </section>
                  <section>
                    <div>
                      <div>
                        Status: {order.shipped == false && "Not Shipped"}
                      </div>
                      <div>From: {order.from}</div>
                      <div>Address: {order.address}</div>
                    </div>
                    <div className="text-xs">
                      Order Id: {order._id}
                    </div>
                  </section>
                  <div className="bg-green-600 p-1 rounded text-center w-fit mx-auto my-2">
                    <button>Complete Order</button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {activeTab === 1 && (
        <main>
          {error && <Message text={error} />}
          <header>
            <div className="text-center">New Product</div>
          </header>
          <section className="md:flex justify-center">
            <form
              className="flex flex-col rounded text-lg border-t-2 border-black  mx-2 px-2 py-2 shadow-xl bg-white  md:w-80 px-4 mx-4 lg:w-96"
              onSubmit={handleSubmission}
              onFocus={() => setError(null)}
            >
              <label
                htmlFor="fileInput"
                className=" mt-3 cursor-pointer gap-1 bg-yellow-500 rounded p-1"
              >
                <input
                  id="fileInput"
                  className="hidden"
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {!image ? (
                  <div className="flex justify-center">
                    <AiFillFileAdd className=" text-2xl lg:text-3xl" />
                    <span>Upload Image</span>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <TiTick className=" text-2xl lg:text-3xl" />
                    <span>Image Uploaded</span>
                  </div>
                )}
              </label>

              <label className="mt-3">Product Name</label>
              <input
                className="border-2 border-yellow-500 outline-none p-1 rounded"
                type="text"
                value={product_name}
                onChange={(e) => setProduct_Name(e.target.value)}
                placeholder="e.g Dell Desktop"
              />
              <label>Description</label>
              <textarea
                className="border-2 border-yellow-500 outline-none  p-1 h-24 rounded"
                placeholder="separate by comma e.g Ram 4GB, intel core i9, 500GB, Nvidia graphics"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label className="mt-3">Price</label>
              <input
                className="border-2 border-yellow-500 outline-none p-1 rounded"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g 5000"
              />
              <label className="mt-3">Quantity</label>
              <input
                className="border-2 border-yellow-500 outline-none p-1 rounded"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g 4"
              />
              <label className="mx-auto mt-3">Choose currency:</label>
              <select
                className="border-2 border-yellow-500 p-1 outline-none w-40 mx-auto rounded"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option className="text-sm">Choose....</option>
                <option className="text-sm" value="dollar">
                  dollar
                </option>
                <option className="text-sm" value="pound">
                  pound
                </option>
                <option className="text-sm" value="euro">
                  euro
                </option>
              </select>
              <label className="mx-auto mt-3">Select Category:</label>
              <select
                className="border-2 border-yellow-500 p-1 outline-none w-40 mx-auto rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="text-sm">Choose....</option>
                <option className="text-sm" value="desktop computer">
                  Desktop Computer
                </option>
                <option className="text-sm" value="laptop">
                  Laptop
                </option>
                <option className="text-sm" value="camera">
                  Camera
                </option>
                <option className="text-sm" value="ram">
                  Ram
                </option>
              </select>
              {loading ? (
                <Loader />
              ) : (
                <main className="flex justify-center mt-3 gap-1 bg-yellow-500 p-1 rounded">
                  <MdOutlineSend className=" text-2xl" />
                  <button>Submit</button>
                </main>
              )}
            </form>
          </section>
        </main>
      )}
    </div>
  );
}
