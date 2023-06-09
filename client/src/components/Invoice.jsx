import { FaTimes } from "react-icons/fa";

export default function Invoice({ orders, setModel }) {
  const closeModel = () => setModel(false);
  return (
    <div className="absolute top-0 z-10 overflow-auto left-0 w-full h-full bg-black bg-opacity-75">
      <div onClick={closeModel}>
        <FaTimes />
      </div>
      <div>Invoice Model</div>{" "}
      <div className="my-10 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4 text-sm">
        {orders.map((order) => {
          return (
            <div key={order._id} className="shadow-xl h-fit">
              <div className="bg-gray-100">
                <img
                  className="w-36 mx-auto"
                  src={`http://localhost:5000/${order.imagePath}`}
                  alt={order.imagePath}
                />
              </div>
              <section className="text-sm">
                <div className="text-2xl text-yellow-500">
                  {order.product_name}
                </div>
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
                  <div>Status: {order.shipped == false && "Not Shipped"}</div>
                  <div>From: {order.from}</div>
                  <div>Address: {order.address}</div>
                </div>
                <div className="text-xs">Order Id: {order._id}</div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}
