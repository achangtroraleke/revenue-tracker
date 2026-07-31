import { FaDollarSign, FaChartPie, FaFileInvoiceDollar } from "react-icons/fa";

export default function DashboardSummary({ data }) {
  const cards = [
    {
      title: "Total Revenue",

      value: data.total_revenue,

      icon: <FaDollarSign />,
    },

    {
      title: "This Month",

      value: data.monthly_revenue,

      icon: <FaChartPie />,
    },

    {
      title: "Transactions",

      value: data.transaction_count,

      icon: <FaFileInvoiceDollar />,
    },
  ];

  return (
    <div
      className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="
card
flex
items-center
justify-between
"
        >
          <div>
            <p
              className="
text-sm
text-slate-500
"
            >
              {card.title}
            </p>

            <h2
              className="
text-3xl
font-bold
mt-2
"
            >
              {card.value}
            </h2>
          </div>

          <div
            className="
bg-blue-100
text-blue-600
p-4
rounded-full
text-xl
"
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
