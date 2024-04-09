import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

type AuthTokenContextType = {
  authToken: string;
  setAuthToken: (token: string) => void;
};

const AuthTokenContext = createContext<AuthTokenContextType | undefined>(
  undefined
);

export const AuthTokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const updateAuthToken = async () => {
      const token = await getAccessTokenSilently();
      setAuthToken(token);
    };
    updateAuthToken();
  }, [getAccessTokenSilently]);

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
};

export const useAuthToken = () => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuthToken must be used within an AuthTokenProvider");
  }
  return context.authToken;
};
