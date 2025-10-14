import api from './axios';

export const getExpenses = async (month, category) => {
  let url = '/expenses';
  if (month) url = `/expenses/summary?month=${month}`;
  if (category) url = `/expenses?category=${category}`;

  const response = await api.get(url);
  return response.data;
};
