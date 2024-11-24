import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* statusTextとmessageはResponse型の引数として明示的に渡すこともできる */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
