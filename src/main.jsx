import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>,
);
