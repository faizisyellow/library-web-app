import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title = "No Data", description = "There's nothing to display at the moment.", action, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-6 text-center space-y-4", className)}>
      {Icon && (
        <Icon
          className="h-12 w-12 text-muted-foreground opacity-50"
          strokeWidth={1.5}
        />
      )}

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
