import type { Event, Email } from "../types";

// The event data from the request and the action data from the flow step
// are both passed through so we can send the given content to the
// required email address
export const sendEmail = async (
  event: Event,
  email: Email
): Promise<string> => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Simulating an asynchronous operation, e.g., sending an email
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 95% chance to return true, 5% chance to return false - emails fail
  if (randomNumber < 0.95) {
    return `Sent an email to ${event.userEmail} with subject "${email.subject}"`;
  } else {
    // Throw error if email has failed
    throw new Error("Failed to send email");
  }
};
