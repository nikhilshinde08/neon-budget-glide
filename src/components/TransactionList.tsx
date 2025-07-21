import { ShoppingBag, Car, Coffee, Gamepad2, Music } from "lucide-react";
import { Card } from "@/components/ui/card";

const transactions = [
  {
    id: 1,
    title: "Shopping",
    category: "Lifestyle",
    amount: -120.00,
    time: "2 hours ago",
    icon: ShoppingBag,
    color: "bg-hot-pink/10 text-hot-pink"
  },
  {
    id: 2,
    title: "Uber Ride",
    category: "Transportation",
    amount: -25.50,
    time: "5 hours ago",
    icon: Car,
    color: "bg-electric-blue/10 text-electric-blue"
  },
  {
    id: 3,
    title: "Coffee Shop",
    category: "Food & Drink",
    amount: -8.75,
    time: "1 day ago",
    icon: Coffee,
    color: "bg-savings/10 text-savings"
  },
  {
    id: 4,
    title: "Gaming Subscription",
    category: "Entertainment",
    amount: -14.99,
    time: "2 days ago",
    icon: Gamepad2,
    color: "bg-neon-purple/10 text-neon-purple"
  },
  {
    id: 5,
    title: "Spotify Premium",
    category: "Entertainment",
    amount: -9.99,
    time: "3 days ago",
    icon: Music,
    color: "bg-cyber-cyan/10 text-cyber-cyan"
  }
];

export function TransactionList() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary font-medium">View All</button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4 bg-card border border-border hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl ${transaction.color} flex items-center justify-center`}>
                  <transaction.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{transaction.title}</h4>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${transaction.amount < 0 ? 'text-expense' : 'text-income'}`}>
                  {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}