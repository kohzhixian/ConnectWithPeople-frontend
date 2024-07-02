import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainBackground } from "./components/MainBackground";
import { MainPage } from "./components/MainPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./pages/LoginPage";

function App() {
  // state
  const [isValidUser, setIsValidUser] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isValidUser={isValidUser} invalidRoute="/login">
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
              <LoginPage setIsValidUser={setIsValidUser} />
            </MainBackground>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
