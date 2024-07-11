import Button from "./button";

export const NoMessages = () => {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center p-6 h-full">
      <div className="flex flex-col space-y-2">
        <div className="text-2xl text-gray-700 font-bold font-sans">
          No messages yet
        </div>
        <div className="text-sm text-gray-500">
          Start a chat with any seller
        </div>
      </div>
      <button className="primary-btn py-2 px-2 text-sm w-44">Message someone</button>
    </div>
  );
};
