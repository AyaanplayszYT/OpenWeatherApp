import { ReactNode } from "react";

interface HighlightCardProps {
  title: string;
  value?: string | number;
  unit?: string;
  status?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const HighlightCard = ({
  title,
  value,
  unit,
  status,
  icon,
  children,
}: HighlightCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all">
      <div className="text-sm text-muted-foreground mb-4">{title}</div>
      
      {children || (
        <>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">{value}</span>
            {unit && <span className="text-2xl text-muted-foreground">{unit}</span>}
          </div>
          
          {status && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {icon}
              <span>{status}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
