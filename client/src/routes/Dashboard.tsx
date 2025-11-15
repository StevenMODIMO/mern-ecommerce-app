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
      <Tabs defaultValue="products" className="">
        <TabsList className="w-full">
          <TabsTrigger value="products">
            <Table />
            <span className="hidden lg:block">Products</span>
          </TabsTrigger>
          <TabsTrigger value="new-product">
            <CirclePlus />
            <span className="hidden lg:block">Add</span>
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Logs />
            <span className="hidden lg:block">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <ReceiptText />
            <span className="hidden lg:block">Invoices</span>
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
      </Tabs>
    </div>
  );
}
