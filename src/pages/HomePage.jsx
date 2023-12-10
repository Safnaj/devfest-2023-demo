import { useContext, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { currencyFormatter } from "../utils";
import ExpenseItem from "../components/ExpenseItem";
import Navbar from "../components/Navbar";
import AddIncomeModal from "../components/AddIncomeModal";
import AddExpenseModal from "../components/AddExpenseModal";
import { FinanceContext } from "../context/financeContext";
import { isFeatureEnabled } from "../config/remoteConfig";
import { FEATURE_ENABLE_STATS } from "../constants/flags";

Chart.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const [balance, setBalance] = useState(0);
  const { income, expenses } = useContext(FinanceContext);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const isStatsEnabled = isFeatureEnabled(FEATURE_ENABLE_STATS);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => total + i.amount, 0) -
      expenses.reduce((total, e) => total + e.total, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  return (
    <>
      <Navbar />
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      <main className='container max-w-2xl px-6 mx-auto'>
        <section>
          <small className='text-gray-400 text-md'>My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(balance)}</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button
            onClick={() => {
              setShowAddExpenseModal(true);
            }}
            className='btn btn-primary'
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className='btn btn-primary-outline'
          >
            + Income
          </button>
        </section>

        <section className='py-6'>
          <h3 className='text-2xl'>My Expenses</h3>
          <div className='flex flex-col gap-4 mt-4'>
            {expenses.map((data) => (
              <ExpenseItem key={data.id} expense={data} />
            ))}
          </div>
        </section>
        {isStatsEnabled && (
          <section className='py-6' id='stats'>
            <h3 className='text-2xl'>Stats</h3>
            <div className='w-1/2 mx-auto'>
              <Doughnut
                data={{
                  labels: expenses.map((data) => data.title),
                  datasets: [
                    {
                      label: "Expenses",
                      data: expenses.map((data) => data.total),
                      backgroundColor: expenses.map((data) => data.color),
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default HomePage;
