import React from 'react';
import { Card, Select } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B10DC9', '#FF4136'];

const { Option } = Select;

const MonthlyPieChart = ({ data, selectedMonth, onMonthChange }) => {
  const currentYear = dayjs().year();

  // Generate month options like 2025-01, 2025-02, etc.
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    const formatted = `${currentYear}-${month}`;
    return {
      value: formatted,
      label: dayjs(formatted).format('MMMM YYYY'),
    };
  });

  if (!data || data.length === 0)
    return (
      <Card
        title={`Expenses by Category (${selectedMonth || 'No Month Selected'})`}
        style={{ textAlign: 'center' }}
      >
        <Select
          placeholder="Select month"
          style={{ width: 220, marginBottom: 16 }}
          value={selectedMonth || undefined}
          onChange={(val) => onMonthChange(val)}
          allowClear
          options={monthOptions}
        />
        <p>No data available for this month</p>
      </Card>
    );

  return (
    <Card title={`Expenses by Category (${selectedMonth})`}>
      <Select
        placeholder="Select month"
        style={{ width: 220, marginBottom: 16 }}
        value={selectedMonth || undefined}
        onChange={(val) => onMonthChange(val)}
        allowClear
        options={monthOptions}
      />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.map((d) => ({
              name: d.category,
              value: parseFloat(d.total),
            }))}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
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
