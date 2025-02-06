import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

import Dashboard from "./pages";

const App: React.FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Dashboard />{" "}
      </Provider>
    </StrictMode>
  );
};

export default App;
