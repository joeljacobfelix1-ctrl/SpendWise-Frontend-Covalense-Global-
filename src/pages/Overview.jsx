import React, { useState, useEffect } from 'react';
import { Row, Col, Card, DatePicker, Spin, message } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from 'recharts';
import moment from 'moment';
import { getSummaryByMonth, getMonthlyTotals } from '../api/summaryApi';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B10DC9', '#FF4136'];

const Overview = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load monthly bar chart (yearly data) on component mount
  useEffect(() => {
    loadMonthlyData();
  }, []);

  // Load pie chart data whenever selectedMonth changes
  useEffect(() => {
    if (selectedMonth) loadCategoryData(selectedMonth);
  }, [selectedMonth]);

  const loadMonthlyData = async () => {
    setLoading(true);
    try {
      const monthly = await getMonthlyTotals(); // should return [{month: '2025-01', total: 1000}, ...]
      setMonthlyData(monthly);
    } catch (err) {
      message.error('Failed to load monthly data');
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (month) => {
    setLoading(true);
    try {
      const summary = await getSummaryByMonth(month); // should return [{category: 'Food', total: 200}, ...]
      setCategoryData(summary);
    } catch (err) {
      message.error('Failed to load category data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Overview</h2>

      {loading && <Spin size="large" style={{ marginBottom: 20 }} />}

      {/* Top: Bar chart showing monthly expenses */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Card title="Monthly Spending Trend (This Year)">
            {monthlyData.length === 0 ? (
              <p>No monthly data</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(val) => moment(val + '-01').format('MMM')}
                  />
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

      {/* Bottom: Month picker + Pie chart */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title={`Expenses by Category (${selectedMonth})`}>
            <DatePicker
              picker="month"
              value={moment(selectedMonth)}
              onChange={(val) => setSelectedMonth(val ? val.format('YYYY-MM') : '')}
              style={{ marginBottom: 16 }}
            />

            {categoryData.length === 0 ? (
              <p>No data available for this month</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData.map((d) => ({ name: d.category, value: parseFloat(d.total) }))}
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
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
