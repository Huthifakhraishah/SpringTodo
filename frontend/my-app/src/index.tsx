import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Auth0ProviderWithHistory from "./components/auth/auth0-provider-with-history";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </Router>
    </Provider>
  </React.StrictMode>
);
