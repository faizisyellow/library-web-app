import store from "./store";
import "./index.css";
import RootRouter from "./router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
        >
          <RootRouter />
        </ThemeProvider>
      </BrowserRouter>
      <Toaster />
    </Provider>
  </StrictMode>
);
