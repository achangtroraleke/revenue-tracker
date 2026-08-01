import { useState } from "react";

import useDashboard from "./hooks/useDashboard";

import UploadRevenue from "./components/UploadRevenue";
import DashboardSummary from "./components/DashboardSummary";
import TransactionsTable from "./components/TransactionsTable";
import MonthFilter from "./components/MonthFilter";
import SearchFilter from "./components/SearchFilter";
import CategoryList from "./components/CategoryList";

import {
    filterTransactions
} from "./utils/filterDashboard";



export default function App() {


    const {
        dashboard,
        loading,
        refresh
    } = useDashboard();



    const [month, setMonth] = useState("");

    const [search, setSearch] = useState("");



    if (loading) {

        return (

            <div className="
                min-h-screen
                flex
                items-center
                justify-center
            ">

                <h1 className="
                    text-xl
                    font-semibold
                ">

                    Loading dashboard...

                </h1>

            </div>

        );

    }



    if (!dashboard) {

        return (

            <div className="
                p-8
            ">

                No dashboard data available.

            </div>

        );

    }



    /*
        Local filtering.
        No API request happens here.
    */

    const filteredTransactions =
        filterTransactions(
            dashboard.recent_transactions,
            search
        );



    return (

        <div className="
            min-h-screen
            bg-slate-100
            p-8
        ">


            <div className="
                max-w-7xl
                mx-auto
            ">


                <h1 className="
                    text-4xl
                    font-bold
                    text-slate-800
                    mb-2
                ">

                    Revenue Tracker

                </h1>


                <p className="
                    text-slate-500
                    mb-8
                ">

                    Track revenue, clients, and business performance.

                </p>



                {/* Upload Excel */}

                <UploadRevenue

                    refresh={refresh}

                />

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
mt-8
">


<RevenueCategoryChart

data={
dashboard.category_breakdown
}

/>



<MonthlyRevenueChart

data={
dashboard.monthly_revenue_chart
}

/>


</div>

                {/* Filters */}


                
        <div
          className="
                    mt-6
                    grid
                    grid-cols-1
                    md:grid-cols-1
                  
                    gap-4
                  
                "
        >
          <div
            className="flex
                item-center
                bg-white
                rounded-xl
                shadow-sm
                p-4
                mb-6
             justify-content
             align-content
                 "
          >
            <MonthFilter month={month} setMonth={setMonth} clear={setSearch} />

            <SearchFilter search={search} setSearch={setSearch} />
          </div>
        </div>

          
              

                {/* Summary Cards */}

                <div className="
                    mt-8
                ">

                    <DashboardSummary

                        data={dashboard}

                    />

                </div>





                {/* Category Buttons */}

                <CategoryList

                    categories={
                        dashboard.category_breakdown
                    }

                    setSearch={
                        setSearch
                    }

                />





                {/* Transactions */}

                <div className="
                    mt-8
                    bg-white
                    rounded-xl
                    shadow-sm
                    p-6
                ">


                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-4
                    ">


                        <h2 className="
                            text-xl
                            font-semibold
                        ">

                            Recent Transactions

                        </h2>


                        {
                            search && (

                                <button

                                    onClick={() =>
                                        setSearch("")
                                    }

                                    className="
                                        text-sm
                                        text-blue-600
                                    "

                                >

                                    Clear Filter

                                </button>

                            )
                        }


                    </div>



                    <TransactionsTable

                        transactions={
                            filteredTransactions
                        }

                        setSearch={
                            setSearch
                        }

                    />


                </div>



            </div>


        </div>

    );

}