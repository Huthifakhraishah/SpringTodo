// src/auth/Auth0ProviderWithHistory.tsx
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";

interface Auth0ProviderWithHistoryProps {
  children: ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({
  children,
}) => {
  const domain: string = process.env.REACT_APP_AUTH0_DOMAIN ?? "";
  const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID ?? "";
  const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE ?? "";

  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    console.log("onRedirectCallback appState:", appState);
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
