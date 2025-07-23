import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Heart, 
  Brain, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Target,
  Bell
} from "lucide-react";

interface HealthCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  warningLevel: 'low' | 'medium' | 'high';
  monthlyLimit: number;
  currentSpend: number;
  transactions: number;
  healthImpact: string;
  suggestions: string[];
}

interface HealthAlert {
  type: 'warning' | 'danger' | 'info';
  category: string;
  message: string;
  action?: string;
}

export function HealthImpactWarnings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  const healthCategories: HealthCategory[] = [
    {
      id: 'cigarettes',
      name: 'Cigarettes & Tobacco',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'bg-red-500',
      warningLevel: 'high',
      monthlyLimit: 100,
      currentSpend: 145,
      transactions: 12,
      healthImpact: 'Significantly increases risk of cancer, heart disease, and respiratory problems',
      suggestions: [
        'Consider nicotine replacement therapy',
        'Join a smoking cessation program',
        'Try gradual reduction approach'
      ]
    },
    {
      id: 'alcohol',
      name: 'Alcohol & Spirits',
      icon: <Heart className="w-4 h-4" />,
      color: 'bg-orange-500',
      warningLevel: 'medium',
      monthlyLimit: 200,
      currentSpend: 180,
      transactions: 8,
      healthImpact: 'Excessive consumption affects liver, heart, and mental health',
      suggestions: [
        'Limit to 2 drinks per day for men, 1 for women',
        'Have alcohol-free days each week',
        'Choose lower alcohol alternatives'
      ]
    },
    {
      id: 'junk_food',
      name: 'Junk Food & Fast Food',
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-yellow-500',
      warningLevel: 'medium',
      monthlyLimit: 150,
      currentSpend: 220,
      transactions: 15,
      healthImpact: 'High in calories, sugar, and unhealthy fats leading to obesity and diabetes',
      suggestions: [
        'Plan meals ahead to avoid impulse purchases',
        'Choose healthier alternatives when eating out',
        'Cook more meals at home'
      ]
    },
    {
      id: 'energy_drinks',
      name: 'Energy Drinks & Supplements',
      icon: <Brain className="w-4 h-4" />,
      color: 'bg-purple-500',
      warningLevel: 'low',
      monthlyLimit: 50,
      currentSpend: 35,
      transactions: 4,
      healthImpact: 'High caffeine content can cause anxiety, sleep issues, and heart palpitations',
      suggestions: [
        'Limit to 1 energy drink per day maximum',
        'Try natural alternatives like green tea',
        'Focus on better sleep habits instead'
      ]
    }
  ];

  const activeAlerts: HealthAlert[] = [
    {
      type: 'danger',
      category: 'Cigarettes',
      message: 'You\'ve exceeded your monthly limit by 45%. This spending pattern may indicate increased consumption.',
      action: 'Set up spending alerts'
    },
    {
      type: 'warning',
      category: 'Junk Food',
      message: 'Fast food spending is 47% above your target. Consider meal planning to reduce impulse purchases.',
      action: 'View meal planning tips'
    },
    {
      type: 'info',
      category: 'Alcohol',
      message: 'You\'re approaching your monthly limit (90% spent). Consider moderating consumption.',
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'border-red-200 bg-red-50 text-red-800';
      case 'warning': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getWarningLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Health Impact Monitoring
          </h2>
          <p className="text-muted-foreground">Track spending on health-impacting categories with gentle behavioral insights</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Active Monitoring
        </Badge>
      </div>

      {activeAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Active Health Alerts
          </h3>
          {activeAlerts.map((alert, index) => (
            <Alert key={index} className={getAlertColor(alert.type)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <strong>{alert.category}:</strong> {alert.message}
                </div>
                {alert.action && (
                  <Button variant="outline" size="sm" className="ml-4">
                    {alert.action}
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4">
            {healthCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      {category.name}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={getWarningLevelColor(category.warningLevel)}
                    >
                      {category.warningLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${category.currentSpend}
                      </p>
                      <p className="text-xs text-muted-foreground">This Month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {category.transactions}
                      </p>
                      <p className="text-xs text-muted-foreground">Transactions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {Math.round((category.currentSpend / category.monthlyLimit) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">of Limit</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Monthly Spending vs Limit</span>
                      <span className="text-sm text-muted-foreground">
                        ${category.currentSpend} / ${category.monthlyLimit}
                      </span>
                    </div>
                    <Progress 
                      value={(category.currentSpend / category.monthlyLimit) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Health Impact
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {category.healthImpact}
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-xs">Suggestions:</h5>
                      <ul className="space-y-1">
                        {category.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                            <Target className="w-2 h-2 mt-1 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Set Alerts
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View History
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
                <Brain className="w-5 h-5" />
                Behavioral Insights
              </CardTitle>
              <CardDescription>
                Gentle observations about your spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-green-900">Positive Trend</h4>
                      <p className="text-sm text-green-800 mt-1">
                        Your junk food spending decreased by 15% compared to last month. 
                        This could contribute to better health outcomes!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-card">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-red-900">Area for Improvement</h4>
                      <p className="text-sm text-red-800 mt-1">
                        Cigarette purchases have increased this month. Consider reaching out 
                        to a healthcare provider for support with smoking cessation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-card">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-900">Pattern Recognition</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        You tend to purchase fast food on weekday evenings. Meal prep on weekends 
                        might help reduce these impulse purchases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Weekly Health Score</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={72} className="h-3" />
                    </div>
                    <span className="font-bold text-blue-900">72/100</span>
                  </div>
                  <p className="text-sm text-blue-800 mt-2">
                    Based on your spending patterns, you're doing well in most health categories. 
                    Focus on reducing cigarette spending for a higher score.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive health-related spending alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you approach spending limits
                  </p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Weekly Health Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly insights about your health-related spending
                  </p>
                </div>
                <Switch 
                  checked={weeklyReports} 
                  onCheckedChange={setWeeklyReports} 
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Alert Thresholds</h3>
                <div className="space-y-4">
                  {healthCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${category.color} text-white`}>
                          {category.icon}
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Alert at:</span>
                        <Badge variant="outline">80%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}