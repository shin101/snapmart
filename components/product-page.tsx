"use client";

import React, { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { InitialProducts } from "@/app/(tabs)/products/page";
import getMoreProducts from "@/app/(tabs)/products/actions";

interface ProductPageProps {
  initialProducts: InitialProducts;
}

export const ProductPage = ({ initialProducts }: ProductPageProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);

          console.log(">>>", newProducts);

          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}

      {/* uncomment to enable infinite scroll functionality below */}

      {!isLastPage ? (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-gradient-to-tr from-pink-100 via-white to-purple-200 border border-purple-400 rounded-md w-fit mx-auto px-3 "
        >
          {isLoading ? "Loading..." : "Load more"}
        </span>
      ) : null}
    </div>
  );
};
