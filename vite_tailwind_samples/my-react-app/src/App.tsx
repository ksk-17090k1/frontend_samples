import "./App.css";
import ClsxSample from "./components/ClsxSample";
import { CvaSample } from "./components/CvaSample";
import { Badge } from "./components/ui/badge";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <ClsxSample intent="danger" />
      </div>
      <div>
        <CvaSample intent={"primary"} size={"small"}>
          Button
        </CvaSample>
      </div>
      <div>
        <Badge>Budge</Badge>
      </div>
    </>
  );
}

export default App;
