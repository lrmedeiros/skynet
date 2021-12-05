import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { SearchInstructor } from "./pages/SearchInstructor";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { theme } from "./styles/theme";
import { EmissionOfReportsMadeByTheInstructors } from "./pages/EmissionOfReportsMadeByTheInstructors";
import { Perfil } from "./pages/Perfil";
import { PerfilInstructor } from "./pages/PerfilInstructor";

function Router() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search-instructor" element={<SearchInstructor />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil-instructor" element={<PerfilInstructor />} />
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
