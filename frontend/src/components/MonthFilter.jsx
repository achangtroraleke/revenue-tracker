export default function MonthFilter({ month, setMonth, clear }) {
  return (
    <div
      className="

p-3
flex-col
flex

"
    >
      <label
        className="
block
text-sm
font-medium
mb-2
"
      >
        Filter by Month
        
      </label>
      

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="
border
rounded-lg
px-3
py-2
w-full
md:w-64
"
      />
      <button

onClick={clear('')}

className="
text-sm
text-blue-600
mt-2
"

>

Clear Filter

</button>
    </div>
  );
}
