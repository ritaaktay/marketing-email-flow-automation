import { Router } from "express";
import bodyParser from "body-parser";
import { flows } from "../flows.json";
import { executeActions } from "../helpers/executeActions";

const eventRouter = Router();

eventRouter.use("/", bodyParser.json());

eventRouter.post("/", async (req, res) => {
  const event = req.body;
  const { eventName } = event;

  // Could use a database of flows instead, which would make them easier to customise
  // In which case we would use a find by query here to find the flow that has a trigger
  // matching the event
  const flow = flows.find((f) => f.trigger === eventName);

  if (!flow) {
    res.status(500).send("There is no flow defined for the event");
    return;
  }

  try {
    await executeActions(flow.actions, event);
    res.status(200).send(`Successfully executed flow for ${eventName}`);
  } catch (e) {
    res.status(500).send(`Could not execute flow for ${eventName}: ${e}`);
  }
});

export default eventRouter;
