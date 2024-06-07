"use client";

import React, { useState } from "react";
import ListProduct from "./list-product";
import { InitialProducts } from "@/app/(tabs)/products/page";
import Button from "./button";
import getMoreProducts from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreProducts = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <button
        onClick={loadMoreProducts}
        disabled={isLoading}
        className="text-sm font-semibold bg-gradient-to-tr from-pink-100 via-white to-purple-200 border border-t-purple-400 w-fit mx-auto px-3 "
      >
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};
