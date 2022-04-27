# Use Case Reducer

`useCaseReducer` simplifies the work when you are using React's `useReducer`. Its api is almost the same as `useReducer`, so there are just a few things that you need to learn if you have already been familiar with `useReducer`.

## Why Use This Package?

Although `useReducer` is great, writing a reducer is kind of annoying especially when we need to more actions. Suppose we need to handle 10 actions with our state, then we need to write 10 `switch/case` of 10 `if/else` to deal with these actions. Sounds terrible, right?

Furthermore, when we use `useReducer`, we probably don't want to dispatch an action by writing `dispatch({type: 'addTodo', payload: newTodo})`
