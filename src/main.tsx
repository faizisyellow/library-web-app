import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RootRouter from "./router";
import { ThemeProvider } from "./components/theme/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <RootRouter />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
