import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="p-6 bg-gradient-to-br from-primary via-accent to-secondary text-white border-0 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/80 text-sm">Total Balance</p>
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold">
              {showBalance ? "$25,847.32" : "••••••••"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/10"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/40"></div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-white/80 text-xs">Monthly Income</p>
          <p className="text-lg font-semibold">+$5,240.00</p>
        </div>
        <div>
          <p className="text-white/80 text-xs">Monthly Expense</p>
          <p className="text-lg font-semibold">-$2,840.00</p>
        </div>
      </div>
    </Card>
  );
}