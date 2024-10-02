import express from "express";
import bodyParser from "body-parser";

import flowRouter from "./routers/flowRouter";

const app = express();

app.use("/", bodyParser.json());

// all HTTP requests to /marketing/flows endpoint will be handled by the flowRouter
app.use("/marketing/flows", flowRouter);

app.use("*", (_req, res) => {
  res.status(404).send("Could not find what you are looking for");
});

export default app;
