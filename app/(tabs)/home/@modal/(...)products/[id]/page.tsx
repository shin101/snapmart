// import db from "@/app/lib/db";
// import ModalCloseButton from "@/components/modal-close-button";
// import { PhotoIcon } from "@heroicons/react/24/solid";
// import Image from "next/image";

const Modal = async ({ params }: { params: { id: string } }) => {
//   async function getProductImg(id: number) {
//     const product = await db.product.findUnique({
//       where: {
//         id,
//       },
//     });
//     return product;
//   }

//   const img = await getProductImg(+params.id);
  

  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
      {/* <ModalCloseButton />
      {img ? (
        <>
          <Image
            src={`${img.photo}/public`}
            width={700}
            height={700}
            alt={img.title}
          />
        </>
      ) : (
        <div className="max-w-screen-sm  h-1/2 flex justify-center w-full">
          <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center">
            <PhotoIcon className="h-28" />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Modal;
