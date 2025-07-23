import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Settings, BarChart3, Shield, Users, UtensilsCrossed, MapPin, Heart } from "lucide-react";

import { EnsembleCategorization } from "./EnsembleCategorization";
import { ConfidenceScoring, mockConfidenceData } from "./ConfidenceScoring";
import { HealthImpactWarnings } from "./HealthImpactWarnings";
import { IndianContextCategories } from "./IndianContextCategories";
import { RestaurantSubcategorization } from "./RestaurantSubcategorization";
import { RoleBasedSpendingPatterns } from "./RoleBasedSpendingPatterns";
import { AddictionHabitTracking } from "./AddictionHabitTracking";

interface AIFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  status: 'active' | 'beta' | 'coming_soon';
  accuracy?: number;
}

export function AICategorization() {
  const [activeFeature, setActiveFeature] = useState('overview');

  const aiFeatures: AIFeature[] = [
    {
      id: 'ensemble',
      name: 'Ensemble AI Models',
      description: 'Multi-model consensus with OpenAI + Local Ollama',
      icon: <Brain className="w-5 h-5" />,
      component: <EnsembleCategorization />,
      status: 'active',
      accuracy: 95
    },
    {
      id: 'confidence',
      name: 'Confidence Scoring',
      description: 'Detailed confidence metrics and explanations',
      icon: <BarChart3 className="w-5 h-5" />,
      component: <ConfidenceScoring {...mockConfidenceData} />,
      status: 'active',
      accuracy: 92
    },
    {
      id: 'health',
      name: 'Health Impact Warnings',
      description: 'Gentle insights for health-impacting spending',
      icon: <Shield className="w-5 h-5" />,
      component: <HealthImpactWarnings />,
      status: 'active'
    },
    {
      id: 'indian',
      name: 'Indian Context Categories',
      description: 'Micro-categories for Indian spending patterns',
      icon: <MapPin className="w-5 h-5" />,
      component: <IndianContextCategories />,
      status: 'beta'
    },
    {
      id: 'restaurants',
      name: 'Restaurant Sub-categorization',
      description: 'Fine dining, fast food, delivery, and café tracking',
      icon: <UtensilsCrossed className="w-5 h-5" />,
      component: <RestaurantSubcategorization />,
      status: 'active'
    },
    {
      id: 'roles',
      name: 'Role-Based Patterns',
      description: 'Student vs corporate lifestyle recognition',
      icon: <Users className="w-5 h-5" />,
      component: <RoleBasedSpendingPatterns />,
      status: 'beta'
    },
    {
      id: 'habits',
      name: 'Habit Tracking',
      description: 'Addiction/habit tracking with behavioral insights',
      icon: <Heart className="w-5 h-5" />,
      component: <AddictionHabitTracking />,
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'beta': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'coming_soon': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (activeFeature !== 'overview') {
    const feature = aiFeatures.find(f => f.id === activeFeature);
    if (feature) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature('overview')}
            >
              ← Back to Overview
            </Button>
            <div className="flex items-center gap-2">
              {feature.icon}
              <h1 className="text-2xl font-bold">{feature.name}</h1>
              <Badge variant="outline" className={getStatusColor(feature.status)}>
                {feature.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
          {feature.component}
        </div>
      );
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">AI Categorization System</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced ensemble AI categorization with multi-model consensus, context awareness, 
          and behavioral insights tailored for your spending patterns.
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            95% Target Accuracy
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Multi-Model Consensus
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Context Aware
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map((feature) => (
          <Card 
            key={feature.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => setActiveFeature(feature.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </div>
                <Badge variant="outline" className={getStatusColor(feature.status)}>
                  {feature.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {feature.accuracy && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {feature.accuracy}%
                  </Badge>
                </div>
              )}
              <Button variant="outline" className="w-full mt-4">
                Explore Feature
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Overview
          </CardTitle>
          <CardDescription>
            Key metrics and performance of your AI categorization system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">1,247</p>
              <p className="text-sm text-muted-foreground">Transactions Processed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">94.2%</p>
              <p className="text-sm text-muted-foreground">Overall Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">47</p>
              <p className="text-sm text-muted-foreground">User Corrections Applied</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-sm text-muted-foreground">Categories Detected</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Highlights</CardTitle>
          <CardDescription>
            What makes this AI categorization system special
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">🤖 Multi-Model Consensus</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Combines OpenAI GPT-4 with local Ollama models</li>
                <li>• Weighted voting system for higher accuracy</li>
                <li>• Fallback mechanisms for model failures</li>
              </ul>

              <h4 className="font-semibold">🎯 Context Awareness</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Merchant context (Amazon for groceries vs electronics)</li>
                <li>• Time-based pattern recognition</li>
                <li>• Amount range analysis</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">🧠 Learning System</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Learns from user corrections in real-time</li>
                <li>• Adaptive confidence scoring</li>
                <li>• Continuous model improvement</li>
              </ul>

              <h4 className="font-semibold">🌏 Indian Context</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Specialized categories (chai, street food, auto-rickshaw)</li>
                <li>• Cultural spending pattern recognition</li>
                <li>• Regional merchant identification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}