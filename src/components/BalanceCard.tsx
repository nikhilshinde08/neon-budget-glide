import { Eye, EyeOff, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { useAccounts, useTransactions } from "@/hooks/useFinanceData";

export function BalanceCard() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { accounts, loading: accountsLoading } = useAccounts();
  const { transactions, loading: transactionsLoading } = useTransactions();

  const { totalBalance, monthlyChange, changePercentage, monthlyIncome, monthlyExpenses } = useMemo(() => {
    const total = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
    
    // Calculate monthly change from transactions
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyTransactions = transactions.filter(t => 
      new Date(t.transaction_date) >= startOfMonth
    );
    
    const income = monthlyTransactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expenses = monthlyTransactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
    
    const change = income - expenses;
    const percentage = total > 0 ? (change / total) * 100 : 0;

    return {
      totalBalance: total,
      monthlyChange: change,
      changePercentage: percentage,
      monthlyIncome: income,
      monthlyExpenses: expenses
    };
  }, [accounts, transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const isLoading = accountsLoading || transactionsLoading;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary via-accent to-secondary text-white border-0 shadow-xl animate-fade-in hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/80 text-sm">Total Balance</p>
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Skeleton className="h-8 w-32 bg-white/20" />
            ) : (
              <h2 className="text-3xl font-bold animate-bounce-gentle">
                {isBalanceVisible ? formatCurrency(totalBalance) : "••••••••"}
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
            >
              {isBalanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          {monthlyChange >= 0 ? (
            <TrendingUp className="w-6 h-6 text-income" />
          ) : (
            <TrendingDown className="w-6 h-6 text-expense" />
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 bg-white/20" />
            <Skeleton className="h-5 w-24 bg-white/20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 bg-white/20" />
            <Skeleton className="h-5 w-24 bg-white/20" />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="animate-slide-up">
            <p className="text-white/80 text-xs">Monthly Income</p>
            <p className="text-lg font-semibold text-income">
              {isBalanceVisible ? `+${formatCurrency(monthlyIncome)}` : "••••••"}
            </p>
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-white/80 text-xs">Monthly Expense</p>
            <p className="text-lg font-semibold text-expense">
              {isBalanceVisible ? `-${formatCurrency(monthlyExpenses)}` : "••••••"}
            </p>
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-white/80 text-xs">Net Change</p>
            <p className={`text-lg font-semibold ${monthlyChange >= 0 ? 'text-income' : 'text-expense'}`}>
              {isBalanceVisible 
                ? `${monthlyChange >= 0 ? '+' : ''}${formatCurrency(monthlyChange)}`
                : "••••••"
              }
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}