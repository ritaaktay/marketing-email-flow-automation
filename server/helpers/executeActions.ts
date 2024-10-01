import type { Steps, Event } from "../types.ts";
import executors from "../executors";

export const executeActions = (steps: Steps, event: Event): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Break condition since we use recursion
    // When there are no more steps, we resolve the promise
    // Without setting any more timeouts
    if (steps.length === 0) {
      resolve();
    }

    const step = steps[0];

    // Since delay for an action is given in minutes, we multiply by 60000
    const delayInMiliseconds = steps[0].delay * 60000;

    setTimeout(async () => {
      // We find the executor function that corresponds to the action type
      // For now, it will only ever be sendEmail, but more action types can be added
      const executor = executors[step.action.type];

      if (!executor) {
        reject(
          `Action does not have an executor function defined:  ${JSON.stringify(
            step.action
          )}`
        );
      }

      try {
        const completed = await executor(event, step.action);
        console.log(completed);
      } catch (e) {
        // In case of an error executing an action, we will just stop all exectuion flow,
        // assuming actions are conditional on preceding actions.
        // If each action provided it's own error handling, this could be initiated here.
        reject(`Action failed: ${JSON.stringify(step.action)}`);
      }

      // If the first event has been executed successfully, we make a recursive call
      // which will execute the next event after its own delay
      resolve(executeActions(steps.slice(1), event));
    }, delayInMiliseconds);
  });
};
