import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainBackground } from "./components/MainBackground";
import { MainPage } from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainBackground>
              <MainPage />
            </MainBackground>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
