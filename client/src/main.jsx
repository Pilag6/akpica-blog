import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Start Router
import { BrowserRouter } from "react-router-dom";
import PostContextProvider from "@contexts/PostContext.jsx";
import ToggleContextProvider from "@contexts/ToggleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToggleContextProvider>
    <PostContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostContextProvider>
  </ToggleContextProvider>
);
