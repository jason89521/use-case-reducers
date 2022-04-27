# Use Case Reducers

`useCaseReducers` simplifies the work when you are using React's `useReducer`. Its api is almost the same as `useReducer`, so there are just a few things that you need to learn if you have already been familiar with `useReducer`.

## Why use this package?

Although `useReducer` is great, writing a reducer is kind of annoying, especially when we need to handle more actions. Suppose we need to handle 10 actions with our state, then we need to write 10 `switch/case` of 10 `if/else` to deal with these actions. Sounds terrible, right?

Furthermore, when we use `useReducer`, we probably don't want to dispatch an action by writing `dispatch({type: 'addTodo', payload: newTodo})`. The common use case we prefer may be writing an action creator for each action. For example, we may write:

```js
// An action creator returns the action of adding a to-do
const addTodo = newTodo => ({ type: 'addTodo', payload: newTodo });
// Dispatch a action of adding a to-do by passing a action creator
dispatch(addTodo(newTodo));
```

Action creators help us writing cleaner code. But again, what if we need to handle so many actions? We definitely don't want to write these action creators manually, right?

`useCaseReducers` comes to the rescue! With `useCaseReducers`, we don't need to write a lot of `switch/case` and a lot of action creators. All we need to do is passing an object of case reducers, then `useCaseReducers` will generate a reducer and all action creators automatically.

## What is a case reducer?

The difference between a case reducer and a normal reducer is that a case reducer only handles one action while a normal reducer handles all actions. For example, if we use a reducer to handle a counter state, we may write:

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'add':
      return state + action.payload;
    case 'sub':
      return state - action.payload;
  }
};
```

We can split the above reducer into 4 case reducers:

```js
const increment = state => state + 1;
const decrement = state => state - 1;
const add = (state, amount) => state + amount;
const sub = (state, amount) => state - amount;
```

As you can see, writing a case reducer is very easy.

## API Reference

```js
const [state, dispatch] = useCaseReducers(caseReducers, initArg, init);
```

The only difference between `useCaseReducers` and `useReducer` is the first parameter. In `useCaseReducers`, the first parameter is an object with all the case reducers you need. Here is an example:

```jsx
const initialState = 0;
const caseReducers = {
  increment: state => state + 1,
  decrement: state => state - 1,
  add: (state, amount) => state + amount,
  sub: (state, amount) => state - amount,
};

const Counter = () => {
  const [count, dispatch] = useCaseReducers(caseReducers, initialState);

  return (
    <div>
      count: {count}
      <button onClick={() => dispatch.increment()}>+</button>
      <button onClick={() => dispatch.decrement()}>-</button>
      <button onClick={() => dispatch.add(10)}>add 10</button>
      <button onClick={() => dispatch.sub(10)}>minus 10</button>
    </div>
  );
};
```
