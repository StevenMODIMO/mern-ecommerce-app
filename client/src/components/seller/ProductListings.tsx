import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListings() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  // Logging everything you might want to inspect
  console.log("Loading:", isLoading);
  console.log("Error state:", isError);
  console.log("Error object:", error);
  console.log("Products data:", data);

  // Do not render anything specific
  return <div>ProductListings</div>;
}
