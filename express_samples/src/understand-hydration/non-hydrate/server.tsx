// server.tsx
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { App } from "./app";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const app = express();

app.get("/", (_, res) => {
  // reactとの結合
  const { pipe } = ReactDOMServer.renderToPipeableStream(<App />, {
    onShellReady() {
      res.setHeader("content-type", "text/html");
      pipe(res);
    },
  });
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
