import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expensesActions';

export class EditExpensePage extends React.Component {
  onEditExpense = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }
  onRemoveExpense = () => {
    this.props.removeExpense({ id : this.props.expense.id });
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <ExpenseForm 
          expense={this.props.expense} 
          onSubmit={this.onEditExpense}
        />
        <br />
        <button onClick={this.onRemoveExpense}>Remove Expense</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);