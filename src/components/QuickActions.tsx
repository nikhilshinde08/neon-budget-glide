import { ArrowUpRight, ArrowDownLeft, CreditCard, PiggyBank, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PDFUpload } from "./PDFUpload";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const actions = [
  {
    id: "send",
    label: "Send",
    icon: ArrowUpRight,
    color: "from-expense to-hot-pink",
    bgColor: "bg-expense/10"
  },
  {
    id: "receive",
    label: "Receive",
    icon: ArrowDownLeft,
    color: "from-income to-lime-accent",
    bgColor: "bg-income/10"
  },
  {
    id: "pay",
    label: "Pay Bills",
    icon: CreditCard,
    color: "from-electric-blue to-cyber-cyan",
    bgColor: "bg-electric-blue/10"
  },
  {
    id: "save",
    label: "Save",
    icon: PiggyBank,
    color: "from-savings to-neon-purple",
    bgColor: "bg-savings/10"
  }
];

export function QuickActions() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
      
      {/* Original Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            className="flex flex-col items-center space-y-2 h-20 hover:bg-muted/50"
          >
            <div className={`w-12 h-12 rounded-2xl ${action.bgColor} flex items-center justify-center`}>
              <action.icon className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* PDF Upload Section */}
      <div className="border-t pt-4">
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full h-12 flex items-center justify-center space-x-2"
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
    </div>
  );
}