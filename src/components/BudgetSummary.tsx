import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { BudgetSummary as BudgetSummaryType } from '../types';
import { formatCurrency } from '../utils/formatters';

interface BudgetSummaryProps {
  summary: BudgetSummaryType;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({ summary }) => {
  const { totalIncome, totalExpenses, balance } = summary;

  const summaryCards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      className: 'summary-card-income',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      className: 'summary-card-expense',
    },
    {
      title: 'Balance',
      amount: balance,
      icon: DollarSign,
      className: balance >= 0 
        ? 'summary-card-balance-positive' 
        : 'summary-card-balance-negative',
    },
  ];

  return (
    <div className="budget-summary">
      {summaryCards.map(({ title, amount, icon: Icon, className }) => (
        <div
          key={title}
          className={`summary-card ${className}`}
        >
          <div className="summary-card-content">
            <div>
              <p className="summary-card-title">{title}</p>
              <p className="summary-card-amount">{formatCurrency(amount)}</p>
            </div>
            <Icon className="summary-card-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};