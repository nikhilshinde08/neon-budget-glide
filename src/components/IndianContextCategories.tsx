import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Coffee, 
  Car, 
  MapPin, 
  ShoppingBag, 
  Utensils, 
  Train, 
  Fuel,
  Heart,
  Home,
  Smartphone,
  Banknote,
  Users
} from "lucide-react";

interface IndianCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  parentCategory: string;
  enabled: boolean;
  monthlyBudget?: number;
  description: string;
  keywords: string[];
  commonMerchants: string[];
}

interface CategoryGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  categories: IndianCategory[];
}

export function IndianContextCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const indianCategories: CategoryGroup[] = [
    {
      id: 'food_beverages',
      name: 'Food & Beverages',
      icon: <Coffee className="w-5 h-5" />,
      categories: [
        {
          id: 'chai_tea',
          name: 'Chai & Tea',
          icon: <Coffee className="w-4 h-4" />,
          parentCategory: 'Food & Beverages',
          enabled: true,
          monthlyBudget: 500,
          description: 'Traditional tea stalls, chai vendors, and tea purchases',
          keywords: ['chai', 'tea', 'tapri', 'stall', 'cutting'],
          commonMerchants: ['Chai Point', 'Tea Stall', 'Tapri', 'Local Vendor']
        },
        {
          id: 'street_food',
          name: 'Street Food',
          icon: <Utensils className="w-4 h-4" />,
          parentCategory: 'Food & Beverages',
          enabled: true,
          monthlyBudget: 1500,
          description: 'Street vendors, chaat, snacks, and local food stalls',
          keywords: ['chaat', 'pani puri', 'bhel', 'vada pav', 'samosa', 'dosa'],
          commonMerchants: ['Street Vendor', 'Food Cart', 'Local Stall', 'Chaat Corner']
        },
        {
          id: 'paan_tobacco',
          name: 'Paan & Tobacco',
          icon: <Heart className="w-4 h-4" />,
          parentCategory: 'Health Impact',
          enabled: true,
          description: 'Paan shops, tobacco products, and betel leaf purchases',
          keywords: ['paan', 'gutka', 'tobacco', 'betel', 'zarda'],
          commonMerchants: ['Paan Shop', 'Pan Stall', 'Tobacco Store']
        }
      ]
    },
    {
      id: 'transport',
      name: 'Transportation',
      icon: <Car className="w-5 h-5" />,
      categories: [
        {
          id: 'auto_rickshaw',
          name: 'Auto Rickshaw',
          icon: <Car className="w-4 h-4" />,
          parentCategory: 'Transportation',
          enabled: true,
          monthlyBudget: 2000,
          description: 'Auto rickshaw rides and shared autos',
          keywords: ['auto', 'rickshaw', 'auto rickshaw', 'shared auto'],
          commonMerchants: ['Auto Driver', 'Shared Auto', 'Local Auto']
        },
        {
          id: 'cab_services',
          name: 'Cab Services',
          icon: <Smartphone className="w-4 h-4" />,
          parentCategory: 'Transportation',
          enabled: true,
          monthlyBudget: 3000,
          description: 'Ola, Uber, and other app-based cab services',
          keywords: ['ola', 'uber', 'cab', 'taxi', 'rapido'],
          commonMerchants: ['Ola', 'Uber', 'Rapido', 'Local Taxi']
        },
        {
          id: 'local_trains',
          name: 'Local Trains & Metro',
          icon: <Train className="w-4 h-4" />,
          parentCategory: 'Transportation',
          enabled: true,
          monthlyBudget: 800,
          description: 'Local trains, metro, and public transport tickets',
          keywords: ['train', 'metro', 'station', 'ticket', 'pass'],
          commonMerchants: ['Indian Railways', 'Metro Station', 'BMTC', 'BEST']
        },
        {
          id: 'petrol_diesel',
          name: 'Petrol & Diesel',
          icon: <Fuel className="w-4 h-4" />,
          parentCategory: 'Transportation',
          enabled: true,
          monthlyBudget: 4000,
          description: 'Fuel purchases at petrol pumps',
          keywords: ['petrol', 'diesel', 'fuel', 'pump', 'hp', 'bharat petroleum'],
          commonMerchants: ['HP Petrol Pump', 'BPCL', 'Indian Oil', 'Reliance Petrol']
        }
      ]
    },
    {
      id: 'local_services',
      name: 'Local Services',
      icon: <Home className="w-5 h-5" />,
      categories: [
        {
          id: 'kiryana_store',
          name: 'Kiryana Store',
          icon: <ShoppingBag className="w-4 h-4" />,
          parentCategory: 'Groceries',
          enabled: true,
          monthlyBudget: 3000,
          description: 'Local grocery stores and neighborhood shops',
          keywords: ['kiryana', 'general store', 'local shop', 'provision store'],
          commonMerchants: ['Local Kiryana', 'General Store', 'Neighborhood Shop']
        },
        {
          id: 'kirana_delivery',
          name: 'Kirana Delivery',
          icon: <MapPin className="w-4 h-4" />,
          parentCategory: 'Groceries',
          enabled: true,
          description: 'Online grocery delivery from local stores',
          keywords: ['dunzo', 'grofers', 'bigbasket', 'blinkit', 'zepto'],
          commonMerchants: ['Dunzo', 'Blinkit', 'Zepto', 'BigBasket', 'Grofers']
        },
        {
          id: 'mobile_recharge',
          name: 'Mobile Recharge',
          icon: <Smartphone className="w-4 h-4" />,
          parentCategory: 'Utilities',
          enabled: true,
          monthlyBudget: 500,
          description: 'Mobile recharges and DTH payments',
          keywords: ['recharge', 'prepaid', 'postpaid', 'airtel', 'jio', 'vi'],
          commonMerchants: ['Paytm', 'PhonePe', 'Google Pay', 'Airtel', 'Jio']
        },
        {
          id: 'money_transfer',
          name: 'Money Transfer',
          icon: <Banknote className="w-4 h-4" />,
          parentCategory: 'Financial',
          enabled: true,
          description: 'UPI transfers, money transfers to family',
          keywords: ['upi', 'transfer', 'family', 'paytm', 'phonepe', 'gpay'],
          commonMerchants: ['UPI Transfer', 'Family Transfer', 'Money Transfer']
        }
      ]
    },
    {
      id: 'cultural_social',
      name: 'Cultural & Social',
      icon: <Users className="w-5 h-5" />,
      categories: [
        {
          id: 'festivals',
          name: 'Festivals & Celebrations',
          icon: <Heart className="w-4 h-4" />,
          parentCategory: 'Entertainment',
          enabled: true,
          description: 'Festival shopping, gifts, and celebration expenses',
          keywords: ['diwali', 'holi', 'dussehra', 'eid', 'christmas', 'festival'],
          commonMerchants: ['Gift Shop', 'Festival Store', 'Decoration Shop']
        },
        {
          id: 'temple_donations',
          name: 'Temple & Donations',
          icon: <Heart className="w-4 h-4" />,
          parentCategory: 'Personal Care',
          enabled: true,
          description: 'Religious donations and temple visits',
          keywords: ['temple', 'donation', 'charity', 'religious', 'seva'],
          commonMerchants: ['Temple', 'Charity', 'Religious Organization']
        },
        {
          id: 'family_expenses',
          name: 'Family Support',
          icon: <Users className="w-4 h-4" />,
          parentCategory: 'Personal',
          enabled: true,
          description: 'Money sent to family members and relatives',
          keywords: ['family', 'parents', 'relatives', 'support', 'home'],
          commonMerchants: ['Family Transfer', 'Home Support', 'Relative Support']
        }
      ]
    }
  ];

  const toggleCategory = (groupId: string, categoryId: string) => {
    // Toggle logic would be implemented here
    console.log(`Toggling ${categoryId} in ${groupId}`);
  };

  const updateBudget = (groupId: string, categoryId: string, budget: number) => {
    // Budget update logic would be implemented here
    console.log(`Updating budget for ${categoryId}: ${budget}`);
  };

  const filteredCategories = indianCategories.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.categories.some(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Indian Context Categories
          </h2>
          <p className="text-muted-foreground">Micro-categories tailored for Indian spending patterns</p>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          {indianCategories.reduce((acc, group) => acc + group.categories.filter(cat => cat.enabled).length, 0)} Active
        </Badge>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Categories</Label>
          <Input
            id="search"
            placeholder="Search categories, keywords, or merchants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-6">
            {filteredCategories.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    {group.icon}
                    {group.name}
                  </CardTitle>
                  <CardDescription>
                    {group.categories.length} categories available
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {group.categories.map((category, index) => (
                      <div key={category.id}>
                        <div className="p-4 hover:bg-muted/30 transition-colors">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={category.enabled}
                                  onCheckedChange={() => toggleCategory(group.id, category.id)}
                                />
                                <div className="flex items-center gap-2">
                                  {category.icon}
                                  <div>
                                    <h4 className="font-medium">{category.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {category.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">
                                {category.parentCategory}
                              </Badge>
                            </div>

                            {category.enabled && (
                              <div className="ml-8 space-y-3">
                                {category.monthlyBudget && (
                                  <div className="flex items-center gap-4">
                                    <Label className="text-sm">Monthly Budget:</Label>
                                    <div className="flex items-center gap-2">
                                      <span>₹</span>
                                      <Input
                                        type="number"
                                        value={category.monthlyBudget}
                                        onChange={(e) => updateBudget(group.id, category.id, parseInt(e.target.value))}
                                        className="w-24 h-8"
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h5 className="font-medium mb-2">Keywords:</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {category.keywords.map((keyword, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {keyword}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="font-medium mb-2">Common Merchants:</h5>
                                    <div className="space-y-1">
                                      {category.commonMerchants.map((merchant, idx) => (
                                        <p key={idx} className="text-xs text-muted-foreground">
                                          • {merchant}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {index < group.categories.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Recognition</CardTitle>
              <CardDescription>
                Merchants automatically mapped to Indian context categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {indianCategories.map((group) =>
                  group.categories.filter(cat => cat.enabled).map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        {category.icon}
                        <h4 className="font-medium">{category.name}</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {category.commonMerchants.map((merchant, idx) => (
                          <div key={idx} className="p-2 bg-muted/50 rounded text-sm text-center">
                            {merchant}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Mapping</CardTitle>
              <CardDescription>
                Keywords used to identify Indian context transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {indianCategories.map((group) => (
                  <div key={group.id}>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      {group.icon}
                      {group.name}
                    </h3>
                    <div className="grid gap-3 ml-6">
                      {group.categories.filter(cat => cat.enabled).map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {category.keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
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
      </Tabs>

      <div className="flex gap-2 pt-4">
        <Button variant="outline" className="flex-1">
          Import Sample Data
        </Button>
        <Button variant="outline" className="flex-1">
          Export Configuration
        </Button>
        <Button className="flex-1">
          Save Changes
        </Button>
      </div>
    </div>
  );
}