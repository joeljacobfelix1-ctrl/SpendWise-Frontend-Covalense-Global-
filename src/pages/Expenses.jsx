import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import moment from 'moment';
import { fetchExpenses, addExpense, editExpense, deleteExpense } from '../api/expenses';
import { exportExpenses } from '../api/exportApi';
import CategoryPieChart from '../components/CategoryPieChart';

const { Option } = Select;

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [monthFilter, setMonthFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [form] = Form.useForm();

  const categories = ['Food', 'Health', 'Travel', 'Shopping', 'Other'];

  // Load expenses from API
  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses({ month: monthFilter, category: categoryFilter });
      setExpenses(data);
    } catch (err) {
      console.error(err);
      message.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [monthFilter, categoryFilter]);

  // Open modal to add/edit
  const openModal = (expense = null) => {
    setEditingExpense(expense);
    if (expense) {
      form.setFieldsValue({
        category: expense.category,
        amount: expense.amount,
        date: moment(expense.date),
        note: expense.note,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      message.success('Expense deleted');
      loadExpenses();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete expense');
    }
  };

  // Add or edit expense
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        category: values.category,
        amount: values.amount,
        date: values.date.format('YYYY-MM-DD'),
        note: values.note,
      };

      if (editingExpense) {
        await editExpense(editingExpense.id, payload);
        message.success('Expense updated');
      } else {
        await addExpense(payload);
        message.success('Expense added');
      }
      setIsModalVisible(false);
      loadExpenses();
    } catch (err) {
      console.error(err);
      message.error('Failed to save expense');
    }
  };

  // Export CSV
  const handleExportCSV = async () => {
    try {
      await exportExpenses(monthFilter);
      message.success('CSV downloaded successfully');
    } catch (err) {
      console.error(err);
      message.error('Failed to download CSV');
    }
  };

  // Table columns
  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date', 
      render: (text) => moment(text).format('YYYY-MM-DD') 
    },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={() => openModal(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Filters and buttons */}
      <div style={{ marginBottom: 16, display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Select
          placeholder="Filter by month"
          style={{ width: 200 }}
          allowClear
          value={monthFilter || undefined}
          onChange={(val) => setMonthFilter(val)}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, '0');
            return <Option key={i} value={`2025-${month}`}>{moment(`2025-${month}-01`).format('MMMM YYYY')}</Option>;
          })}
        </Select>

        <Select
          placeholder="Filter by category"
          style={{ width: 200 }}
          allowClear
          value={categoryFilter || undefined}
          onChange={(val) => setCategoryFilter(val)}
        >
          {categories.map((cat) => <Option key={cat} value={cat}>{cat}</Option>)}
        </Select>

        <Button type="primary" onClick={() => openModal()}>Add Expense</Button>
        <Button onClick={handleExportCSV} style={{ backgroundColor: '#52c41a', color: 'white' }}>
          Download CSV
        </Button>
      </div>

      {/* Pie Chart Component */}
      <CategoryPieChart expenses={expenses} />

      {/* Expense Table */}
      <Table 
        columns={columns} 
        dataSource={expenses} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 5 }} 
      />

      {/* Modal for add/edit */}
      <Modal
        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter category' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter amount' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Expenses;
