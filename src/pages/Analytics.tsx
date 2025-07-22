import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAccounts, useTransactions } from "@/hooks/useFinanceData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const Analytics = () => {
  const navigate = useNavigate();
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();

  // Calculate analytics data
  const totalBalance = accounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;
  const totalIncome = transactions?.filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0) || 0;
  const totalExpenses = transactions?.filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

  // Monthly spending trend
  const monthlyData = transactions?.reduce((acc, transaction) => {
    const month = new Date(transaction.transaction_date).toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      if (transaction.transaction_type === 'expense') {
        existing.expenses += Number(transaction.amount);
      } else {
        existing.income += Number(transaction.amount);
      }
    } else {
      acc.push({
        month,
        expenses: transaction.transaction_type === 'expense' ? Number(transaction.amount) : 0,
        income: transaction.transaction_type === 'income' ? Number(transaction.amount) : 0,
      });
    }
    return acc;
  }, [] as any[]) || [];

  // Category breakdown
  const categoryData = transactions?.reduce((acc, transaction) => {
    if (transaction.transaction_type === 'expense') {
      const existing = acc.find(item => item.category === transaction.category);
      if (existing) {
        existing.amount += Number(transaction.amount);
      } else {
        acc.push({
          category: transaction.category,
          amount: Number(transaction.amount),
        });
      }
    }
    return acc;
  }, [] as any[]) || [];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Analytics</h1>
          <div className="w-5" />
        </div>

        <div className="p-4 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xl font-bold text-green-500">${totalIncome.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-xl font-bold text-red-500">${totalExpenses.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
              <CardDescription>Your income vs expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Where your money goes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Savings Rate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PiggyBank className="w-5 h-5" />
                <span>Savings Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0}%
                </div>
                <p className="text-sm text-muted-foreground">
                  You're saving ${(totalIncome - totalExpenses).toFixed(2)} per month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        <BottomNav />
      </div>
    </div>
  );
};

export default Analytics;