import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  GraduationCap, 
  Briefcase, 
  Home, 
  Baby, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar
} from "lucide-react";

interface SpendingRole {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  active: boolean;
  confidence: number;
  keyIndicators: string[];
  typicalCategories: CategorySpending[];
  insights: string[];
  recommendations: string[];
}

interface CategorySpending {
  category: string;
  percentage: number;
  amount: number;
  trend: 'up' | 'down' | 'stable';
}

interface RoleAnalysis {
  detectedRoles: string[];
  confidence: number;
  analysisFactors: string[];
  timePattern: string;
}

export function RoleBasedSpendingPatterns() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [autoDetection, setAutoDetection] = useState(true);
  const [analysisEnabled, setAnalysisEnabled] = useState(true);

  const spendingRoles: SpendingRole[] = [
    {
      id: 'student',
      name: 'Student Lifestyle',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'University/college student with limited budget and specific spending patterns',
      active: true,
      confidence: 87,
      keyIndicators: [
        'High food delivery spending',
        'Education-related expenses',
        'Limited transportation costs',
        'Irregular income patterns',
        'Entertainment focused on affordable options'
      ],
      typicalCategories: [
        { category: 'Food & Dining', percentage: 35, amount: 5250, trend: 'up' },
        { category: 'Education', percentage: 25, amount: 3750, trend: 'stable' },
        { category: 'Transportation', percentage: 15, amount: 2250, trend: 'down' },
        { category: 'Entertainment', percentage: 15, amount: 2250, trend: 'up' },
        { category: 'Shopping', percentage: 10, amount: 1500, trend: 'stable' }
      ],
      insights: [
        'Spending heavily on convenience foods and delivery',
        'Educational expenses are consistent monthly',
        'Entertainment spending increases during weekends',
        'Transportation costs are minimal, likely using public transport'
      ],
      recommendations: [
        'Consider meal prep to reduce food delivery costs',
        'Look for student discounts on entertainment',
        'Track educational expenses for tax benefits',
        'Set aside emergency funds for unexpected expenses'
      ]
    },
    {
      id: 'corporate',
      name: 'Corporate Professional',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Working professional with regular income and career-focused spending',
      active: false,
      confidence: 72,
      keyIndicators: [
        'Regular salary deposits',
        'Professional clothing purchases',
        'Business meals and networking',
        'Commuting expenses',
        'Investment activities'
      ],
      typicalCategories: [
        { category: 'Food & Dining', percentage: 20, amount: 8000, trend: 'stable' },
        { category: 'Transportation', percentage: 25, amount: 10000, trend: 'up' },
        { category: 'Professional', percentage: 15, amount: 6000, trend: 'stable' },
        { category: 'Investment', percentage: 20, amount: 8000, trend: 'up' },
        { category: 'Shopping', percentage: 20, amount: 8000, trend: 'stable' }
      ],
      insights: [
        'Consistent spending patterns aligned with work schedule',
        'Higher transportation costs due to commuting',
        'Investment-focused with regular savings',
        'Professional networking expenses'
      ],
      recommendations: [
        'Maximize employer benefits and reimbursements',
        'Consider carpooling or public transport for commuting',
        'Track business expenses for tax deductions',
        'Automate investments to build wealth consistently'
      ]
    },
    {
      id: 'homemaker',
      name: 'Homemaker/Family Caretaker',
      icon: <Home className="w-5 h-5" />,
      description: 'Manages household expenses and family needs',
      active: false,
      confidence: 45,
      keyIndicators: [
        'Bulk grocery purchases',
        'Family-oriented expenses',
        'Healthcare and medicine costs',
        'Home maintenance spending',
        'Children-related expenses'
      ],
      typicalCategories: [
        { category: 'Groceries', percentage: 30, amount: 12000, trend: 'stable' },
        { category: 'Healthcare', percentage: 20, amount: 8000, trend: 'up' },
        { category: 'Family & Kids', percentage: 25, amount: 10000, trend: 'up' },
        { category: 'Home & Garden', percentage: 15, amount: 6000, trend: 'stable' },
        { category: 'Utilities', percentage: 10, amount: 4000, trend: 'stable' }
      ],
      insights: [
        'Bulk purchasing patterns to save on groceries',
        'Healthcare spending increases with family size',
        'Child-related expenses vary with school calendar',
        'Home maintenance spending is seasonal'
      ],
      recommendations: [
        'Use bulk buying for non-perishable items',
        'Set up separate funds for seasonal expenses',
        'Compare prices across different grocery stores',
        'Plan major purchases around sales and discounts'
      ]
    },
    {
      id: 'new_parent',
      name: 'New Parent',
      icon: <Baby className="w-5 h-5" />,
      description: 'Recently became a parent with changing spending priorities',
      active: false,
      confidence: 23,
      keyIndicators: [
        'Baby products and supplies',
        'Healthcare expenses increase',
        'Reduced entertainment spending',
        'Child care costs',
        'Insurance premium changes'
      ],
      typicalCategories: [
        { category: 'Baby & Kids', percentage: 35, amount: 14000, trend: 'up' },
        { category: 'Healthcare', percentage: 25, amount: 10000, trend: 'up' },
        { category: 'Groceries', percentage: 20, amount: 8000, trend: 'up' },
        { category: 'Entertainment', percentage: 5, amount: 2000, trend: 'down' },
        { category: 'Savings', percentage: 15, amount: 6000, trend: 'down' }
      ],
      insights: [
        'Dramatic shift in spending priorities towards baby needs',
        'Healthcare costs significantly increased',
        'Entertainment and discretionary spending reduced',
        'Focus on essential items and safety products'
      ],
      recommendations: [
        'Create a dedicated baby expenses budget',
        'Look for bulk deals on diapers and formula',
        'Consider second-hand items for quickly outgrown clothes',
        'Maintain emergency fund for unexpected baby needs'
      ]
    }
  ];

  const currentAnalysis: RoleAnalysis = {
    detectedRoles: ['Student Lifestyle', 'Young Professional'],
    confidence: 87,
    analysisFactors: [
      'High food delivery frequency (18 orders/month)',
      'Educational platform subscriptions',
      'Weekend entertainment spending spikes',
      'Minimal investment activity',
      'Irregular income deposits'
    ],
    timePattern: 'Evening and weekend spending concentrated'
  };

  const getCurrentRole = () => {
    return spendingRoles.find(role => role.id === selectedRole) || spendingRoles[0];
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-600" />;
      default: return <BarChart3 className="w-3 h-3 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Role-Based Spending Patterns
          </h2>
          <p className="text-muted-foreground">Analyze spending patterns based on lifestyle and life stage</p>
        </div>
        <Badge variant="outline" className={getConfidenceColor(currentAnalysis.confidence)}>
          {currentAnalysis.confidence}% Match Confidence
        </Badge>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Auto-detected roles:</strong> {currentAnalysis.detectedRoles.join(', ')}
          <br />
          <span className="text-sm">Based on your spending patterns from the last 3 months</span>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto Role Detection</h3>
                <p className="text-sm text-muted-foreground">Automatically detect spending roles</p>
              </div>
              <Switch checked={autoDetection} onCheckedChange={setAutoDetection} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Pattern Analysis</h3>
                <p className="text-sm text-muted-foreground">Analyze spending patterns for insights</p>
              </div>
              <Switch checked={analysisEnabled} onCheckedChange={setAnalysisEnabled} />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Primary Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary role" />
                </SelectTrigger>
                <SelectContent>
                  {spendingRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="flex items-center gap-2">
                        {role.icon}
                        {role.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Detection Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Analysis Based On:</h4>
              <div className="space-y-2">
                {currentAnalysis.analysisFactors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{factor}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-3 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Time Pattern:</strong> {currentAnalysis.timePattern}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Profile</TabsTrigger>
          <TabsTrigger value="comparison">Role Comparison</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getCurrentRole().icon}
                  {getCurrentRole().name}
                </CardTitle>
                <Badge variant={getCurrentRole().active ? "default" : "secondary"}>
                  {getCurrentRole().active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>{getCurrentRole().description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Spending Distribution</h4>
                <div className="space-y-4">
                  {getCurrentRole().typicalCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{category.category}</span>
                          {getTrendIcon(category.trend)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>₹{category.amount.toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {category.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Key Indicators</h4>
                <div className="grid gap-2">
                  {getCurrentRole().keyIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid gap-4">
            {spendingRoles.map((role) => (
              <Card key={role.id} className={role.active ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${role.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {role.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={getConfidenceColor(role.confidence)}>
                        {role.confidence}% match
                      </Badge>
                      {role.active && (
                        <Badge className="ml-2">Current</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold">
                        ₹{role.typicalCategories.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Monthly</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{role.typicalCategories.length}</p>
                      <p className="text-xs text-muted-foreground">Categories</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">
                        {role.typicalCategories[0]?.category.split(' ')[0] || 'N/A'}
                      </p>
                      <p className="text-xs text-muted-foreground">Top Category</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant={role.active ? "secondary" : "outline"} 
                      size="sm" 
                      className="w-full"
                      disabled={role.active}
                    >
                      {role.active ? "Currently Active" : "Set as Primary Role"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Role-Based Insights
              </CardTitle>
              <CardDescription>
                Understanding your spending behavior based on your lifestyle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {getCurrentRole().insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-600 mt-1" />
                      <p className="text-sm text-blue-800">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Positive Patterns
                </h4>
                <p className="text-sm text-green-800">
                  Your spending pattern shows good financial discipline typical of {getCurrentRole().name.toLowerCase()}. 
                  The consistent patterns indicate you're adapting well to your current lifestyle needs.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Areas to Watch
                </h4>
                <p className="text-sm text-yellow-800">
                  Consider monitoring high-frequency categories like food delivery which can add up quickly. 
                  Setting monthly limits could help maintain better budget control.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Tailored advice based on your {getCurrentRole().name.toLowerCase()} spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getCurrentRole().recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{recommendation}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="font-medium">Role-Specific Tools</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <Calendar className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Budget Planner</p>
                      <p className="text-xs text-muted-foreground">Create role-specific budgets</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Spending Tracker</p>
                      <p className="text-xs text-muted-foreground">Monitor category limits</p>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}