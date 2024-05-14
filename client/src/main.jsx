import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Start Router
import { BrowserRouter } from "react-router-dom";
import PostContextProvider from "@contexts/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <PostContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PostContextProvider>
);
