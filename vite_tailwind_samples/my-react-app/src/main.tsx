import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { Root } from "./routes/root";
import { Badge } from "./components/ui/badge";
import { CssMChadcnBadge } from "./components/CssMChadcnBadge";
import { TSTableBasic } from "./components/TSTable/TSTableBasic";
import { TSTableReSize } from "./components/TSTable/TSTableReSize";
import { TSTablePagination } from "./components/TSTable/TSTablePagination";
import { TSTableFilter } from "./components/TSTable/TSTableFilter";
import { TSTableSort } from "./components/TSTable/TSTableSort";
import { TSTableRowSelection } from "./components/TSTable/TSTableRowSelection";
import { TSTableColumnVisibility } from "./components/TSTable/TSTableColumnVisibility";
import { TSTableFacetedFilter } from "./components/TSTable/TSTableFacetedFilter";
import { TSTableHeaderGroups } from "./components/TSTable/TSTableHeaderGroups";
import { ErrorBoundaryBasic } from "./components/ErrorBoundaryBasic";

import "./index.css";
import { ClsxAndCvaSamples } from "./components/clsx-and-cva/ClsxAndCvaSamples";
import { TaskPage } from "./components/shadcn/tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/clsx-and-cva-sample",
        element: <ClsxAndCvaSamples />,
      },
      {
        path: "/shadcn-badge",
        element: (
          <>
            <div>
              <Badge variant="default">Chadcn/ui</Badge>
            </div>
            <div>
              <CssMChadcnBadge variant="default">
                Chadcn/ui extended by CSS Module
              </CssMChadcnBadge>
            </div>
          </>
        ),
      },
      {
        path: "/tstable-basic",
        element: <TSTableBasic />,
      },
      {
        path: "/tstable-resize",
        element: <TSTableReSize />,
      },
      {
        path: "/tstable-pagination",
        element: <TSTablePagination />,
      },
      {
        path: "/tstable-filter",
        element: <TSTableFilter />,
      },
      {
        path: "/tstable-faceted-filter",
        element: <TSTableFacetedFilter />,
      },
      {
        path: "/tstable-sort",
        element: <TSTableSort />,
      },
      {
        path: "/tstable-row-selection",
        element: <TSTableRowSelection />,
      },
      {
        path: "/tstable-column-visibility",
        element: <TSTableColumnVisibility />,
      },
      {
        path: "/tstable-header-group",
        element: <TSTableHeaderGroups />,
      },
      {
        path: "/error-boundary",
        element: <ErrorBoundaryBasic />,
      },
      {
        path: "/shadcn-task",
        element: <TaskPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
