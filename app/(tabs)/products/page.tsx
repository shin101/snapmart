import db from "@/lib/db";
import { ProductPage } from "@/components/product-page";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { unstable_cache } from "next/cache";
import { Header } from "@/components/header";

const getCachedProducts = unstable_cache(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // uncomment below to enable infinite scroll
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getCachedProducts();
  return (
    <div>
      <Header />

      <ProductPage initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-purple-300 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-purple-200"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
