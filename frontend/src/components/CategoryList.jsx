export default function CategoryList({ categories, setSearch }) {
    
    if(!categories)return(
            <div
      className="
                    flex
                    gap-2
                    flex-wrap
        "
    >No Categories Logged Yet</div>
    )
  else return (
    <div
      className="
flex
gap-2
flex-wrap
p-4
"
    >
              <button
          
          onClick={() => setSearch('')}
          className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
hover:bg-blue-200
"
        >Reset</button>
      {categories.map((item) => (
        <button
          key={item.category}
          onClick={() => setSearch(item.category)}
          className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
hover:bg-blue-200
"
        >
          {item.category}
        </button>
      ))}
    </div>
  );
}
