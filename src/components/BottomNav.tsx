import { Home, BarChart3, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "home", label: "Home", icon: Home, active: true },
  { id: "analytics", label: "Analytics", icon: BarChart3, active: false },
  { id: "cards", label: "Cards", icon: CreditCard, active: false },
  { id: "profile", label: "Profile", icon: User, active: false }
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex flex-col items-center space-y-1 h-16 ${
              item.active 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}