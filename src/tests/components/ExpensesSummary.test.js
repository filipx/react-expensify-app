import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpenseSummary with 1 expense corretly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with multiple expenses corretly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={2354544} />);
  expect(wrapper).toMatchSnapshot();
});