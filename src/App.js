import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Dashboard from "./Components/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/forgotPassword" element={<ForgotPassword />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;