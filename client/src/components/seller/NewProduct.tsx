import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { useAuthContext } from "@/hooks/useAuthContext";

import { useMutation } from "@tanstack/react-query";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    state: { user },
  } = useAuthContext();

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", String(Number(price)));
      formData.append("quantity", String(Number(quantity)));
      if (image) formData.append("image", image);
      formData.append("seller", user?._id ?? "");
      formData.append("seller_name", user?.display_name ?? "");

      const response = await fetch(`${BASE_URL}/api/products/new`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("Success:", data);
      setName("");
      setPrice("");
      setQuantity("");
      setImage(null);
    },
    onError: (err) => {
      console.error("Error:", err);
      setName("");
      setPrice("");
      setQuantity("");
      setImage(null);
    },
  });

  const addProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#737373]">Add product to store</CardTitle>
          <CardDescription>
            To add a new product to your store, fill out the necessary details
            such as name, price, quantity, image and description. Ensure all
            fields are completed before submitting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onFocus={() => mutation.reset()}
            onSubmit={addProduct}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                type="file"
                id="image"
                className="mt-1 text-[#737373]"
                name="image"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 text-[#737373] text-sm"
                placeholder="Gaming console"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 text-[#737373] text-sm"
                placeholder="499.99"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 text-[#737373] text-sm"
                placeholder="50"
              />
            </div>
            <Button type="submit" className="w-fit mx-auto">
              {!mutation.isPending ? (
                <span>Add product</span>
              ) : (
                <span className="border-4 border-t-transparent p-2 rounded-full animate-spin"></span>
              )}
            </Button>
          </form>
          {mutation.error && (
            <Alert className="mt-2 mx-auto w-fit" variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{mutation.error.message}</AlertTitle>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
