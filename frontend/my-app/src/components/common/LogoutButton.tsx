import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Avatar,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import ThemeToggleButton from "./ThemeToggleButton";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isAuthenticated ? (
    <Stack
      direction="row"
      sx={{
        top: theme.spacing(2),
        right: isMobile ? theme.spacing(1) : theme.spacing(2),
        width: "100%",
        alignItems: "flex-end",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", width: "100%" }}
      >
        <Avatar
          src={user?.picture}
          alt={user?.name}
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="body1" sx={{ color: theme.palette.grey[800] }}>
          {user?.name}
        </Typography>
      </Stack>
      {/* <ThemeToggleButton /> */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<ExitToAppIcon />}
        onClick={() => {
          localStorage.removeItem("userId");
          localStorage.removeItem("authToken");
          logout({ returnTo: window.location.origin } as any);
        }}
        sx={{
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
          "&:hover": { backgroundColor: theme.palette.grey[700] },
          width: isMobile ? "100%" : "200px",
        }}
      >
        Logout
      </Button>
    </Stack>
  ) : null;
};

export default LogoutButton;
