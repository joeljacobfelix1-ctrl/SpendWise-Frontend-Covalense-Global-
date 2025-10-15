// src/components/CategoryPieChart.jsx
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

const CategoryPieChart = ({ expenses }) => {
  // Aggregate expenses by category
  const pieData = useMemo(() => {
    const result = {};
    expenses.forEach((exp) => {
      if (result[exp.category]) {
        result[exp.category] += Number(exp.amount);
      } else {
        result[exp.category] = Number(exp.amount);
      }
    });
    return Object.keys(result).map((key) => ({ name: key, value: result[key] }));
  }, [expenses]);

  if (pieData.length === 0) {
    return <p>No data to display</p>;
  }

  return (
    <div style={{ width: '100%', height: 300, marginBottom: 16 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
