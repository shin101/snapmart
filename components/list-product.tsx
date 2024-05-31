import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div>
        <Image width={200} height={200} src={photo} alt={title}></Image>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">{created_at.toString()}</span>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </Link>
  );
}

export default ListProduct;
