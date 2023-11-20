import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

export const FinanceContext = createContext({
  income: [],
  expenses: [],
  addIncome: () => {},
  addExpense: () => {},
  removeIncome: () => {},
  removeExpense: () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);

  // Add income to firestore database
  const addIncome = async (income) => {
    const collectionRef = collection(db, "income");

    try {
      const docSnapshot = await addDoc(collectionRef, income);

      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnapshot.id,
            ...income,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  // Remove income from firestore database
  const removeIncome = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);

    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const values = { income, addIncome, removeIncome };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };
    getIncomeData();
  }, []);

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
