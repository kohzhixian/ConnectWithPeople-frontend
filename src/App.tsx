import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainBackground } from "./components/MainBackground";
import { MainPage } from "./components/MainPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./pages/LoginPage";
import { useAppSelector } from "./redux/hooks";

function App() {
  // state
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isValidUser={isAuthenticated} invalidRoute="/login">
              <MainBackground>
                <MainPage />
              </MainBackground>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <MainBackground>
              <LoginPage />
            </MainBackground>
          }
        />
        <Route path="/404" element={<div>UNAUTHORIZED PAGE</div>} />
        <Route path="/test" element={<div>test page</div>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
