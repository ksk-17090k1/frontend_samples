import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
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
    // Nesting Routes
    // React-routerの大きな特徴。ページの一部分だけをroutingすることで無駄なレンダリングを防ぐことができる
    // Childrenから親を参照するにはOutletコンポーネントを使う
    // また、childrenで errorElement を指定することで、ErrorBoundaryを設定しやすいのもメリット！
    children: [
      {
        // まずはErrorPageを持ってきて、そのchildrenに各ページを置くことで、エラーページを共通化できる
        errorElement: <ErrorPage />,
        children: [
          // index.htmlに相当するページ
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            // NOTE: 通常はrouteごとにloaderが存在するが、今回はチュートリアルなので同じloaderを使っている
            loader: contactLoader,
            action: editAction,
          },
          // elementを持たないパス。とてもWEBアプリケーションぽい。
          // このようなパスでは通常actionが実行されたらどこかにリダイレクトされる。
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* create Root Route!!! */}
    <RouterProvider router={router} />
  </StrictMode>,
);
