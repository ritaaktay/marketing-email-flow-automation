export type Email = {
  type: string;
  subject: string;
  body: string;
};

// Here we can add other types of actions in the future
export type Action = Email;

export type Step = {
  action: Action;
  sequence: number;
  delay: number;
};

export type Steps = Array<Step>;

export type Flow = {
  trigger: string;
  steps: Steps;
};

export type Flows = Array<Flow>;

export interface Event {
  eventName: string;
  userEmail: string;
}

export const isEvent = (obj: any): obj is Event => {
  return (
    obj &&
    typeof obj.eventName === "string" &&
    typeof obj.userEmail === "string"
  );
};
