import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import "./index.css";

// create Browser Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader, actionの設定
    loader: rootLoader,
    action: rootAction,
    // Outletを使ってページをNestしてroutingする
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  // 完全に別ページにしたい場合はこうする
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* create Root Route!!! */}
    <RouterProvider router={router} />
  </StrictMode>,
);
