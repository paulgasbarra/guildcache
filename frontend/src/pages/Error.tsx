import React from "react";

export function ErrorPage(error: string | Error | { statusText?: string }) {
  return (
    <div id="error-page" className="flex items-center flex-col w-full p-16">
      <h1 className="text-xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className={"text-red-600"}>
          {(error as { statusText?: string })?.statusText ||
            (error as Error)?.message}
        </i>
      </p>
    </div>
  );
}
