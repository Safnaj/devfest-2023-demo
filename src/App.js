import React, { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./context/authContext";
import FinanceContextProvider from "./context/financeContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContextProvider>
      <MainApp />
    </AuthContextProvider>
  );
}

/**
 Ideally, calling useContext in the same component where the Context.
 Provider is placed might lead to issues because the component using useContext 
 would run before the Context.Provider initializes its context value
*/

function MainApp() {
  const { user, loading } = useContext(AuthContext);
  console.log(user);

  if (loading) {
    return <Loader />;
  }

  return (
    <FinanceContextProvider>
      <ToastContainer theme='dark' autoClose={3000} />
      {!user ? <LoginPage /> : <HomePage />}
    </FinanceContextProvider>
  );
}

export default App;
