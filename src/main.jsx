import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";

// const domain = import.meta.env.VITE_AUTH0_DOMAIN;
// const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// if (!domain || !clientId) {
//   console.error("Missing Auth0 environment variables!");
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
  
  </StrictMode>
);
