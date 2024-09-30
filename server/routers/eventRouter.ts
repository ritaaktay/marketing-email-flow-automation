import { Router } from "express";
import bodyParser from "body-parser";

const eventRouter = Router();

eventRouter.use("/", bodyParser.json());

eventRouter.post("/", (req, res) => {
  console.log("eventName:", req.body.eventName);
  console.log("userEmail:", req.body.userEmail);
  res.send(`Event ${req.body.eventName} received for ${req.body.userEmail}`);
});

export default eventRouter;
