import React, { useContext } from "react";
import Modal from "./Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "../utils";
import { FinanceContext } from "../context/financeContext";
import { toast } from "react-toastify";

const ViewExpenseModal = ({ show, onClose, expense }) => {
  const { removeExpense, removeCategory } = useContext(FinanceContext);

  const deleteCategoryeHandler = async () => {
    try {
      await removeCategory(expense.id);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenseHandler = async (item) => {
    try {
      //  Remove the item from the list
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      // Update the expense balance
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await removeExpense(updatedExpense, expense.id);
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className='flex items-center justify-between'>
        <h2 className='text-4xl'>{expense.title}</h2>
        <button onClick={deleteCategoryeHandler} className='btn btn-danger'>
          Delete
        </button>
      </div>

      <div>
        <h3 className='my-4 text-2xl'>Expense History</h3>
        {expense.items.map((item) => {
          return (
            <div key={item.id} className='flex items-center justify-between'>
              <p>
                {item.createdAt?.toMillis
                  ? new Date(item.createdAt?.toMillis()).toISOString()
                  : item.createdAt?.toISOString()}
              </p>
              <p className='flex items-center gap-2'>
                {currencyFormatter(item.amount)}
                <button
                  onClick={() => {
                    deleteExpenseHandler(item);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
