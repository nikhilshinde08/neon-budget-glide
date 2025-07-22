import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, PiggyBank, TrendingUp, Target, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const SavingsPrediction = () => {
  const navigate = useNavigate();
  const [monthlySavings, setMonthlySavings] = useState('500');
  const [savingsGoal, setSavingsGoal] = useState('10000');
  const [timeframe, setTimeframe] = useState('24');

  // Calculate savings projection
  const calculateProjection = () => {
    const monthly = parseFloat(monthlySavings) || 0;
    const months = parseInt(timeframe) || 12;
    
    const data = [];
    for (let i = 0; i <= months; i++) {
      data.push({
        month: i,
        savings: monthly * i,
        interest: monthly * i * 0.02 * (i / 12), // 2% annual interest
        total: (monthly * i) + (monthly * i * 0.02 * (i / 12))
      });
    }
    return data;
  };

  const projectionData = calculateProjection();
  const finalAmount = projectionData[projectionData.length - 1]?.total || 0;
  const goalAmount = parseFloat(savingsGoal) || 0;
  const monthsToGoal = goalAmount > 0 && parseFloat(monthlySavings) > 0 
    ? Math.ceil(goalAmount / parseFloat(monthlySavings)) 
    : 0;

  // Different scenarios
  const scenarios = [
    { name: "Conservative", monthly: parseFloat(monthlySavings) * 0.5, color: "#ef4444" },
    { name: "Current Plan", monthly: parseFloat(monthlySavings), color: "#3b82f6" },
    { name: "Aggressive", monthly: parseFloat(monthlySavings) * 1.5, color: "#10b981" }
  ];

  const scenarioData = scenarios.map(scenario => {
    const totalAfterTime = scenario.monthly * parseInt(timeframe);
    const withInterest = totalAfterTime + (totalAfterTime * 0.02 * (parseInt(timeframe) / 12));
    return {
      ...scenario,
      total: withInterest
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Savings Prediction</h1>
          <div className="w-5" />
        </div>

        <div className="p-4 space-y-6">
          {/* Savings Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Savings Calculator</span>
              </CardTitle>
              <CardDescription>Plan your financial future</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="monthly-savings">Monthly Savings ($)</Label>
                <Input
                  id="monthly-savings"
                  type="number"
                  placeholder="500"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="savings-goal">Savings Goal ($)</Label>
                <Input
                  id="savings-goal"
                  type="number"
                  placeholder="10000"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="timeframe">Timeframe (months)</Label>
                <Input
                  id="timeframe"
                  type="number"
                  placeholder="24"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <PiggyBank className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold text-green-500">
                  ${finalAmount.toFixed(0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Saved</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold text-blue-500">
                  {monthsToGoal || '--'}
                </p>
                <p className="text-sm text-muted-foreground">Months to Goal</p>
              </CardContent>
            </Card>
          </div>

          {/* Savings Projection Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Growth</CardTitle>
              <CardDescription>Your money growing over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Principal"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="With Interest"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Scenarios</CardTitle>
              <CardDescription>Compare different savings amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenarioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Savings Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Savings Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 mt-1 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Automate Your Savings</p>
                    <p className="text-xs text-muted-foreground">Set up automatic transfers to your savings account</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Target className="w-4 h-4 mt-1 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Start Small</p>
                    <p className="text-xs text-muted-foreground">Even $50/month adds up to $600+ per year</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <PiggyBank className="w-4 h-4 mt-1 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">High-Yield Savings</p>
                    <p className="text-xs text-muted-foreground">Find accounts with better interest rates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          {goalAmount > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress to ${goalAmount.toLocaleString()}</span>
                    <span>{((finalAmount / goalAmount) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((finalAmount / goalAmount) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {finalAmount >= goalAmount 
                      ? '🎉 Goal achieved!' 
                      : `$${(goalAmount - finalAmount).toFixed(0)} remaining`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        <BottomNav />
      </div>
    </div>
  );
};

export default SavingsPrediction;