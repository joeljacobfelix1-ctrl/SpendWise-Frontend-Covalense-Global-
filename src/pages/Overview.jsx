import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, message } from 'antd';
import moment from 'moment';
import { getSummaryByMonth, getMonthlyTotals } from '../api/summaryApi';
import MonthlyBarChart from '../components/MonthlyBarChart';
import MonthlyPieChart from '../components/MonthlyPieChart';

const Overview = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMonthlyData();
  }, []);

  useEffect(() => {
    if (selectedMonth) loadCategoryData(selectedMonth);
  }, [selectedMonth]);

  const loadMonthlyData = async () => {
    setLoading(true);
    try {
      const monthly = await getMonthlyTotals();
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
      const summary = await getSummaryByMonth(month);
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

      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <MonthlyBarChart data={monthlyData} />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <MonthlyPieChart
            data={categoryData}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
