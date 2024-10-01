import type { Actions, Event } from "../types.ts";
import executors from "../executors";

export const executeActions = (
  actions: Actions,
  event: Event
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Break condition since we use recursion
    // When there are no more actions, we resolve the promise
    // Without setting any more timeouts
    if (actions.length === 0) {
      resolve();
    }

    // Since delay for an action is given in minutes, we multiply by 60000
    const delayInMiliseconds = actions[0].delay * 60000;

    setTimeout(async () => {
      // We find the executor function that corresponds to the action type
      // For now, it will only ever be sendEmail, but more action types can be added
      const executor = executors[actions[0].type];

      if (!executor) {
        reject("Action does not have an executor function defined");
      }

      try {
        await executor(event);
      } catch (e) {
        // In case of an error executing an action, we will just stop all exectuion flow,
        // assuming actions are conditional on preceding actions.
        // If each action provided it's own error handling, this could be initiated here.
        reject(`Action failed: ${JSON.stringify(actions[0])}`);
      }

      // If the first event has been executed successfully, we make a recursive call
      // which will execute the next event after its own delay
      resolve(executeActions(actions.slice(1), event));
    }, delayInMiliseconds);
  });
};
