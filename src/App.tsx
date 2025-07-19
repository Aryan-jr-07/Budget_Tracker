import React, { useMemo } from 'react';
import { Wallet } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { BudgetSummary } from './components/BudgetSummary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction, BudgetSummary as BudgetSummaryType } from './types';

function AppContent() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('budget-tracker-transactions', []);

  const budgetSummary: BudgetSummaryType = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <div className="container py-8">
        <header className="header">
          <div className="header-content">
            <div className="header-icon">
              <Wallet />
            </div>
            <div>
              <h1 className="header-title">
                Budget Tracker
              </h1>
              <p className="header-subtitle">
                Take control of your finances
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <BudgetSummary summary={budgetSummary} />
        <TransactionForm onAddTransaction={addTransaction} />
        <TransactionList 
          transactions={transactions} 
          onDeleteTransaction={deleteTransaction} 
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;