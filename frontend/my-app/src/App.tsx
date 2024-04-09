import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CssBaseline, Box, Container } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskManager from "./components/Tasks/TaskManager";
import LoginPage from "./components/auth/LoginPage";
import { ThemeProvider } from "./themes/ThemeContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import LogoutButton from "./components/common/LogoutButton";
import { useCreateUserMutation } from "./features/auth/authApi";

const App = () => {
  const { isLoading, error, getAccessTokenSilently, user, isAuthenticated } =
    useAuth0();
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    const initUser = async () => {
      try {
        if (!isAuthenticated || !user) return;

        const token = await getAccessTokenSilently();
        localStorage.setItem("authToken", token); // Store the token

        // Destructure necessary information from the Auth0 user profile
        const { email, sub: auth0Id } = user;
        // Use the createUser mutation to send user details to your backend
        const result = await createUser({ email, auth0Id }).unwrap();

        // Store the user ID returned from your backend in localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) localStorage.setItem("userId", result.id);
      } catch (e) {
        console.error("Error initializing user:", e);
      }
    };

    initUser();
  }, [getAccessTokenSilently, isAuthenticated, user, createUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <LogoutButton />
        </Box>
        <Container maxWidth="lg">
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TaskManager />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate replace to="/tasks" />} />
            </Routes>
          </DndProvider>
        </Container>
      </DndProvider>
    </ThemeProvider>
  );
};

export default App;
