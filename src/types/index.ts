export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export type Theme = 'light' | 'dark';