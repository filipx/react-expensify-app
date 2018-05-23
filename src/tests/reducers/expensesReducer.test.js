import expensesReducer from '../../reducers/expensesReducer';
import expenses from '../fixtures/expenses';

test('should setup default expenses values', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should setup remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not setup remove expense if id not found', () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should setup add expense', () => {
  const expense = {
    id: '3',
    description: 'Last rent',
    note: '',
    amount: 1200,
    createdAt: 0
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ ...expenses, expense ]);
});

test('should setup edit expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description: 'Gas bill'
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe('Gas bill');
});

test('should not setup edit expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-2',
    updates: {
      description: 'Gas bill'
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});