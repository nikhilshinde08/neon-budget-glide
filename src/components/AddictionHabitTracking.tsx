import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Lightbulb,
  Shield,
  Activity
} from "lucide-react";

interface HabitPattern {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  riskLevel: 'low' | 'medium' | 'high';
  frequency: number; // per week
  avgAmount: number;
  totalSpent: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  triggers: string[];
  insights: string[];
  suggestions: string[];
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  achieved: boolean;
  reward?: string;
}

interface BehavioralInsight {
  type: 'positive' | 'concern' | 'pattern';
  title: string;
  description: string;
  actionable: boolean;
  suggestion?: string;
}

export function AddictionHabitTracking() {
  const [gentleMode, setGentleMode] = useState(true);
  const [insightsEnabled, setInsightsEnabled] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const habitPatterns: HabitPattern[] = [
    {
      id: 'smoking',
      name: 'Cigarettes & Tobacco',
      category: 'Health Risk',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'bg-red-500',
      riskLevel: 'high',
      frequency: 5, // times per week
      avgAmount: 120,
      totalSpent: 1440, // monthly
      trend: 'increasing',
      triggers: ['Stress', 'Social situations', 'After meals', 'Work breaks'],
      insights: [
        'Spending has increased by 20% over the past month',
        'Peak purchases occur on weekday evenings',
        'Stress-related purchases correlate with work deadlines'
      ],
      suggestions: [
        'Consider nicotine replacement therapy',
        'Identify stress management alternatives',
        'Join a support group or quitline',
        'Reward smoke-free days with saved money'
      ],
      milestones: [
        {
          id: 'daily_reduction',
          title: 'Daily Reduction',
          description: 'Reduce daily cigarette spending by 25%',
          target: 25,
          current: 15,
          unit: '%',
          achieved: false
        },
        {
          id: 'smoke_free_days',
          title: 'Smoke-Free Days',
          description: 'Achieve 7 consecutive smoke-free days',
          target: 7,
          current: 2,
          unit: 'days',
          achieved: false,
          reward: 'Treat yourself to a movie with saved money'
        }
      ]
    },
    {
      id: 'alcohol',
      name: 'Alcohol Consumption',
      category: 'Health Risk',
      icon: <Heart className="w-4 h-4" />,
      color: 'bg-orange-500',
      riskLevel: 'medium',
      frequency: 3,
      avgAmount: 800,
      totalSpent: 2400,
      trend: 'stable',
      triggers: ['Weekend socializing', 'Celebrations', 'Stress relief', 'Dining out'],
      insights: [
        'Spending remains consistent week-to-week',
        'Higher amounts during weekends and social events',
        'Tends to correlate with restaurant visits'
      ],
      suggestions: [
        'Set weekly spending limits for alcohol',
        'Try alcohol-free alternatives when dining out',
        'Plan alcohol-free social activities',
        'Track health improvements with reduced consumption'
      ],
      milestones: [
        {
          id: 'weekly_limit',
          title: 'Weekly Limit',
          description: 'Stay within ₹600 weekly alcohol budget',
          target: 600,
          current: 580,
          unit: '₹',
          achieved: false
        },
        {
          id: 'dry_days',
          title: 'Dry Days',
          description: 'Maintain 3 alcohol-free days per week',
          target: 3,
          current: 4,
          unit: 'days',
          achieved: true,
          reward: 'You\'re doing great! Keep it up.'
        }
      ]
    },
    {
      id: 'online_shopping',
      name: 'Impulse Online Shopping',
      category: 'Behavioral',
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-purple-500',
      riskLevel: 'medium',
      frequency: 4,
      avgAmount: 1200,
      totalSpent: 4800,
      trend: 'increasing',
      triggers: ['Boredom', 'Late night browsing', 'Sales notifications', 'Emotional stress'],
      insights: [
        'Most purchases happen between 9-11 PM',
        'Higher spending during sale seasons',
        'Frequently purchases items that remain unused'
      ],
      suggestions: [
        'Implement a 24-hour waiting period for non-essential purchases',
        'Unsubscribe from promotional emails',
        'Create a wishlist instead of buying immediately',
        'Set monthly spending limits for non-essentials'
      ],
      milestones: [
        {
          id: 'wait_period',
          title: '24-Hour Rule',
          description: 'Wait 24 hours before impulse purchases',
          target: 80,
          current: 65,
          unit: '% compliance',
          achieved: false
        }
      ]
    },
    {
      id: 'food_delivery',
      name: 'Food Delivery Dependency',
      category: 'Lifestyle',
      icon: <Clock className="w-4 h-4" />,
      color: 'bg-yellow-500',
      riskLevel: 'low',
      frequency: 8,
      avgAmount: 450,
      totalSpent: 3600,
      trend: 'stable',
      triggers: ['Work stress', 'Convenience', 'Late work hours', 'Lack of meal planning'],
      insights: [
        'Orders peak during weekday evenings',
        'Consistent pattern of ordering when working late',
        'Higher amounts when ordering for groups'
      ],
      suggestions: [
        'Plan meals in advance to reduce impulse orders',
        'Keep healthy snacks available for late work hours',
        'Batch cook meals on weekends',
        'Set a weekly limit for food delivery'
      ],
      milestones: [
        {
          id: 'home_cooked',
          title: 'Home Cooking',
          description: 'Cook at home 4 days per week',
          target: 4,
          current: 3,
          unit: 'days',
          achieved: false
        }
      ]
    }
  ];

  const behavioralInsights: BehavioralInsight[] = [
    {
      type: 'positive',
      title: 'Positive Progress',
      description: 'Your alcohol spending has remained stable for 3 weeks, showing good self-control.',
      actionable: true,
      suggestion: 'Continue this pattern and consider reducing by 10% next month.'
    },
    {
      type: 'concern',
      title: 'Increasing Pattern',
      description: 'Cigarette purchases have increased by 20% this month, particularly during stressful periods.',
      actionable: true,
      suggestion: 'Consider stress management techniques like meditation or exercise.'
    },
    {
      type: 'pattern',
      title: 'Timing Pattern',
      description: 'Most impulse purchases occur between 9-11 PM when you\'re likely tired or stressed.',
      actionable: true,
      suggestion: 'Set phone reminders to pause and reflect before evening purchases.'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <BarChart3 className="w-4 h-4 text-blue-600" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'concern': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Lightbulb className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Habit & Behavior Tracking
          </h2>
          <p className="text-muted-foreground">Gentle insights into spending patterns with supportive guidance</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Supportive Mode Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Gentle Mode</h3>
                <p className="text-sm text-muted-foreground">Supportive, non-judgmental insights</p>
              </div>
              <Switch checked={gentleMode} onCheckedChange={setGentleMode} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Behavioral Insights</h3>
                <p className="text-sm text-muted-foreground">AI-powered pattern recognition</p>
              </div>
              <Switch checked={insightsEnabled} onCheckedChange={setInsightsEnabled} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">This Month's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Health Score</span>
                <Badge variant="outline">72/100</Badge>
              </div>
              <Progress value={72} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p className="font-bold text-green-600">3</p>
                  <p className="text-muted-foreground">Milestones Achieved</p>
                </div>
                <div>
                  <p className="font-bold text-blue-600">5</p>
                  <p className="text-muted-foreground">Positive Changes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {habitPatterns.map((habit) => (
              <Card key={habit.id} className="hover:bg-muted/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${habit.color} text-white`}>
                        {habit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{habit.name}</h4>
                        <p className="text-sm text-muted-foreground">{habit.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getRiskColor(habit.riskLevel)}>
                        {habit.riskLevel.toUpperCase()} RISK
                      </Badge>
                      {getTrendIcon(habit.trend)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-lg font-bold">₹{habit.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Monthly Spend</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{habit.frequency}x</p>
                      <p className="text-xs text-muted-foreground">Per Week</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">₹{habit.avgAmount}</p>
                      <p className="text-xs text-muted-foreground">Avg Amount</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Recent Insights:</h5>
                      <div className="space-y-1">
                        {habit.insights.slice(0, 2).map((insight, index) => (
                          <p key={index} className="text-xs text-muted-foreground">
                            • {insight}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Set Goals
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Patterns & Triggers</CardTitle>
              <CardDescription>
                Understanding what influences your spending habits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {habitPatterns.map((habit) => (
                <div key={habit.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${habit.color} text-white`}>
                      {habit.icon}
                    </div>
                    <h4 className="font-semibold">{habit.name}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Common Triggers:</h5>
                      <div className="space-y-1">
                        {habit.triggers.map((trigger, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Target className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{trigger}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Gentle Suggestions:</h5>
                      <div className="space-y-1">
                        {habit.suggestions.slice(0, 3).map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <Lightbulb className="w-3 h-3 text-yellow-600 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Milestones</CardTitle>
              <CardDescription>
                Celebrate small wins and track positive changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {habitPatterns.map((habit) => (
                  <div key={habit.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full ${habit.color} text-white flex items-center justify-center`}>
                        {habit.icon}
                      </div>
                      <h4 className="font-semibold">{habit.name}</h4>
                    </div>

                    <div className="space-y-4 ml-11">
                      {habit.milestones.map((milestone) => (
                        <div key={milestone.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h5 className="font-medium">{milestone.title}</h5>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                            {milestone.achieved ? (
                              <Badge className="bg-green-500">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Achieved!
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                In Progress
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{milestone.current}/{milestone.target} {milestone.unit}</span>
                            </div>
                            <Progress 
                              value={(milestone.current / milestone.target) * 100} 
                              className="h-2"
                            />
                            {milestone.reward && (
                              <p className="text-xs text-green-600 mt-2">
                                🎉 Reward: {milestone.reward}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Insights</CardTitle>
              <CardDescription>
                Supportive observations about your spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behavioralInsights.map((insight, index) => (
                  <Alert key={index} className="border-l-4">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{insight.title}</h4>
                        <AlertDescription className="mb-3">
                          {insight.description}
                        </AlertDescription>
                        {insight.actionable && insight.suggestion && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                            <strong>Gentle suggestion:</strong> {insight.suggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Remember
                </h4>
                <p className="text-sm text-green-800">
                  Change is a journey, not a destination. Every small step you take towards healthier 
                  spending habits is worth celebrating. Be kind to yourself and focus on progress, 
                  not perfection.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}