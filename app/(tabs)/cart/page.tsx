"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getMyCart, removeItem } from "./actions";
import { useEffect, useState } from "react";

type MyItemsType = {
  id: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    photo: string;
    created_at: Date;
    updated_at: Date;
    userId: number;
    cartId: number | null;
  }[];
} | null;

type ProductType =
  | {
      id: number;
      title: string;
      price: number;
      description: string;
      photo: string;
      created_at: Date;
      updated_at: Date;
      userId: number;
      cartId: number | null;
    }[]
  | null;

const handleRemove = async () => {
  await removeItem();
};

const Cart = () => {
  const [myItems, setMyItems] = useState<MyItemsType>(null);
  const [products, setProducts] = useState<ProductType>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyCart();
      setMyItems(res);
      if (res && res.product) {
        setProducts(res.product);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {myItems ? (
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={product.id}
                  >
                    <td className="p-4">
                      <Image
                        src={`${product.photo}/avatar`}
                        width={128}
                        height={128}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1"
                            required
                          />
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={handleRemove}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Payment options */}
          <div className="p-4">
            <button
              type="button"
              className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2 -ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="bitcoin"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"
                ></path>
              </svg>
              Pay with Bitcoin
            </button>
            <button
              type="button"
              className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2 -ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="stripe"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M244.4 196.2v45.3c-20.8-10.3-46.5-15.8-70.5-15.8-58.8 0-98.1 31.2-98.1 75.5 0 49.2 41.2 74.7 95.4 74.7 23.9 0 50.7-4.9 73.5-16v45.5c-21.8 5.5-46.1 8.3-68.9 8.3-91.6 0-147.1-42.4-147.1-115.4 0-70.4 55.2-118.5 147.1-118.5 22.8 0 47.1 2.7 68.6 7.9zm45.3 134.8h-.6c-14.8 0-24.6-10.3-24.6-27.8V171.4h48.1v131.8c0 17.5-9.8 27.8-23 27.8zm195.3-112.3c0-50.5-37.1-88.4-90.1-88.4-26.7 0-51.4 7.3-71.1 20.1-10.3 6.7-18.4 15.1-23.3 25.2l-.5-.2c.7-3 .9-6.4.9-9.9V81.4h-48.1v265.4h48.1v-20.6c5 9.6 12.6 17.5 22.9 23.6 19.6 11.8 44.8 17.8 71.1 17.8 52.5 0 90.1-34.7 90.1-88.6zm-48.1-8.2c0 29.8-21.2 50.8-53.1 50.8-31.8 0-54-21-54-50.8 0-29.8 22.1-51.2 54-51.2 32 0 53.1 21.4 53.1 51.2zm-149.9 49c0 13.3 8.4 22.1 21.8 22.1 15.3 0 25-10.6 25-26.9V232c0-16.4-9.8-26.9-25-26.9-13.4 0-21.8 8.8-21.8 22.1v113.6zM53 298.8c0 13.5 8.4 22.3 21.8 22.3 15.3 0 25-10.7 25-27V232c0-16.4-9.8-26.9-25-26.9-13.4 0-21.8 8.8-21.8 22.1v113.6z"
                ></path>
              </svg>
              Pay with Stripe
            </button>
            <button
              type="button"
              className="text-white bg-[#191919] hover:bg-[#191919]/90 focus:ring-4 focus:outline-none focus:ring-[#191919]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2 -ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="paypal"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M377 120c-12 56-55 88-105 88H231a8 8 0 0 0-8 6.6l-17 113-4 22a8 8 0 0 1-8 6.6h-56c-5 0-9-4-8-9l23-147c1-5 5-9 10-9h41c4 0 7-3 8-7l4-20c1-6-3-11-9-11H121a8 8 0 0 1-8-9l7-47c1-5 5-8 10-8h41c4 0 7-3 8-7l4-19c1-6-3-11-9-11H98a8 8 0 0 1-8-9l8-47c1-5 5-8 10-8h55c4 0 7-3 8-7l4-19c1-6-3-11-9-11H84a8 8 0 0 1-8-9l3-19c1-5 5-8 10-8h54c6 0 11-4 13-9 19-59 73-96 144-96 23 0 47 4 68 10 25 7 45 18 60 34 14 14 21 32 20 52v.4c0 21-3 42-8 64z"
                ></path>
              </svg>
              Pay with Paypal
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-svh">
          <div className="bg-purple-50 rounded-full h-96 w-96 flex flex-col justify-center items-center">
            <ShoppingCartIcon className="h-60 w-60" />
            <div>Your cart is empty.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
