import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RootRouter from "./router";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "./components/ui/toaster";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
        >
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <RootRouter />
          </CookiesProvider>
        </ThemeProvider>
      </BrowserRouter>
      <Toaster />
    </Provider>
  </StrictMode>
);
