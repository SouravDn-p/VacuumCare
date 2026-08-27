"use client";

import { useState } from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsContainer from "./ProductsContainer";

export default function ProductsDashboard() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="prod-page">
      <ProductsHeader onAdd={() => setShowCreate(true)} />
      <ProductsContainer
        showCreate={showCreate}
        onShowCreateChange={setShowCreate}
      />
    </div>
  );
}
