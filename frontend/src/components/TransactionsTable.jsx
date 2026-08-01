export default function TransactionsTable({
  transactions = [],
  setSearch,
}) {
  const handleFilterClick = (value) => {
    if (typeof setSearch !== "function") {
      console.error(
        "TransactionsTable expected setSearch to be a function."
      );
      return;
    }

    setSearch(String(value ?? "").trim());
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-slate-500">
            <th className="p-3">Date</th>
            <th className="p-3">Category</th>
            <th className="p-3">Client</th>
            <th className="p-3">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="p-6 text-center text-slate-500"
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">
                  {item.date}
                </td>

                <td className="p-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterClick(item.category)
                    }
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {item.category}
                  </button>
                </td>

                <td className="p-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterClick(
                        item.source_or_client
                      )
                    }
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {item.source_or_client}
                  </button>
                </td>

                <td className="p-3 font-semibold text-green-600">
                  {Number(item.amount).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}