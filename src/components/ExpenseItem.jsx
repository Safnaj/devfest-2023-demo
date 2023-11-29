import React, { useState } from "react";
import ViewExpenseModal from "./ViewExpenseModal";
import { currencyFormatter } from "../utils";

const ExpenseItem = ({ expense }) => {
  const [showViewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setViewExpenseModal}
        expense={expense}
      />
      <button
        onClick={() => {
          setViewExpenseModal(true);
        }}
      >
        <div className='flex items-center justify-between px-4 py-4 bg-gray-200 dark:bg-slate-700 rounded-xl'>
          <div className='flex item-center gap-2'>
            <div
              className='w-[25px] h-[25px] rounded-full'
              style={{ backgroundColor: expense.color }}
            />
            <h4 className='capitalize'>{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
};

export default ExpenseItem;
