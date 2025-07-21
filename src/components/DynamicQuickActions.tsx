import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, CreditCard, PiggyBank, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { PDFUpload } from "./PDFUpload";
import { useTransactions, useAccounts } from "@/hooks/useFinanceData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const actions = [
  {
    id: "income",
    label: "Add Income",
    icon: ArrowDownLeft,
    color: "from-income to-lime-accent",
    bgColor: "bg-income/10",
    type: "income"
  },
  {
    id: "expense", 
    label: "Add Expense",
    icon: ArrowUpRight,
    color: "from-expense to-hot-pink",
    bgColor: "bg-expense/10",
    type: "expense"
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: CreditCard,
    color: "from-electric-blue to-cyber-cyan",
    bgColor: "bg-electric-blue/10",
    type: "transfer"
  },
  {
    id: "save",
    label: "Save Goal",
    icon: PiggyBank,
    color: "from-savings to-neon-purple",
    bgColor: "bg-savings/10",
    type: "income"
  }
];

interface TransactionFormData {
  amount: string;
  description: string;
  category: string;
  account_id: string;
  transaction_type: 'income' | 'expense' | 'transfer';
}

export function DynamicQuickActions() {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<typeof actions[0] | null>(null);
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: '',
    description: '',
    category: '',
    account_id: '',
    transaction_type: 'expense'
  });

  const { createTransaction } = useTransactions();
  const { accounts } = useAccounts();

  const handleActionClick = (action: typeof actions[0]) => {
    setSelectedAction(action);
    setFormData(prev => ({
      ...prev,
      transaction_type: action.type as 'income' | 'expense' | 'transfer'
    }));
    setIsTransactionDialogOpen(true);
  };

  const handleSubmitTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || !formData.category || !formData.account_id) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await createTransaction({
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        account_id: formData.account_id,
        transaction_type: formData.transaction_type,
        transaction_date: new Date().toISOString()
      });

      setIsTransactionDialogOpen(false);
      setFormData({
        amount: '',
        description: '',
        category: '',
        account_id: '',
        transaction_type: 'expense'
      });
      
      toast({
        title: "Transaction added",
        description: `${selectedAction?.label} has been recorded successfully`
      });
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Bills & Utilities', 'Healthcare', 'Travel', 'Education',
    'Salary', 'Freelance', 'Investment', 'Business', 'Other'
  ];

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={action.id}
            variant="ghost"
            onClick={() => handleActionClick(action)}
            className="flex flex-col items-center space-y-2 h-20 hover:bg-muted/50 transition-all duration-200 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-12 h-12 rounded-2xl ${action.bgColor} flex items-center justify-center hover:scale-110 transition-transform duration-200`}>
              <action.icon className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* PDF Upload Section */}
      <div className="border-t pt-4">
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full h-12 flex items-center justify-center space-x-2 hover:scale-105 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Upload className="w-4 h-4" />
              <span>Upload PDF Documents</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <PDFUpload />
          </DialogContent>
        </Dialog>
      </div>

      {/* Transaction Form Dialog */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedAction?.icon && <selectedAction.icon className="w-5 h-5" />}
              <span>{selectedAction?.label}</span>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmitTransaction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({...prev, amount: e.target.value}))}
                className="animate-scale-in"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this for?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="animate-scale-in"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                <SelectTrigger className="animate-scale-in">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Account</Label>
              <Select value={formData.account_id} onValueChange={(value) => setFormData(prev => ({...prev, account_id: value}))}>
                <SelectTrigger className="animate-scale-in">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.account_name} ({account.account_type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsTransactionDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 hover:scale-105 transition-transform duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}