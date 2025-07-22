import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, TrendingDown, Calculator, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DebtManagement = () => {
  const navigate = useNavigate();
  const [debtAmount, setDebtAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');

  // Mock debt data - in real app this would come from database
  const debts = [
    {
      id: 1,
      name: "Credit Card 1",
      balance: 3500,
      minPayment: 105,
      interestRate: 18.99,
      type: "Credit Card"
    },
    {
      id: 2,
      name: "Student Loan",
      balance: 12000,
      minPayment: 150,
      interestRate: 4.5,
      type: "Student Loan"
    },
    {
      id: 3,
      name: "Car Loan",
      balance: 8500,
      minPayment: 285,
      interestRate: 6.2,
      type: "Auto Loan"
    }
  ];

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);

  // Calculate payoff time and interest
  const calculatePayoff = (balance: number, rate: number, payment: number) => {
    if (payment <= (balance * (rate / 100 / 12))) {
      return { months: Infinity, totalInterest: Infinity };
    }
    
    const monthlyRate = rate / 100 / 12;
    const months = Math.ceil(-Math.log(1 - (balance * monthlyRate / payment)) / Math.log(1 + monthlyRate));
    const totalPaid = payment * months;
    const totalInterest = totalPaid - balance;
    
    return { months, totalInterest };
  };

  // Debt avalanche vs snowball
  const debtAvalanche = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  const debtSnowball = [...debts].sort((a, b) => a.balance - b.balance);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Debt Management</h1>
          <div className="w-5" />
        </div>

        <div className="p-4 space-y-6">
          {/* Debt Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span>Debt Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">${totalDebt.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Debt</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">${totalMinPayment}</p>
                  <p className="text-sm text-muted-foreground">Min. Payment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Debts */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Your Debts</h2>
            {debts.map((debt) => {
              const payoff = calculatePayoff(debt.balance, debt.interestRate, debt.minPayment);
              return (
                <Card key={debt.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{debt.name}</h3>
                        <p className="text-sm text-muted-foreground">{debt.type}</p>
                      </div>
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Balance:</span>
                        <span className="font-medium">${debt.balance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Interest Rate:</span>
                        <span>{debt.interestRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Min. Payment:</span>
                        <span>${debt.minPayment}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payoff Time:</span>
                        <span>{payoff.months === Infinity ? 'Never' : `${payoff.months} months`}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Debt Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Payoff Strategies</CardTitle>
              <CardDescription>Choose the best approach for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h3 className="font-medium mb-2">💰 Debt Avalanche</h3>
                  <p className="text-sm text-muted-foreground mb-2">Pay minimums, then attack highest interest rate first</p>
                  <div className="text-sm space-y-1">
                    {debtAvalanche.map((debt, index) => (
                      <div key={debt.id} className="flex justify-between">
                        <span>{index + 1}. {debt.name}</span>
                        <span>{debt.interestRate}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <h3 className="font-medium mb-2">⛄ Debt Snowball</h3>
                  <p className="text-sm text-muted-foreground mb-2">Pay minimums, then attack smallest balance first</p>
                  <div className="text-sm space-y-1">
                    {debtSnowball.map((debt, index) => (
                      <div key={debt.id} className="flex justify-between">
                        <span>{index + 1}. {debt.name}</span>
                        <span>${debt.balance.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Debt Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Payoff Calculator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="debt-amount">Debt Amount ($)</Label>
                  <Input
                    id="debt-amount"
                    type="number"
                    placeholder="5000"
                    value={debtAmount}
                    onChange={(e) => setDebtAmount(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    placeholder="18.99"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthly-payment">Monthly Payment ($)</Label>
                  <Input
                    id="monthly-payment"
                    type="number"
                    placeholder="200"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                  />
                </div>

                {debtAmount && interestRate && monthlyPayment && (
                  <div className="bg-muted p-3 rounded-lg">
                    {(() => {
                      const result = calculatePayoff(
                        parseFloat(debtAmount),
                        parseFloat(interestRate),
                        parseFloat(monthlyPayment)
                      );
                      return (
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Payoff Time:</span>
                            <span className="font-medium">
                              {result.months === Infinity ? 'Never' : `${result.months} months`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-medium">
                              ${result.totalInterest === Infinity ? '∞' : result.totalInterest.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Set Debt Goals
            </Button>
            <Button className="w-full" variant="outline">
              Add New Debt
            </Button>
          </div>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        <BottomNav />
      </div>
    </div>
  );
};

export default DebtManagement;