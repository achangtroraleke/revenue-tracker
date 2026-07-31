import {
    Doughnut
}
from "react-chartjs-2";


import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
}
from "chart.js";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const CATEGORY_COLORS = [
  "#6366F1", // Indigo
  "#3B82F6", // Blue
  "#14B8A6", // Teal
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#8B5CF6", // Purple
];

const HOVER_COLORS = [
  "#4F46E5",
  "#2563EB",
  "#0D9488",
  "#D97706",
  "#DB2777",
  "#7C3AED",
];

export default function RevenueCategoryChart({
    data
}) {


const chartData = {


    labels:
        data.map(
            item =>
            item.category
        ),


    datasets:[

        {

            label:
            "Revenue",


            data:
            data.map(
                item =>
                item.total
            ),
            backgroundColor: CATEGORY_COLORS.slice(0, data.length),
        hoverBackgroundColor: HOVER_COLORS.slice(0, data.length),
        borderWidth: 3,
        borderColor: "#FFFFFF", // Clean spacing between slices
        hoverBorderColor: "#FFFFFF",
        offset: 4, // Slight separation pop on hover

        }

    ]

};



return (

<div className="
bg-white
rounded-xl
shadow-sm
p-6
">


<h2 className="
font-semibold
text-lg
mb-4
">

Revenue By Category

</h2>


<Doughnut

data={chartData}

/>


</div>

)

}