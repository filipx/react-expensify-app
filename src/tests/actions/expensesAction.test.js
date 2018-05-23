import { addExpense, editExpense, removeExpense } from '../../actions/expensesActions';

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
  const action = addExpense({
    description: "bla bla",
    amount: 200,
    createdAt: 12093849,
    note: ""
  });
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "bla bla",
      amount: 200,
      createdAt: 12093849,
      note: ""
    }
  })
});

test("should setup add expense action with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: '',
      amount: 0,
      createdAt: 0,
      note: ''
    }
  })
})