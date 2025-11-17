import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import ProductListings from "@/components/seller/ProductListings";
import NewProduct from "@/components/seller/NewProduct";
import Orders from "@/components/seller/Orders";
import Invoices from "@/components/seller/Invoices";

import { Table, CirclePlus, Logs, ReceiptText } from "lucide-react";

export default function Dashboard() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/login");
      return;
    }

    if (!state.user.account_completed) {
      navigate("/account-setup");
      return;
    }

    if (state.user.role !== "seller") {
      navigate("/products");
    }
  }, [state.user, navigate]);

  if (
    !state.user ||
    !state.user.account_completed ||
    state.user.role !== "seller"
  ) {
    return null;
  }

  return (
    <div>
      <Tabs defaultValue="products" className="md:w-[50%] mt-6">
        <TabsList className="w-full lg:w-fit">
          <TabsTrigger
            className="data-[state=active]:text-[#737373] focus-visible:ring-0 focus-visible:outline-none border-0"
            value="products"
          >
            <Table />
            <span className="hidden sm:block">Products</span>
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-[#737373] focus-visible:ring-0 focus-visible:outline-none border-0"
            value="new-product"
          >
            <CirclePlus />
            <span className="hidden sm:block">Add</span>
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-[#737373] focus-visible:ring-0 focus-visible:outline-none border-0"
            value="orders"
          >
            <Logs />
            <span className="hidden sm:block">Orders</span>
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-[#737373] focus-visible:ring-0 focus-visible:outline-none border-0"
            value="invoices"
          >
            <ReceiptText />
            <span className="hidden sm:block">Invoices</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductListings />
        </TabsContent>
        <TabsContent value="new-product">
          <NewProduct />
        </TabsContent>
        <TabsContent value="orders">
          <Orders />
        </TabsContent>
        <TabsContent value="invoices">
          <Invoices />
        </TabsContent>
      </Tabs>
    </div>
  );
}
