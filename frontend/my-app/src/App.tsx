import { CssBaseline, Box, Container } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./app/store";
import TaskManager from "./components/Tasks/TaskManager";
import ThemeToggleButton from "./components/common/ThemeToggleButton";
import { ThemeProvider } from "./themes/ThemeContext";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <ThemeToggleButton />
          </Box>
          <Container maxWidth="lg">
            <h1 style={{ textAlign: "center" }}>Tasks</h1>
            <TaskManager />
          </Container>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
