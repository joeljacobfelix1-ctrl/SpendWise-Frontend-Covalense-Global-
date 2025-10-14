import api from './axios';

export const exportExpenses = async (month) => {
  try {
    const url = month ? `/expenses/export?month=${month}` : '/expenses/export';
    const response = await api.get(url, {
      responseType: 'blob', // important to receive file
    });

    // Convert blob to downloadable file
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', month ? `expenses-${month}.csv` : 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Export failed:', error);
    if (error.response?.data?.message === 'No expenses found') {
      alert('No expenses found for the selected filter.');
    } else {
      alert('Failed to download CSV.');
    }
  }
};
