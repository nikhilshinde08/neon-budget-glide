import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Plus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cards = () => {
  const navigate = useNavigate();
  const [showCardNumbers, setShowCardNumbers] = useState(false);

  // Mock card data - in real app this would come from database
  const cards = [
    {
      id: 1,
      type: 'Debit',
      bank: 'Chase Bank',
      last4: '4532',
      balance: 2840.50,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      type: 'Credit',
      bank: 'Capital One',
      last4: '8901',
      balance: -1250.00,
      limit: 5000,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      type: 'Credit',
      bank: 'American Express',
      last4: '2468',
      balance: -320.75,
      limit: 10000,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const formatCardNumber = (last4: string) => {
    return showCardNumbers ? `**** **** **** ${last4}` : `**** ****`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">My Cards</h1>
          <Button variant="ghost" size="icon" onClick={() => setShowCardNumbers(!showCardNumbers)}>
            {showCardNumbers ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Add New Card */}
          <Button className="w-full h-12 text-base" variant="outline">
            <Plus className="w-5 h-5 mr-2" />
            Add New Card
          </Button>

          {/* Cards List */}
          <div className="space-y-4">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className={`bg-gradient-to-r ${card.color} p-6 text-white relative`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-90">{card.bank}</p>
                      <Badge variant="secondary" className="mt-1 bg-white/20 text-white border-none">
                        {card.type}
                      </Badge>
                    </div>
                    <CreditCard className="w-8 h-8 opacity-80" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg font-mono tracking-wider">
                      {formatCardNumber(card.last4)}
                    </p>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-75">Balance</p>
                        <p className="text-xl font-bold">
                          ${Math.abs(card.balance).toFixed(2)}
                        </p>
                      </div>
                      
                      {card.type === 'Credit' && (
                        <div className="text-right">
                          <p className="text-xs opacity-75">Limit</p>
                          <p className="text-sm">${card.limit?.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {card.type === 'Credit' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Used</span>
                          <span>${Math.abs(card.balance).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Available</span>
                          <span className="text-green-600">
                            ${((card.limit || 0) - Math.abs(card.balance)).toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ 
                              width: `${(Math.abs(card.balance) / (card.limit || 1)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Freeze Card
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-3" />
                Card Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-3" />
                Transaction History
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-3" />
                Request Credit Increase
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        <BottomNav />
      </div>
    </div>
  );
};

export default Cards;