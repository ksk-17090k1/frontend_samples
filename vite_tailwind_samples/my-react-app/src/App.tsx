import "./App.css";
import ClsxSample from "./components/ClsxSample";
import { CssMChadcnBadge } from "./components/CssMChadcnBadge";
import { CvaSample } from "./components/CvaSample";
import { ErrorBoundaryBasic } from "./components/ErrorBoundaryBasic";
import { TSTableBasic } from "./components/TSTableBasic";
import { TSTableHeaderGroups } from "./components/TSTableHeaderGroups";
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
        <Badge variant="default">Chadcn/ui</Badge>
      </div>
      <div>
        <CssMChadcnBadge variant="default">
          Chadcn/ui extended by CSS Module
        </CssMChadcnBadge>
      </div>
      {/* <div><TSTableBasic /></div> */}
      {/* <div><TSTableHeaderGroups /></div> */}
      <ErrorBoundaryBasic />
    </>
  );
}

export default App;
