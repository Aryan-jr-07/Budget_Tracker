import React, { useState } from 'react';
import { Search, Trash2, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="card">
      <h2 className="card-title">
        <Filter />
        Transaction History
      </h2>

      <div className="filters-container">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input form-input-search"
          />
        </div>

        <div className="filter-buttons">
          {(['all', 'income', 'expense'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`button button-secondary capitalize ${
                filterType === type
                  ? 'active'
                  : ''
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">No transactions found</div>
          <div className="empty-state-subtitle">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Add your first transaction to get started'}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="transaction-item"
            >
              <div className="transaction-content">
                <div className={`transaction-icon ${
                  transaction.type === 'income' 
                    ? 'transaction-icon-income' 
                    : 'transaction-icon-expense'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp />
                  ) : (
                    <TrendingDown />
                  )}
                </div>
                <div className="transaction-details">
                  <h3>
                    {transaction.description}
                  </h3>
                  <p>
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="transaction-amount">
                <span className={`amount-text ${
                  transaction.type === 'income' 
                    ? 'amount-income' 
                    : 'amount-expense'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="button-icon"
                  aria-label="Delete transaction"
                >
                  <Trash2 style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};