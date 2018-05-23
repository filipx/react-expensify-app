import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expenses: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});

// SET_END_DATE
const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});

// Expenses Reducer
const expensesDefaultState = [];
const expensesReducer = (state = expensesDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expenses
      ]
      break;
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        }
      });
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id);
      break;
    default:
      return state;
  }
}

// Filters Reducer
const filtersDefaultState = {
  text: '',
  sortBy: 'rent',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersDefaultState,action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
      break;
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
      break;
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
      break;
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      }
      break;
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      }
      break;
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      }
      break;
    default:
      return state;
  }
}

// get Filtered Expenses
const getFilteredExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  })
  .sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  });
};

// Store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const filteredExpenses = getFilteredExpenses(state.expenses, state.filters)
  console.log(filteredExpenses);
  
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 4100, createdAt: 31000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, createdAt: 1000 })
);
// store.dispatch(
//   removeExpense({ id: expenseOne.expenses.id })
// );
// store.dispatch(
//   editExpense(expenseTwo.expenses.id, { amount: 400 })
// );
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));




// const demoState = {
//   expenses: [{
//     id: '09l43EDujf049urj',
//     description: 'January rent',
//     note: 'This was the final payment for this address.',
//     amount: 54500,
//     createdAt: 0
//   }],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount', // date or amount
//     startDate: undefined,
//     endDate: undefined
//   }
// }
