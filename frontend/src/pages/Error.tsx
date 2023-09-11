import React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error: unknown = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as { statusText?: string })?.statusText ||
            (error as Error)?.message}
        </i>
      </p>
    </div>
  );
}
