import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Typography, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, user } = useAuth0();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "20vh" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to TaskManager
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sign in to manage your tasks efficiently
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={() =>
            loginWithRedirect({
              connection: "google",
            } as any)
          }
          sx={{
            backgroundColor: "#4285F4",
            "&:hover": { backgroundColor: "#357ae8" },
          }}
        >
          Continue with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
