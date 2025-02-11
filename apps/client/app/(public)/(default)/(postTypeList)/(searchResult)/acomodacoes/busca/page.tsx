import Search from "@/components/search/Search";
import { Suspense } from "react";

export default function ResultadoDaBusca() {
  return (
    <>
      <Suspense>
        <Search />
      </Suspense>
    </>
  );
}
