import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainBackground } from "./components/MainBackground";
import { MainPage } from "./components/MainPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { useAppSelector } from "./redux/hooks";
import { WebSocketProvider } from "./hooks/WebSocketProvider";

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
            <ProtectedRoute isValidUser={isAuthenticated} invalidRoute="/login">
              <MainBackground>
                <WebSocketProvider>
                  <MainPage />
                </WebSocketProvider>
              </MainBackground>
            </ProtectedRoute>
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
        {/* <Route path="/test" element={<div>test page</div>} /> */}
        {/* <Route
          path="/test"
          element={
            <ProtectedRoute isValidUser={isAuthenticated} invalidRoute="/login">
              <div>TEST PAGE</div>
            </ProtectedRoute>
          }
        /> */}

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
