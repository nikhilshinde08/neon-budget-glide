import { FinanceHeader } from "@/components/FinanceHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { DynamicQuickActions } from "@/components/DynamicQuickActions";
import { DynamicTransactionList } from "@/components/DynamicTransactionList";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        <FinanceHeader />
        
        <div className="p-4">
          <BalanceCard />
        </div>
        
        <DynamicQuickActions />
        
        {/* Financial Tools Section */}
        <div className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Financial Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => navigate('/debt-management')}
              >
                <TrendingDown className="w-5 h-5 mr-3 text-red-500" />
                <div className="text-left">
                  <div className="font-medium">Debt Management</div>
                  <div className="text-xs text-muted-foreground">Track and pay off debts</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => navigate('/savings-prediction')}
              >
                <PiggyBank className="w-5 h-5 mr-3 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Savings Prediction</div>
                  <div className="text-xs text-muted-foreground">Plan your savings goals</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <DynamicTransactionList />
        
        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
