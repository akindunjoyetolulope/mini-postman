import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

import Dashboard from "./pages";
import ThemeProvider from "./provider/ThemeProvider.tsx";

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Dashboard />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
