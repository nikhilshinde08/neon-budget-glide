import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, AlertCircle, XCircle, Info, TrendingUp, TrendingDown } from "lucide-react";

interface ConfidenceMetrics {
  overall: number;
  merchant: number;
  amount: number;
  time: number;
  context: number;
}

interface ExplanationFactor {
  factor: string;
  impact: number;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

interface ConfidenceScoringProps {
  metrics: ConfidenceMetrics;
  factors: ExplanationFactor[];
  category: string;
  transaction: {
    merchant: string;
    amount: number;
    time: string;
  };
}

const getConfidenceColor = (score: number) => {
  if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 75) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getConfidenceIcon = (score: number) => {
  if (score >= 90) return <CheckCircle className="w-4 h-4 text-green-600" />;
  if (score >= 75) return <AlertCircle className="w-4 h-4 text-yellow-600" />;
  return <XCircle className="w-4 h-4 text-red-600" />;
};

const getImpactIcon = (type: string) => {
  switch (type) {
    case 'positive': return <TrendingUp className="w-3 h-3 text-green-600" />;
    case 'negative': return <TrendingDown className="w-3 h-3 text-red-600" />;
    default: return <Info className="w-3 h-3 text-blue-600" />;
  }
};

export function ConfidenceScoring({ 
  metrics, 
  factors, 
  category, 
  transaction 
}: ConfidenceScoringProps) {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className={`${getConfidenceColor(metrics.overall)} border`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getConfidenceIcon(metrics.overall)}
                Confidence Score
              </CardTitle>
              <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                {metrics.overall}%
              </Badge>
            </div>
            <CardDescription>
              Categorized as "{category}" for {transaction.merchant}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Confidence</span>
              <span className="text-sm font-medium">{metrics.overall}%</span>
            </div>
            <Progress value={metrics.overall} className="h-3 mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-xs text-muted-foreground cursor-help">
                          Merchant Match
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How well the merchant name matches the category</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-medium">{metrics.merchant}%</span>
                  </div>
                  <Progress value={metrics.merchant} className="h-1" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-xs text-muted-foreground cursor-help">
                          Amount Pattern
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How typical the amount is for this category</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-medium">{metrics.amount}%</span>
                  </div>
                  <Progress value={metrics.amount} className="h-1" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-xs text-muted-foreground cursor-help">
                          Time Context
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Time of day/week relevance to category</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-medium">{metrics.time}%</span>
                  </div>
                  <Progress value={metrics.time} className="h-1" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-xs text-muted-foreground cursor-help">
                          Historical Context
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Past transaction patterns for this merchant</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-medium">{metrics.context}%</span>
                  </div>
                  <Progress value={metrics.context} className="h-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Explanation Factors</CardTitle>
            <CardDescription>
              Key factors influencing the categorization decision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {factors.map((factor, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">
                    {getImpactIcon(factor.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{factor.factor}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          factor.type === 'positive' ? 'text-green-600 border-green-200' :
                          factor.type === 'negative' ? 'text-red-600 border-red-200' :
                          'text-blue-600 border-blue-200'
                        }`}
                      >
                        {factor.impact > 0 ? '+' : ''}{factor.impact}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Improve Model
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}

export const mockConfidenceData = {
  metrics: {
    overall: 87,
    merchant: 92,
    amount: 78,
    time: 85,
    context: 90
  },
  factors: [
    {
      factor: "Merchant Recognition",
      impact: 15,
      description: "Strong match with known grocery store pattern",
      type: 'positive' as const
    },
    {
      factor: "Amount Range",
      impact: -3,
      description: "Slightly higher than typical grocery amount",
      type: 'negative' as const
    },
    {
      factor: "Time Pattern",
      impact: 8,
      description: "Evening shopping aligns with grocery patterns",
      type: 'positive' as const
    },
    {
      factor: "Historical Data",
      impact: 12,
      description: "User has shopped groceries at this merchant before",
      type: 'positive' as const
    },
    {
      factor: "Context Clues",
      impact: 5,
      description: "Transaction occurred near residential area",
      type: 'positive' as const
    }
  ],
  category: "Groceries",
  transaction: {
    merchant: "Amazon Fresh",
    amount: 67.45,
    time: "Today, 6:30 PM"
  }
};