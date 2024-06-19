import DrugSearch from "./components/DrugSearch";
import DrugDetails from "./components/DrugDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<DrugSearch />} />
          <Route path="/details/:applicationNumber" element={<DrugDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
