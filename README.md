# Stratford Socks API

An email automation workflow service API for Stratford Socks

# Get Started

- run `yarn install` at root to install all dependencies
- run `yarn start` to start the server listening on localhost:8000
- send a POST request to `localhost:8000/event` with event data in the body\
  Ex.

  ```
  {
  	eventName: "websiteSignup"
    userEmail: "pete@healthtech1.uk"
  }
  ```

# Concepts

- `Flow` -> a trigger (event name) associated with a series of steps
- `Step` -> a combination of an action, a sequence, and a delay
- `Action` -> an action, ex. of type "email", with data needed to execute it
- `Executor` -> a function that executes an action, ex. sending an email

# Solution

The Express application uses a router to handle all requests to the `/event` endpoint.

The router finds a `flow` with a `trigger` matching the event name, and executes it.

Flow execution is done via recursion, which will set a timer for the execution of each subsequent `step` once the async action has been completed.

Each `step` defines the `delay` preceding it, so they can be chained.

# ToDos

- Error handling
- Input validation
- Tests
- Documentation
- README
