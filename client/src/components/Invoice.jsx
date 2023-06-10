import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import Backdrop from "./Backdrop";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  info: {
    marginTop: 40,
  },
  title: {
    marginTop: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    backgroundColor: "yellow",
    fontSize: 10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  w1: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "30%",
    borderColor: "black",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 4,
  },
  w2: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "10%",
    borderRightColor: "black",
    borderRightWidth: 1,
    padding: 4,
  },
  w3: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "10%",
    borderRightColor: "black",
    borderRightWidth: 1,
    padding: 4,
  },
  w4: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "10%",
    borderRightColor: "black",
    borderRightWidth: 1,
    padding: 4,
  },
  cons: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 10,
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  footer: {
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  pdf: {
    marginLeft: "auto",
    marginRight: "auto",
  }
});

export default function Invoice({ orders, setModel }) {
  const closeModel = () => setModel(false);
  const { user } = useAuth();
  const total = 0;
  return (
    <Backdrop close={closeModel}>
      <div className="flex justify-end m-3 text-yellow-600">
        <div onClick={closeModel}>
          <FaTimes />
        </div>
      </div>
      {orders.length == 0 ? (
        <div className="w-full h-96 flex justify-center items-center text-yellow-500 text-lg lg:text-2xl">
          <h1>You dont have any invoices</h1>
        </div>
      ) : (
        <PDFViewer width="800" height="700" style={styles.pdf}>
          <Document>
            <Page size="A4">
              <View style={styles.header}>
                <Text>mernEcommerce</Text>
              </View>
              <View style={styles.info}>
                <Text>Bill to: {user.email}</Text>
                <Text>Date: 11/2/2023</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.w1}>Product Name</Text>
                <Text style={styles.w2}>Qty</Text>
                <Text style={styles.w3}>@</Text>
                <Text style={styles.w4}>Total</Text>
              </View>
              {orders.map((order) => {
                const t = [order.price * order.quantity];
                console.log(t);
                return (
                  <View key={order._id} style={styles.cons}>
                    <Text style={styles.w1}>{order.product_name}</Text>
                    <Text style={styles.w2}>{order.quantity}</Text>
                    <Text style={styles.w3}>{order.price}</Text>
                    <Text style={styles.w4}>
                      {order.price * order.quantity}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.footer}>
                <Text>Thank You for shopping with us.</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </Backdrop>
  );
}

{
  /**

       
        <section className="flex gap-1 mx-auto">
            <div className="text-lg text-yellow-500 ml-2">
              mern<span className="text-xl">Ecommerce</span>
            </div>
            <BsFillBagFill className="text-sm text-yellow-600 mt-2" />
          </section>


      <div className="my-10 mx-10 text-sm flex flex-col gap-10 sm:grid grid-cols-2 lg:grid-cols-4 text-sm">
        {orders.map((order) => {
          return (
            <div key={order._id} className="shadow-xl h-fit">
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
      </div> */
}
