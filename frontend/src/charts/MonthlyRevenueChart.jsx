import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Legend,
);

export default function MonthlyRevenueChart({ data }) {
  const chartData = {
    labels: data.map((item) =>
      new Date(item.month).toLocaleDateString("en-US", {
        month: "short",
      }),
    ),

    datasets: [
      {
        label: "Revenue",

        data: data.map((item) => item.total),
        // Line & Area Styling
        borderColor: "#6366F1", // Vibrant Indigo
        backgroundColor: "rgba(99, 102, 241, 0.12)", // Soft fill under line
        fill: true,
        tension: 0.4, // Smooth curve

        // Point Styling
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#4F46E5",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  return (
    <div
      className="
bg-white
rounded-xl
shadow-sm
p-6
"
    >
      <h2
        className="
text-lg
font-semibold
mb-4
"
      >
        Yearly Revenue
      </h2>

      <Line data={chartData} />
    </div>
  );
}
