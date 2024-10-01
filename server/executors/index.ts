import { sendEmail } from "./sendEmail";

// Each action type is mapped onto an executor function
// All executor functions receive the event from the body of HTTP request
// so they can access event information needed during execution

const executors = {
  email: sendEmail,
};

export default executors;
