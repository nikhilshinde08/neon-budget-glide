import { FinanceHeader } from "@/components/FinanceHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionList } from "@/components/TransactionList";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        <FinanceHeader />
        
        <div className="p-4">
          <BalanceCard />
        </div>
        
        <QuickActions />
        <TransactionList />
        
        {/* Bottom spacing for nav */}
        <div className="h-24"></div>
        
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
