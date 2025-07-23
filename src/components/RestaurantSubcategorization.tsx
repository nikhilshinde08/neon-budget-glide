import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  UtensilsCrossed, 
  Coffee, 
  Truck, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Zap
} from "lucide-react";

interface RestaurantTransaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  time: string;
  category: string;
  subcategory: string;
  confidence: number;
  detectedFeatures: string[];
}

interface RestaurantSubcategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  avgAmount: { min: number; max: number };
  commonFeatures: string[];
  monthlySpend: number;
  transactionCount: number;
  budget?: number;
}

interface RestaurantMetrics {
  totalSpent: number;
  transactionCount: number;
  avgPerTransaction: number;
  monthlyTrend: number;
}

export function RestaurantSubcategorization() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [filterSubcategory, setFilterSubcategory] = useState('all');

  const subcategories: RestaurantSubcategory[] = [
    {
      id: 'fine_dining',
      name: 'Fine Dining',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-purple-500',
      description: 'Upscale restaurants, special occasions, premium dining experiences',
      avgAmount: { min: 1500, max: 5000 },
      commonFeatures: ['evening', 'weekend', 'high-amount', 'premium-location'],
      monthlySpend: 8500,
      transactionCount: 4,
      budget: 10000
    },
    {
      id: 'fast_food',
      name: 'Fast Food',
      icon: <Zap className="w-4 h-4" />,
      color: 'bg-red-500',
      description: 'Quick service restaurants, fast food chains, casual dining',
      avgAmount: { min: 200, max: 800 },
      commonFeatures: ['quick-service', 'chain-restaurant', 'lunch-time', 'convenient'],
      monthlySpend: 3200,
      transactionCount: 12,
      budget: 4000
    },
    {
      id: 'delivery',
      name: 'Food Delivery',
      icon: <Truck className="w-4 h-4" />,
      color: 'bg-orange-500',
      description: 'Home delivery from restaurants, food apps, online orders',
      avgAmount: { min: 300, max: 1200 },
      commonFeatures: ['delivery-app', 'home-location', 'evening', 'convenience-fee'],
      monthlySpend: 5400,
      transactionCount: 18,
      budget: 6000
    },
    {
      id: 'cafe',
      name: 'Café Visits',
      icon: <Coffee className="w-4 h-4" />,
      color: 'bg-amber-500',
      description: 'Coffee shops, cafés, light snacks, work meetings',
      avgAmount: { min: 150, max: 600 },
      commonFeatures: ['coffee-shop', 'work-hours', 'light-meals', 'beverages'],
      monthlySpend: 2800,
      transactionCount: 15,
      budget: 3500
    }
  ];

  const recentTransactions: RestaurantTransaction[] = [
    {
      id: '1',
      merchant: 'The Oberoi Restaurant',
      amount: 2850,
      date: '2024-01-20',
      time: '8:30 PM',
      category: 'Food & Dining',
      subcategory: 'Fine Dining',
      confidence: 95,
      detectedFeatures: ['evening', 'weekend', 'high-amount', 'premium-location']
    },
    {
      id: '2',
      merchant: 'Swiggy - Dominos Pizza',
      amount: 450,
      date: '2024-01-19',
      time: '7:15 PM',
      category: 'Food & Dining',
      subcategory: 'Delivery',
      confidence: 92,
      detectedFeatures: ['delivery-app', 'home-location', 'evening', 'convenience-fee']
    },
    {
      id: '3',
      merchant: 'Starbucks',
      amount: 320,
      date: '2024-01-19',
      time: '11:30 AM',
      category: 'Food & Dining',
      subcategory: 'Café',
      confidence: 89,
      detectedFeatures: ['coffee-shop', 'work-hours', 'beverages']
    },
    {
      id: '4',
      merchant: 'McDonald\'s',
      amount: 285,
      date: '2024-01-18',
      time: '1:00 PM',
      category: 'Food & Dining',
      subcategory: 'Fast Food',
      confidence: 96,
      detectedFeatures: ['quick-service', 'chain-restaurant', 'lunch-time']
    }
  ];

  const metrics: RestaurantMetrics = {
    totalSpent: 19900,
    transactionCount: 49,
    avgPerTransaction: 406,
    monthlyTrend: 12
  };

  const getSubcategoryColor = (subcategoryId: string) => {
    const subcategory = subcategories.find(s => s.id === subcategoryId);
    return subcategory?.color || 'bg-gray-500';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const filteredTransactions = filterSubcategory === 'all' 
    ? recentTransactions 
    : recentTransactions.filter(t => t.subcategory.toLowerCase().replace(' ', '_') === filterSubcategory);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            Restaurant Sub-categorization
          </h2>
          <p className="text-muted-foreground">Fine dining, fast food, delivery, and café visit tracking</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {metrics.transactionCount} Transactions This Month
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Total Spent</span>
            </div>
            <p className="text-2xl font-bold">₹{metrics.totalSpent.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+{metrics.monthlyTrend}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Transactions</span>
            </div>
            <p className="text-2xl font-bold">{metrics.transactionCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Avg: ₹{metrics.avgPerTransaction}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Top Category</span>
            </div>
            <p className="text-lg font-bold">Delivery</p>
            <p className="text-xs text-muted-foreground mt-1">₹5,400 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Peak Time</span>
            </div>
            <p className="text-lg font-bold">7-9 PM</p>
            <p className="text-xs text-muted-foreground mt-1">Most active hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {subcategories.map((subcategory) => (
              <Card key={subcategory.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${subcategory.color} text-white`}>
                        {subcategory.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{subcategory.name}</h3>
                        <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {subcategory.transactionCount} transactions
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">₹{subcategory.monthlySpend.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Monthly Spend</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">₹{Math.round(subcategory.monthlySpend / subcategory.transactionCount)}</p>
                      <p className="text-xs text-muted-foreground">Avg per Visit</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">
                        ₹{subcategory.avgAmount.min}-{subcategory.avgAmount.max}
                      </p>
                      <p className="text-xs text-muted-foreground">Typical Range</p>
                    </div>
                  </div>

                  {subcategory.budget && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Progress</span>
                        <span>₹{subcategory.monthlySpend.toLocaleString()} / ₹{subcategory.budget.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(subcategory.monthlySpend / subcategory.budget) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Detection Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {subcategory.commonFeatures.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subcategories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configure Subcategories</CardTitle>
              <CardDescription>
                Set budgets and customize detection rules for restaurant subcategories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subcategories.map((subcategory) => (
                <div key={subcategory.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${subcategory.color} text-white`}>
                        {subcategory.icon}
                      </div>
                      <h3 className="font-semibold">{subcategory.name}</h3>
                    </div>
                    <Badge variant="outline">
                      Current: ₹{subcategory.monthlySpend.toLocaleString()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`budget-${subcategory.id}`}>Monthly Budget</Label>
                      <Input
                        id={`budget-${subcategory.id}`}
                        type="number"
                        value={subcategory.budget || ''}
                        placeholder="Set budget"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Amount Range</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={subcategory.avgAmount.min}
                          placeholder="Min"
                          className="flex-1"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          value={subcategory.avgAmount.max}
                          placeholder="Max"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Detection Keywords</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {subcategory.commonFeatures.map((feature, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        >
                          {feature.replace('-', ' ')} ×
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        + Add Keyword
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex gap-4">
            <Select value={filterSubcategory} onValueChange={setFilterSubcategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                <SelectItem value="fine_dining">Fine Dining</SelectItem>
                <SelectItem value="fast_food">Fast Food</SelectItem>
                <SelectItem value="delivery">Food Delivery</SelectItem>
                <SelectItem value="cafe">Café Visits</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="hover:bg-muted/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${getSubcategoryColor(transaction.subcategory.toLowerCase().replace(' ', '_'))} text-white flex items-center justify-center`}>
                        {subcategories.find(s => s.name === transaction.subcategory)?.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.merchant}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{transaction.subcategory}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{transaction.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-expense">-₹{transaction.amount}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getConfidenceColor(transaction.confidence)}`}
                        >
                          {transaction.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="flex flex-wrap gap-1">
                      {transaction.detectedFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Patterns</CardTitle>
                <CardDescription>
                  Analysis of your restaurant spending behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Insights</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• You spend 27% more on food delivery compared to dining out</li>
                    <li>• Weekend fine dining accounts for 43% of your restaurant budget</li>
                    <li>• Most café visits happen during work hours (10 AM - 2 PM)</li>
                    <li>• Fast food spending peaks on weekday lunches</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Most Expensive Category</h4>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-500 p-2 rounded-full text-white">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Fine Dining</p>
                        <p className="text-sm text-muted-foreground">₹2,125 avg per visit</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Most Frequent Category</h4>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-500 p-2 rounded-full text-white">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Food Delivery</p>
                        <p className="text-sm text-muted-foreground">18 orders this month</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">🎯 Recommendations</h4>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    <li>• Consider cooking more meals at home to reduce delivery costs</li>
                    <li>• Set a monthly limit for fine dining to control high-end spending</li>
                    <li>• Look for café loyalty programs to save on frequent visits</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}