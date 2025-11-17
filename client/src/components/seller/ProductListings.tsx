import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Pencil, Trash2 } from "lucide-react";

// 1. Define the Product type
interface Product {
  _id: string;
  image_url: string;
  name: string;
  price: number;
  quantity: number;
  seller: string;
  seller_name: string;
  rates: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ProductListings() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {
    state: { user },
  } = useAuthContext();

  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/api/products/seller/${user?._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  return (
    <div>
      <Table className="md:w-full">
        <TableCaption>A list of your products in the store</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Added on</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7}>
                <Skeleton className="h-10 w-full" />
              </TableCell>
            </TableRow>
          )}

          {isError && (
            <TableRow>
              <TableCell colSpan={7} className="text-red-500">
                Failed to load products: {error?.message}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && data?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No products yet.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            data?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  {new Date(product.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(product.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price}</TableCell>

                <TableCell>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover border"
                  />
                </TableCell>

                <TableCell className="flex items-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => console.log("Edit", product._id)}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => console.log("Delete", product._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
