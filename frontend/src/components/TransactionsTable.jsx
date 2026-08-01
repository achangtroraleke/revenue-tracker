export default function TransactionsTable({ transactions, setSearch }) {

  if (!transactions) {
    return (
      <div
        className="
overflow-x-auto
"
      >
        <table
          className="
w-full
text-left
"
        >
          {" "}
          <thead>
            <tr
              className="
border-b
text-slate-500
text-sm
"
            >
              <th className="p-3">Date</th>

              <th>Category</th>

              <th>Client</th>

              <th>Amount</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
  return (
    <div
      className="
overflow-x-auto
"
    >
      <table
        className="
w-full
text-left
"
      >
        <thead>
          <tr
            className="
border-b
text-slate-500
text-sm
"
          >
            <th className="p-3">Date</th>

            <th>Category</th>

            <th>Client</th>

            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr
              key={item.id}
              className="
border-b
hover:bg-slate-50
"
            >
              <td className="p-3">{item.date}</td>

              <td>{item.category}</td>
              <td>
                <button
                  onClick={() => setSearch(item.source_or_client)}
                  className="
text-blue-600
hover:underline
"
                >
                  {item.source_or_client}
                </button>
              </td>

              <td
                className="
font-semibold
text-green-600
"
              >
                ${item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
