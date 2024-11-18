import "./App.css";
import ClsxSample from "./components/ClsxSample";
import { CssMChadcnBadge } from "./components/CssMChadcnBadge";
import { CvaSample } from "./components/CvaSample";
import { ErrorBoundaryBasic } from "./components/ErrorBoundaryBasic";
import { TSTableBasic } from "./components/TSTable/TSTableBasic";
import { TSTableColumnVisibility } from "./components/TSTable/TSTableColumnVisibility";
import { TSTableFacetedFilter } from "./components/TSTable/TSTableFacetedFilter";
import { TSTableFilter } from "./components/TSTable/TSTableFilter";
import { TSTableHeaderGroups } from "./components/TSTable/TSTableHeaderGroups";
import { TSTablePagination } from "./components/TSTable/TSTablePagination";
import { TSTableReSize } from "./components/TSTable/TSTableReSize";
import { TSTableRowSelection } from "./components/TSTable/TSTableRowSelection";
import { TSTableSort } from "./components/TSTable/TSTableSort";
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
      {/* <div>
        <TSTableBasic />
      </div> */}
      {/* <div>
        <TSTableReSize />
        </div> */}
      {/* <div>
        <TSTablePagination />
        </div> */}
      {/* <div>
        <TSTableFilter />
      </div> */}
      {/* <div>
        <TSTableSort />
      </div> */}
      {/* <div>
        <TSTableRowSelection />
      </div> */}
      {/* <div>
        <TSTableColumnVisibility />
      </div> */}
      <div>
        <TSTableFacetedFilter />
      </div>
      {/* <div>
        <TSTableHeaderGroups />
      </div> */}
      {/* <ErrorBoundaryBasic /> */}
    </>
  );
}

export default App;
