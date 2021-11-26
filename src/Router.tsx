import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { SearchAssociate } from "./pages/SearchAssociate";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { theme } from "./styles/theme";
import { EmissionOfReportsMadeByTheInstructors } from "./pages/EmissionOfReportsMadeByTheInstructors";

function Router() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search-associate" element={<SearchAssociate />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/emisson-reports"
              element={<EmissionOfReportsMadeByTheInstructors />}
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default Router;
