// src/components/MonthlyPieChart.jsx
import React from 'react';
import { Card, DatePicker } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B10DC9', '#FF4136'];

const MonthlyPieChart = ({ data, selectedMonth, onMonthChange }) => {
  if (!data || data.length === 0) return <p>No data available for this month</p>;

  return (
    <Card title={`Expenses by Category (${selectedMonth})`}>
      <DatePicker
        picker="month"
        value={moment(selectedMonth)}
        onChange={(val) => onMonthChange(val ? val.format('YYYY-MM') : '')}
        style={{ marginBottom: 16 }}
      />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.map((d) => ({ name: d.category, value: parseFloat(d.total) }))}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyPieChart;
