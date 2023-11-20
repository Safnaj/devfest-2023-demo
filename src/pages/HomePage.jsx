import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { currencyFormatter } from "../utils";
import ExpenseItem from "../components/ExpenseItem";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import AddIncomeModal from "../components/AddIncomeModal";

Chart.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    total: 12000,
    color: "#f44336",
  },
  {
    id: 2,
    title: "Transportation",
    total: 10000,
    color: "#2196f3",
  },
  {
    id: 3,
    title: "Food",
    total: 5000,
    color: "#ff9800",
  },
];

const HomePage = () => {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  return (
    <>
      <Navbar />
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
        income
      />

      <Modal show={showAddExpenseModal} onClose={setShowAddExpenseModal}>
        <h1>hell</h1>
      </Modal>

      <main className='container max-w-2xl px-6 mx-auto'>
        <section>
          <small className='text-gray-400 text-md'>My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(50000)}</h2>
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
            {DUMMY_DATA.map((data) => (
              <ExpenseItem
                key={data.id}
                title={data.title}
                total={data.total}
                color={data.color}
              />
            ))}
          </div>
        </section>

        <section className='py-6'>
          <h3 className='text-2xl'>Stats</h3>
          <div className='w-1/2 mx-auto'>
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((data) => data.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((data) => data.total),
                    backgroundColor: DUMMY_DATA.map((data) => data.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
