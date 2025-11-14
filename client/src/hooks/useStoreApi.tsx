import { useState } from "react";

export default function useStoreApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return <div>useStoreApi</div>;
}
