import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import invariant from "tiny-invariant";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  invariant(
    isRouteErrorResponse(error),
    "This page should only be shown for route errors",
  );

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* TODO: なぜかerror.messageは型エラーになる */}
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
