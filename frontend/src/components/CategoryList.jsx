export default function CategoryList({

categories,
setSearch

}){


return (

<div className="
flex
gap-2
flex-wrap
">


{
categories.map(
(item)=>(

<button

key={item.category}

onClick={()=>setSearch(
item.category
)}

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

)

)

}


</div>

)

}