import express from "express";
import bodyParser from "body-parser";

import flowRouter from "./routers/flowRouter.ts";

const app = express();

app.use("/", bodyParser.json());

// all HTTP requests to /marketing/flows endpoint will be handled by the flowRouter
app.use("/marketing/flows", flowRouter);

app.use("*", (_req, res) => {
  res.status(404).send("Could not find what you are looking for");
});

const port = "8000";

app.listen(port, () => {
  console.log("Stratford Socks Email Automation API listening on port", port);
});
