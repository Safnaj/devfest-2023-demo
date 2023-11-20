import FinanceContextProvider from "./context/financeContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <FinanceContextProvider>
      <HomePage />
    </FinanceContextProvider>
  );
}

export default App;
