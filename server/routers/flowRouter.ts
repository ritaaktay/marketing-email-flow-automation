import { Router } from "express";
import { flows } from "../flows/flows.json";
import { executeSteps } from "../utils/executeSteps.ts";
import { isEvent } from "../types.ts";

const flowRouter = Router();

flowRouter.post("/", async (req, res) => {
  // We validate the request body to ensure it is a valid event
  if (!isEvent(req.body)) {
    res.status(400).send("Received invalid event format");
    return;
  }

  const { eventName } = req.body;

  // We try to find a flow with a trigger matching the event,
  // and send an error back if no such flow exists
  const flow = flows.find((f) => f.trigger === eventName);

  if (!flow) {
    res
      .status(500)
      .send(`There is no flow defined for the event "${eventName}"`);
    return;
  }

  // We try to exectue all steps in the flow associated with the event
  // If there are any errors, we break the flow and send a descriptive
  // error message
  try {
    const results = await executeSteps(flow.steps, req.body);
    res
      .status(200)
      .send(`🧦 Successfully executed flow for ${eventName}!\n${results}`);
  } catch (e) {
    res.status(500).send(`🧦 Could not complete flow for ${eventName}\n${e}`);
  }
});

export default flowRouter;
