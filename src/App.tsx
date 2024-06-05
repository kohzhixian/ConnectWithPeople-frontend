import "./App.css";
import { MainBackground } from "./components/MainBackground";
import { Overlay } from "./components/Overlay";

function App() {
  return (
    <MainBackground>
      <Overlay />
    </MainBackground>
  );
}

export default App;
