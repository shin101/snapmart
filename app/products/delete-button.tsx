"use client";
import { deleteProduct } from "./delete-action";

interface Props {
  id: number;
}

export const ProductDeleteButton = ({ id }: Props) => {
  return (
    <button
      className="bg-red-400 px-5 py-2.5 rounded-full text-white font-semibold"
      onClick={() => deleteProduct(id)}
    >
      Delete Product
    </button>
  );
};
