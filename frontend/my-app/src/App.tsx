import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { TaskList } from "./components/Tasks/TaskList";

const theme = createTheme({});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <div>
            <h1>Tasks</h1>
            <TaskList />
          </div>
          <Button variant="contained">Hello World</Button>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
