import { useRef, useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "../utils";
import { FinanceContext } from "../context/financeContext.js";
import Modal from "./Modal";

const AddIncomeModal = ({ show, onClose }) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncome, removeIncome } = useContext(FinanceContext);

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      await addIncome(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncome(incomeId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className='flex flex-col gap-4'>
        <div className='input-group'>
          <label htmlFor='amount'>Income Amount</label>
          <input
            type='number'
            name='amount'
            ref={amountRef}
            min={100}
            step={100}
            placeholder='Enter amount'
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='amount'>Description</label>
          <input
            type='text'
            name='description'
            ref={descriptionRef}
            placeholder='Enter Income Decription'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add entry
        </button>
      </form>
      <div className='flex flex-col gap-4 mt-4'>
        <h3 className='text-2xl font-bold'>Income History</h3>
        {income.map((data) => (
          <div key={data.id} className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>{data.description}</p>
              <small className='text-xs'>{data.createdAt.toISOString()}</small>
            </div>
            <p className='flex items-center gap-2'>
              {currencyFormatter(data.amount)}
              <button
                onClick={() => {
                  deleteIncomeEntryHandler(data.id);
                }}
              >
                <FaRegTrashAlt />
              </button>
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
