import { sendEmail } from "./sendEmail";
import { Action, Event } from "../types";

// Each action type is mapped onto an executor function
// All executor functions receive the event from the body of HTTP request
// so they can access event information needed during execution

const executors: Record<
  string,
  (event: Event, action: Action) => Promise<string>
> = {
  email: sendEmail,
};

export default executors;
