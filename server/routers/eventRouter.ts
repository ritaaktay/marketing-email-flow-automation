import { Router } from "express";
import bodyParser from "body-parser";
import { flows } from "../flows.json";
import { executeActions } from "../helpers/executeActions";
import { Event, isEvent } from "../types.ts";

const eventRouter = Router();

eventRouter.use("/", bodyParser.json());

eventRouter.post("/", async (req, res) => {
  // We validate the request body to ensure it conforms to event data structure
  if (!isEvent(req.body)) {
    res.status(400).send("Invalid event format");
  }

  const { eventName } = req.body;

  // We try to find a flow with a trigger matching the event
  const flow = flows.find((f) => f.trigger === eventName);

  if (!flow) {
    res.status(500).send(`There is no flow defined for the event ${eventName}`);
    return;
  }

  // We try to exectue all steps in the flow associated with the event
  try {
    await executeActions(flow.steps, req.body);
    res.status(200).send(`Successfully executed flow for ${eventName}`);
  } catch (e) {
    res.status(500).send(`Could not execute flow for ${eventName}: ${e}`);
  }
});

export default eventRouter;
