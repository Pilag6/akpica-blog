import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Start Router
import { BrowserRouter } from "react-router-dom";
import PostContextProvider from "@contexts/PostContext.jsx";
import ToggleContextProvider from "@contexts/ToggleContext.jsx";
import { AuthProvider } from "@contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ToggleContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostContextProvider>
    </ToggleContextProvider>
  </AuthProvider>
);
