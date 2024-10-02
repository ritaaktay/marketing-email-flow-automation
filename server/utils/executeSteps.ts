import type { Steps, Event } from "../types.ts";
import executors from "../executors/index.ts";
import { summariseResults } from "./summariseResults.ts";

export const executeSteps = (
  steps: Steps,
  event: Event,
  completed: Array<string> = []
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Break condition since we use recursion. When there are no more steps,
    // we resolve the promise without setting any more timeouts
    if (steps.length === 0) {
      resolve(summariseResults(completed));
    }

    const { action, delay } = steps[0];

    // Since delay for a step is given in minutes, we multiply by 60000 for milliseconds
    const delayInMiliseconds = delay * 60000;

    setTimeout(async () => {
      // We find the executor function that corresponds to the action type
      // (For now, it will only ever be sendEmail, but more action types can be added)
      const executor = executors[action.type];

      if (!executor) {
        const error = "Action does not have an executor";
        reject(summariseResults(completed, error, action));
      }

      try {
        const result = await executor(event, action);
        completed.push(result);
      } catch (e) {
        // In case of an error executing an action, we stop all exectuion flow,
        // assuming actions are conditional on the success of preceding actions.
        // Different error handling flows can be introduced here in the future.
        reject(summariseResults(completed, e.message, action));
      }

      // If the first step has been executed successfully, we make a recursive call
      // which will execute the next step (after it's own delay period)
      resolve(executeSteps(steps.slice(1), event, completed));
    }, delayInMiliseconds);
  });
};
