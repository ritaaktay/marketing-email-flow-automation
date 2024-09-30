import express from "express";

import eventRouter from "./routers/eventRouter.ts";

const app = express();

// all HTTP requests to /event will be handled by the eventRouter
app.use("/event", eventRouter);

const port = "8000";

app.listen(port, () => {
  console.log("Stratford Socks Email Automation API listening on port", port);
});
