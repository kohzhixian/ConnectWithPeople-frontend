import "./App.css";
import { MainBackground } from "./components/MainBackground";
import { Overlay } from "./components/Overlay";

function App() {
  return (
    <div className="relative">
      <MainBackground />
      <Overlay />
    </div>
  );
}

export default App;
