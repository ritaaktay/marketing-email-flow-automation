import type { Event } from "../types";

// The event data from the request is passed through so the email
// can be sent to the user's address, and other details can also
// be used in the future.
export const sendEmail = async (event: Event): Promise<boolean> => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Simulating an asynchronous operation, e.g., sending an email
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 95% chance to return true, 5% chance to return false - emails fail
  if (randomNumber < 0.95) {
    return true;
  } else {
    // Throw error if email has failed
    throw new Error("Failed to send email");
  }
};
