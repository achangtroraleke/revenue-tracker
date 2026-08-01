import { FaSearch } from "react-icons/fa";

export default function SearchFilter({ search, setSearch }) {
  return (
    <div
      className="
p-4

w-full
"
    >
      <div
        className="
flex
items-center
gap-3
"
      >
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="
Search category or client...
"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
border
rounded-lg
px-4
py-2
w-full
"
        />
      </div>
    </div>
  );
}
