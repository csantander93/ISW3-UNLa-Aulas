
import { useFetchData } from './componentes/hooks/useFetchData';
import AppRouter from "./componentes/router/AppRouter.js";
function App() {
  useFetchData();
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
