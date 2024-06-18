import db from "@/lib/db";
import { getSession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import { formatToUSD } from "@/lib/utils";
import { ProductDeleteButton } from "../delete-button";
import { revalidateTag, unstable_cache } from "next/cache";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

const getCachedProduct = unstable_cache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});

async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  return product;
}

const getCachedProductTitle = unstable_cache(
  getProductTitle,
  ["product-title"],
  { tags: ["product-title"] }
);

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getCachedProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  const revalidate = async () => {
    "use server";
    revalidateTag("product-title");
  };

  const createChatRoom = async () => {
    "use server";
    const session = await getSession();
    const room = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            // ID of seller
            { id: product.userId },
            // ID of buyer
            { id: session.id },
          ],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
  };

  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          className="object-cover"
          src={`${product.photo}/public`}
          alt={product.title}
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-600">
        <div className="size-10 rounded-full overflow-hidden">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-gradient-to-tr from-pink-100 via-white to-purple-200 border border-t-purple-400 flex justify-between items-center">
        <span className="font semi-bold text-xl">
          ${formatToUSD(product.price)}
        </span>
        <div className="flex gap-3">
          <form action={createChatRoom}>
            <button className="bg-purple-400 px-5 py-2.5 rounded-md text-white font-semibold">
              Chat
            </button>
          </form>
          {isOwner ? <ProductDeleteButton id={product.id} /> : null}
        </div>
      </div>
    </div>
  );
}
