import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-purple-400",
  iconBgColor = "from-purple-600/20 to-purple-600/10",
}: StatCardProps) {
  return (
    <div className="relative group">
      {/* Glassmorphic card */}
      <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6 overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:shadow-purple-500/10">
        {/* Gradient background effect */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${iconBgColor} blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-2">{title}</p>
            <p className="text-3xl font-bold text-white mb-2">{value}</p>
            {trend && (
              <p
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          
          {/* Icon */}
          <div className={`p-3 rounded-xl bg-gradient-to-br ${iconBgColor} border border-purple-500/20`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
