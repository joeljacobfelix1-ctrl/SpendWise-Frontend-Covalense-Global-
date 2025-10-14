import api from './axios';

const getTokenHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// Fetch expenses with optional month & category filters
export const fetchExpenses = async ({ month, category } = {}) => {
  let url = '/expenses';
  const params = {};
  if (month) params.month = month;
  if (category) params.category = category;

  const res = await api.get(url, { headers: getTokenHeader(), params });
  return res.data;
};

export const addExpense = async (expense) => {
  const res = await api.post('/expenses', expense, { headers: getTokenHeader() });
  return res.data;
};

export const editExpense = async (id, expense) => {
  const res = await api.put(`/expenses/${id}`, expense, { headers: getTokenHeader() });
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await api.delete(`/expenses/${id}`, { headers: getTokenHeader() });
  return res.data;
};
