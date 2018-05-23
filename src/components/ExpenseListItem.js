import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>
    <h2><Link to={`/edit/${id}`}>{description}</Link></h2>
    <p>{amount / 100}$ {createdAt > 0 && <small>- at: {createdAt}</small>}</p>
  </div>
);

export default ExpenseListItem;