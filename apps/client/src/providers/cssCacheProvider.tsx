import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const emotionCache = createCache({
  key: "emotion-css-cache",
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

interface CssCacheProviderProps {
  children: React.ReactNode;
}

export default function CssCacheProvider({ children }: CssCacheProviderProps) {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
