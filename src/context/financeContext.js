import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "./authContext";

export const FinanceContext = createContext({
  income: [],
  expenses: [],
  addIncome: () => {},
  removeIncome: () => {},
  addExpense: () => {},
  removeExpense: () => {},
  addCategory: () => {},
  removeCategory: () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(AuthContext);

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

  // Add expense to firestore database
  const addExpense = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense });

      // Update State
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });

        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  // Remove expense from firestore database
  const removeExpense = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      });
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  // Add category to firestore database
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expenses");

      const docSnap = await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [],
      });

      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            uid: user.uid,
            items: [],
            ...category,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  // Remove category from firestore database
  const removeCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);

      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== expenseCategoryId
        );

        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!user) return;

    // Get income data from firestore db
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const qry = query(collectionRef, where("uid", "==", user.uid));
      const docsSnap = await getDocs(qry);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    // Get expenses from firestore db
    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const qry = query(collectionRef, where("uid", "==", user.uid));
      const docsSnap = await getDocs(qry);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, [user]);

  const values = {
    income,
    expenses,
    addIncome,
    removeIncome,
    addExpense,
    removeExpense,
    addCategory,
    removeCategory,
  };

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
