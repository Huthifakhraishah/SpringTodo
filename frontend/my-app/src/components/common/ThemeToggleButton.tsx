import React from "react";
import { useThemeMode } from "../../themes/ThemeContext";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

const ThemeToggleButton: React.FC = () => {
  const { toggleThemeMode } = useThemeMode();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleThemeMode();
  };

  return (
    <FormControlLabel
      control={<Switch onChange={handleChange} defaultChecked={true} />}
      label="Toggle theme"
    />
  );
};

export default ThemeToggleButton;
