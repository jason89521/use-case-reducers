# Use Case Reducers

[![npm](https://img.shields.io/npm/v/use-case-reducers)](https://www.npmjs.com/package/use-case-reducers)

`useCaseReducers` simplifies the work when you are using React's `useReducer`. Its api is almost the same as `useReducer`, so there are just a few things that you need to learn if you have already been familiar with `useReducer`.

## Table of Contents

- [Why use this package?](#Whyusethispackage)
- [What is a case reducer?](#Whatisacasereducer)
- [API Reference](#APIReference)
  - [`useCaseReducers`](#useCaseReducers)
    - [The types of actions](#Thetypesofactions)
  - [`createCaseReducers`](#createCaseReducers)

## 1. <a name='Whyusethispackage'></a>Why use this package?

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

## 2. <a name='Whatisacasereducer'></a>What is a case reducer?

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

## 3. <a name='APIReference'></a>API Reference

### 3.1. <a name='useCaseReducers'></a>`useCaseReducers`

```js
import useCaseReducers from 'use-case-reducers';

const [state, dispatch] = useCaseReducers(caseReducers, initArg, init);
```

The only difference between `useCaseReducers` and `useReducer` is the first parameter and `dispatch`. The first parameter is an object with all the case reducers you need. The returned `dispatch` of `useCaseReducers` is not a function, but an object with all actions. Here is an example of how to use `useCaseReducers`:

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

#### 3.1.1. <a name='Thetypesofactions'></a>The types of actions

There are two types of actions, `ActionWithoutPayload` and `ActionWithPayload`. To generate an action with type `ActionWithoutPayload`, the case reducer should be writed as:

```js
// no parameter
const reset = () => 0;
// the parameter only contains `state`
const increment = state => state + 1;
```

Then the type of the returned `dispatch` will look like:

```ts
type Dispatch = {
  reset: () => void;
  increment: () => void;
};
```

To generate an action with type `ActionWithPayload`, the case reducer should be writed as:

```js
const add = (state, amount) => state + amount;
const sub = (state, amount) => state - amount;
const addTwoAmount = (state, amount1, amount2) => state + amount1 + amount2;
```

Then the type of the returned `dispatch` will look like:

```ts
type Dispatch = {
  add: (amount: number) => void;
  sub: (amount: number) => void;
  addTwoAmount: (amount1: number, amount2: number) => void;
};
```

Note that you can use arbitrary number of parameters for your case reducer. The first parameter is the state, and the rest parameters are the payload of your action.

When you call these methods of the returned `dispatch`, the corresponding action will be dispatched to the internal reducer.

### 3.2. <a name='createCaseReducers'></a>`createCaseReducers`

```ts
import { createCaseReducers } from 'use-case-reducers';

const typedCaseReducers = createCaseReducers(state, caseReducers);
```

If you are a typescript user, write a plain object of case reducers may be verbose. For example, if we want to write an object of case reducers to handle a state whose type is `number`, we should write something like the following code:

```ts
const caseReducers = {
  increment: (state: number) => state + 1,
  decrement: (state: number) => state - 1,
  add: (state: number, amount: number) => state + amount,
  sub: (state: number, amount: number) => state - amount,
};
```

As you can see, although the type of the `state` is the same, we need to specify its type for every case reducer.

An alternative solution is to use `createCaseReducers`. It can generate a well type defined object without specifing the type of `state` for every case reducer. Here is an example of how to use `createCaseReducers`:

```ts
const caseReducers = createCaseReducers(0, {
  increment: state => state + 1,
  decrement: state => state - 1,
  add: (state, amount: number) => state + amount,
  sub: (state, amount: number) => state - amount,
});
```

The value of the first parameter does not important, just make sure that its type is the type of your state.
