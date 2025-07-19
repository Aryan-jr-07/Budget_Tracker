import React, { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
  expense: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other Expense'],
};

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) return;

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });

    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <DollarSign />
        Add Transaction
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Type
            </label>
            <div className="button-group">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`button ${
                  type === 'income'
                    ? 'button-income'
                    : 'button-secondary'
                }`}
                style={{ flex: 1 }}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`button ${
                  type === 'expense'
                    ? 'button-expense'
                    : 'button-secondary'
                }`}
                style={{ flex: 1 }}
              >
                Expense
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select a category</option>
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            placeholder="Enter description"
            required
          />
        </div>

        <button
          type="submit"
          className="button button-primary button-full"
        >
          <Plus />
          Add Transaction
        </button>
      </form>
    </div>
  );
};