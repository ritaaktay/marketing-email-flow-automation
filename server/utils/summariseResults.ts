import type { Action } from "../types";

export const summariseResults = (
  completed: Array<String>,
  error?: string,
  action?: Action
): string => {
  let summary: string = "";
  if (completed.length > 0) {
    summary += `👍 Completed:\n${completed.join(",\n")}\n`;
  }
  if (error) {
    summary += `👎 Failed:\n${error}\nAction: ${JSON.stringify(action)}`;
  }
  return summary;
};
