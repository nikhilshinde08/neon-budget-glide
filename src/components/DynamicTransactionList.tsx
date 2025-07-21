import { useState } from "react";
import { ArrowUpDown, Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTransactions, Transaction } from "@/hooks/useFinanceData";
import { format } from "date-fns";

export function DynamicTransactionList() {
  const { transactions, loading, createTransaction } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || transaction.transaction_type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return '💰';
      case 'expense':
        return '💸';
      case 'transfer':
        return '🔄';
      default:
        return '💰';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'text-income';
      case 'expense':
        return 'text-expense';
      case 'transfer':
        return 'text-secondary';
      default:
        return 'text-foreground';
    }
  };

  const TransactionSkeleton = () => (
    <div className="flex items-center justify-between p-4 border-b animate-pulse">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
          <Button size="sm" className="animate-bounce-gentle">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex space-x-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 animate-scale-in"
            />
          </div>
          <div className="flex space-x-1">
            {['all', 'income', 'expense', 'transfer'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize transition-all duration-200 hover:scale-105"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="space-y-0">
            {[...Array(5)].map((_, i) => (
              <TransactionSkeleton key={i} />
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">💸</div>
            <p className="text-muted-foreground">
              {searchTerm || selectedType !== "all" 
                ? "No transactions match your search"
                : "No transactions yet. Add your first transaction to get started!"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredTransactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/30 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200">
                    {getTransactionIcon(transaction.transaction_type)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground hover:text-primary transition-colors duration-200">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.transaction_date), 'MMM d, yyyy')}
                      </p>
                      <Badge variant="secondary" className="text-xs animate-scale-in">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${getAmountColor(transaction.transaction_type)} hover:scale-105 transition-transform duration-200`}>
                    {transaction.transaction_type === 'expense' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {transaction.transaction_type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredTransactions.length > 0 && (
          <div className="p-4 border-t bg-muted/20 animate-fade-in">
            <Button variant="outline" className="w-full hover:scale-105 transition-all duration-200">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              View All Transactions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}