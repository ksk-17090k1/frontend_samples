// import "./styles.css";
import { Count } from "./components/count";
import { Controls } from "./components/controls";
import { UrlOrLocalStorage } from "./components/urlOrLocalStorage";

export default function App() {
  return (
    <div className="App">
      <Count />
      <Controls />
      <UrlOrLocalStorage />
    </div>
  );
}
