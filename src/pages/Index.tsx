import { FinanceHeader } from "@/components/FinanceHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { DynamicQuickActions } from "@/components/DynamicQuickActions";
import { DynamicTransactionList } from "@/components/DynamicTransactionList";
import { BottomNav } from "@/components/BottomNav";
import { useEffect } from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        <FinanceHeader />
        
        <div className="p-4">
          <BalanceCard />
        </div>
        
        <DynamicQuickActions />
        <DynamicTransactionList />
        
        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
