import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/Context.jsx";
import "./index.css";
import App from "./App.jsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AuthProvider } from "./context/AuthContext.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </StrictMode>,
);
