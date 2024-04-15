import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🚀</span>
        <h1 className="text-4xl ">Snapmart</h1>
        <h2 className="text-2xl">Welcome to Snapmart</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/create-account"
          className="w-full bg-gradient-to-tr from-pink-300 via-blue-200 to-purple-300 text-white text-lg font-medium py-2.5 rounded-md text-center transition-colors"
        >
          Get started
        </Link>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}