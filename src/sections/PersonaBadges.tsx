import * as React from "react";
import { Zap, Clock, Palette } from "lucide-react";

export default function PersonaBadges(){
  const items = [
    {icon: Zap, label:"Budget‑Smart", className:"bg-emerald-50 text-emerald-700 ring-emerald-100"},
    {icon: Clock, label:"Launch Fast", className:"bg-orange-50 text-orange-700 ring-orange-100 countdown"},
    {icon: Palette, label:"Design‑Clean", className:"bg-blue-50 text-blue-700 ring-blue-100"}
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({icon:Icon,label,className})=> (
        <span key={label} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ring-1 ring-inset ${className}`}>
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}
