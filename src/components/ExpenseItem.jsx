import React from "react";
import { currencyFormatter } from "../utils";

const ExpenseItem = ({ title, total, color }) => {
  return (
    <button>
      <div className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-xl'>
        <div className='flex item-center gap-2'>
          <div
            className='w-[25px] h-[25px] rounded-full'
            style={{ backgroundColor: color }}
          />
          <h4 className='capitalize'>{title}</h4>
        </div>
        <p>{currencyFormatter(total)}</p>
      </div>
    </button>
  );
};

export default ExpenseItem;
