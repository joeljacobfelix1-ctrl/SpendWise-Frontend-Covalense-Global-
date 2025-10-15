// src/components/MonthlyBarChart.jsx
import React from 'react';
import { Card } from 'antd';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';

const MonthlyBarChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No monthly data</p>;

  return (
    <Card title="Monthly Spending Trend (This Year)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(val) => moment(val + '-01').format('MMM')} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyBarChart;
