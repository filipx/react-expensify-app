// Expenses Reducer

const expensesDefaultState = [];

export default (state = expensesDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ]
      break;
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id);
      break;
    default:
      return state;
  }
}
