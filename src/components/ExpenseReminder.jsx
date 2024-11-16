import { useState } from "react";
import { logBannerAccept, logBannerDismiss } from "../config/analytics";

const ExpenseReminder = ({ onAddExpense, position }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    logBannerDismiss(position);
    setIsVisible(false);
  };

  const handleAddExpense = () => {
    logBannerAccept(position);
    onAddExpense();
  };

  if (!isVisible) return null;

  return (
    <div className='flex items-center justify-between p-4 mb-4 border border-blue-950 dark:border-lime-400 text-blue-950 dark:text-lime-400 rounded-lg'>
      <span className='text-md text-blue-950 dark:text-white'>
        Forgot to add your expenses?
      </span>
      <div>
        <button onClick={handleAddExpense} className='btn btn-primary'>
          Add Expense
        </button>
        <button
          onClick={handleDismiss}
          className='ml-2 btn btn-primary-outline'
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default ExpenseReminder;
