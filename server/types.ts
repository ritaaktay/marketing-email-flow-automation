export type Email = {
  type: string;
  sequence: number;
  delay: number;
  subject: string;
  body: string;
};

export type Actions = Array<Email>;

export type Flow = {
  trigger: string;
  actions: Actions;
};

export type Flows = Array<Flow>;

export type Event = {
  eventName: string;
  userEmail: string;
};
