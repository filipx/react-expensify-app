import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({count} = {}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});
// ******* Reducers *******
// 1. Reducers are the "pure functions"
// 2. Never change  state or actions

const countReducer = (state = {count: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
      break;
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
      break;
    case 'RESET':
      return {
        count: state.count = 0
      }
      break;
    case 'SET':
      return {
        count: typeof action.count === 'number' ? action.count : state.count
      }
    default:
      return state;
  }
}

// ******* Store *******

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
  });

store.dispatch(incrementCount({ incrementBy: 5 }));
// unsubscribe();

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({count: 101}));
