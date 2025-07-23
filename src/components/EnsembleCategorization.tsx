import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Brain, Bot, Lightbulb, Target, AlertTriangle, TrendingUp } from "lucide-react";

interface ModelConfig {
  name: string;
  enabled: boolean;
  weight: number;
  accuracy: number;
}

interface CategoryResult {
  category: string;
  confidence: number;
  explanation: string;
  models: {
    openai: { category: string; confidence: number };
    ollama: { category: string; confidence: number };
  };
}

export function EnsembleCategorization() {
  const [models, setModels] = useState<ModelConfig[]>([
    { name: "OpenAI GPT-4", enabled: true, weight: 60, accuracy: 94 },
    { name: "Ollama Local", enabled: true, weight: 40, accuracy: 88 }
  ]);

  const [accuracyTarget] = useState(95);
  const [contextAware, setContextAware] = useState(true);
  const [learningMode, setLearningMode] = useState(true);

  const mockResult: CategoryResult = {
    category: "Groceries",
    confidence: 92,
    explanation: "High confidence based on merchant 'Amazon Fresh' combined with evening time pattern and amount range typical for grocery shopping.",
    models: {
      openai: { category: "Groceries", confidence: 94 },
      ollama: { category: "Food & Dining", confidence: 89 }
    }
  };

  const updateModelWeight = (index: number, weight: number) => {
    const newModels = [...models];
    newModels[index].weight = weight;
    setModels(newModels);
  };

  const toggleModel = (index: number) => {
    const newModels = [...models];
    newModels[index].enabled = !newModels[index].enabled;
    setModels(newModels);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Ensemble AI Categorization
          </h2>
          <p className="text-muted-foreground">Multi-model consensus with learning capabilities</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Target: {accuracyTarget}% Accuracy
        </Badge>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Model Configuration
              </CardTitle>
              <CardDescription>
                Configure AI models and their weights for ensemble prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {models.map((model, index) => (
                <div key={model.name} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={model.enabled}
                        onCheckedChange={() => toggleModel(index)}
                      />
                      <div>
                        <h3 className="font-medium">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Current accuracy: {model.accuracy}%
                        </p>
                      </div>
                    </div>
                    <Badge variant={model.enabled ? "default" : "secondary"}>
                      Weight: {model.weight}%
                    </Badge>
                  </div>
                  
                  {model.enabled && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Weight</span>
                        <span>{model.weight}%</span>
                      </div>
                      <Slider
                        value={[model.weight]}
                        onValueChange={(value) => updateModelWeight(index, value[0])}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Categorization Result
              </CardTitle>
              <CardDescription>
                Latest transaction categorization with model consensus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg">{mockResult.category}</h3>
                  <p className="text-sm text-muted-foreground">
                    Amazon Fresh - $67.45
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Progress value={mockResult.confidence} className="w-20 h-2" />
                    <span className="font-medium text-sm">{mockResult.confidence}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">OpenAI GPT-4</span>
                      <Badge variant="outline">{mockResult.models.openai.confidence}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{mockResult.models.openai.category}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Ollama Local</span>
                      <Badge variant="outline">{mockResult.models.ollama.confidence}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{mockResult.models.ollama.category}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Explanation</h4>
                    <p className="text-sm text-blue-800">{mockResult.explanation}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">Correct Category</Button>
                <Button variant="outline" size="sm">Accept & Learn</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Learning System
              </CardTitle>
              <CardDescription>
                User correction learning and accuracy improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Continuous Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn from user corrections in real-time
                  </p>
                </div>
                <Switch checked={learningMode} onCheckedChange={setLearningMode} />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Corrections</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded text-sm">
                      <p>Amazon → Groceries (was Electronics)</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded text-sm">
                      <p>Uber → Transportation (was Travel)</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Learning Stats</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Accuracy</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Corrections Applied</span>
                        <span>47</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure context awareness and model behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Context-Aware Categorization</h3>
                  <p className="text-sm text-muted-foreground">
                    Consider merchant context (Amazon for groceries vs electronics)
                  </p>
                </div>
                <Switch checked={contextAware} onCheckedChange={setContextAware} />
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Model Timeout Settings</h3>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">Fast (2s)</SelectItem>
                    <SelectItem value="medium">Medium (5s)</SelectItem>
                    <SelectItem value="slow">Thorough (10s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Confidence Threshold</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Minimum confidence for auto-categorization</span>
                    <span>85%</span>
                  </div>
                  <Slider defaultValue={[85]} max={100} step={5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}