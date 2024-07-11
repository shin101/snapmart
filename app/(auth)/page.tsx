import Link from "next/link";
import "../../lib/db";
import Image from "next/image";
import logo from "../../public/snapmart.png";
import feed from "../../public/feed.png";
import product from "../../public/product.png";
import chat from "../../public/chat.png";

export default function Home() {
  return (
    <div className="bg-custom-gradient h-screen">
      <div className="mx-auto overflow-hidden sm:h-screen sm:pb-32 lg:flex 2xl:max-w-7xl 2xl:overflow-visible">
        <div className="mx-auto flex max-w-3xl shrink-0 flex-col justify-center sm:h-screen">
          <div className="mx-auto flex size-full flex-col px-6 pt-10 lg:pt-0 2xl:px-0">
            <div className="flex flex-col space-y-9 grow md:justify-center ">
              <div className="h-72 overflow-clip flex justify-center items-center">
                <Image src={logo} alt="Snapmart Logo" />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="leading-5 text-gray-900 font-bold md:!text-3xl">
                  Where Every Purchase
                </p>
                <p className="leading-5 text-gray-900 font-bold md:!text-3xl">
                  Tells a Story.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/create-account"
                  className="primary-btn"
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="primary-btn"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="flex flex-col mt-auto py-10 lg:pt-0">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-700 dark:text-gray-600 font-normal tracking-normal font-sans text-center normal-case pt-10 lg:pt-2">
                  © Snapmart
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-3xl shrink-0 flex-col justify-center sm:h-screen">
          <div className="grid size-full max-w-3xl flex-none grid-cols-2 gap-4 overflow-hidden sm:max-w-5xl lg:max-w-none">
            <div className="flex flex-col gap-4">
              <Image
                className="bg-white rounded-3xl w-72 h-64"
                src={product}
                objectFit="cover"
                alt="img-card"
              />
              <Image
                className="bg-white rounded-3xl w-72 h-64 object-contain"
                src={feed}
                alt="img-card"
              />
              <Image
                className="bg-white rounded-3xl w-72 h-64 object-contain"
                src={chat}
                alt="img-card"
              />
              <div className="bg-white rounded-3xl w-72 h-64"></div>
              <div className="bg-white rounded-3xl w-72 h-64"></div>
            </div>
            <div className="flex size-full origin-center flex-col gap-4">
              <div className="bg-white rounded-3xl w-72 h-64"></div>
              <div className="bg-white rounded-3xl w-72 h-64"></div>
              <div className="bg-white rounded-3xl w-72 h-64"></div>
              <div className="bg-white rounded-3xl w-72 h-64"></div>
              <div className="bg-white rounded-3xl w-72 h-64"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
