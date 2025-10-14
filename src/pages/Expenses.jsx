// src/pages/Expenses.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/expenses'); // Authorization header auto added
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>{e.name} - ₹{e.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
