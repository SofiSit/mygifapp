import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "./context/themeContext";
import { GlobalProvider } from "./context/global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>
);
