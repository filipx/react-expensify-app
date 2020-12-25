import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, startSetExpenses, setExpenses } from '../../actions/expensesActions';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref("expenses").set(expensesData).then(() => done());
});

test("should setup remove expense action", () => {
  const action = removeExpense({ id: "123asd" })
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123asd"
  });
});

test("should setup edit expense action", () => {
  const action = editExpense("bab99d90-6ede-4ff5-8d9a-506e85dc47f1", {
    amount: "2000", 
    createdAt: "1523268000000", 
    note: "edited"
  });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: "bab99d90-6ede-4ff5-8d9a-506e85dc47f1",
    updates: {
      amount: "2000",
      createdAt: "1523268000000",
      note: "edited"
    }
  });
});
test("should setup add expense action with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is cool',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    createdAt: 0,
    note: ''
  }
  store.dispatch(startAddExpense({ }))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('should setup set expense action with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test ('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
