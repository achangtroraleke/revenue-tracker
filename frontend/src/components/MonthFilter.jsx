export default function MonthFilter({
  month,
  setMonth,
}) {
  return (
       <div
      className="
p-4

item-center flex
"
    >


      <div className="flex flex-col gap-2 sm:flex-row">
        <input
        placeholder="Select Month"
          id="month-filter"
          type="month"
          value={month}
          onChange={(event) => {
            setMonth(event.target.value);
          }}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            py-2
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

        {month && (
          <button
            type="button"
            onClick={() => setMonth("")}
            className="
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              text-sm
              text-slate-600
              hover:bg-slate-50
            "
          >
            Clear month
          </button>
        )}
      </div>
    </div>
  );
}