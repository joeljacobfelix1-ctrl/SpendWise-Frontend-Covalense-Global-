import axios from './axios';

export const getSummaryByMonth = async (month) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`/expenses/summary?month=${month}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // [{ category: 'Food', total: 3200 }, ...]
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMonthlyTotals = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/expenses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Aggregate by month
    const totals = {};
    res.data.forEach(e => {
      const month = e.date.slice(0, 7); // "YYYY-MM"
      totals[month] = (totals[month] || 0) + parseFloat(e.amount);
    });
    return Object.entries(totals).map(([month, total]) => ({ month, total }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
