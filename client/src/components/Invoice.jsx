import { FaTimes } from "react-icons/fa"

export default function Invoice({orders, setModel}) {
    const closeModel = () => setModel(false)
    return(
        <div className="absolute top-0 z-10 overflow-auto left-0 w-full h-full bg-black bg-opacity-75">
            <div onClick={closeModel}><FaTimes /></div>
            <div>Invoice Model</div> <div className="md:grid grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {orders.map((order) => {
            return (
              <div
                key={order._id}
                className="shadow mx-10 my-5 p-4 md:w-72 lg:w-64 lg:mx-0"
              >
                <img
                  className="w-36"
                  src={`http://localhost:5000/${order.imagePath}`}
                  alt={order.imagePath}
                />
                <section className="text-sm ml-2">
                  <div className="text-2xl">{order.product_name}</div>
                  <div>Quantity: {order.quantity}</div>
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
                  <div className="bg-gray-800/10 p-1 rounded mt-2">
                    {order._id}
                  </div>
                </section>
                <section className="text-lg">
                  <h1>Order Info</h1>
                  <div>
                    <div>From: {order.from}</div>
                    <div>Shipped: {order.shipped == false && "Not Shipped"}</div>
                    <div>Address: {order.address}</div>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
        </div>
    )
}