import React, { useEffect, useState } from 'react';
import { Card, Row, Col, DatePicker, Select, Spin, message } from 'antd';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';
import moment from 'moment';
import { getSummaryByMonth, getMonthlyTotals } from '../api/summaryApi';

const { Option } = Select;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B10DC9', '#FF4136'];

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('pie');

  useEffect(() => {
    loadCharts(selectedMonth);
  }, [selectedMonth]);

  const loadCharts = async (month) => {
    setLoading(true);
    try {
      const [summary, monthly] = await Promise.all([
        getSummaryByMonth(month),
        getMonthlyTotals(),
      ]);
      setCategoryData(summary);
      setMonthlyData(monthly);
    } catch (err) {
      message.error('Failed to load chart data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Expense Analytics</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <DatePicker
          picker="month"
          value={moment(selectedMonth)}
          onChange={(val) => setSelectedMonth(val ? val.format('YYYY-MM') : '')}
        />

        <Select value={chartType} onChange={(val) => setChartType(val)} style={{ width: 180 }}>
          <Option value="pie">Pie Chart (by Category)</Option>
          <Option value="bar">Bar Chart (by Category)</Option>
        </Select>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title={`Expenses by Category (${selectedMonth})`}>
              {categoryData.length === 0 ? (
                <p>No data available for this month</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  {chartType === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={categoryData.map(d => ({ name: d.category, value: parseFloat(d.total) }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  ) : (
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              )}
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Monthly Spending Trend">
              {monthlyData.length === 0 ? (
                <p>No monthly data</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Analytics;
