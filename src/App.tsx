import AppRoutes from "./AppRoutes";
import { GlobalProvider } from "./context/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
}

export default App;
