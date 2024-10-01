import express from "express";

import eventRouter from "./routers/eventRouter.ts";

const app = express();

// all HTTP requests to /event endpoint will be handled by the eventRouter
app.use("/event", eventRouter);

app.use("*", (_req, res) => {
  res.status(404).send("Cannot find the endpoing you are looking for");
});

const port = "8000";

app.listen(port, () => {
  console.log("Stratford Socks Email Automation API listening on port", port);
});
