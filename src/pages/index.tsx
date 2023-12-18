export default function Home() {
  return (
    <form className="flex flex-col space-y-2 p-2.5">
      <input
        type="text"
        required
        placeholder="Username"
        className="border p-1 peer border-gray-400 rounded"
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">This input is invalid</span>
      <input type="submit" value="Login" />
    </form>
  );
}
