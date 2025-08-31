import React, { Suspense } from "react";
import SearchClient from "../components/SearchClient";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading search...</p>}>
      <SearchClient />
    </Suspense>
  );
}
