import { useEffect,useState } from "react";

export function useClient() {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return { isClient };
}
