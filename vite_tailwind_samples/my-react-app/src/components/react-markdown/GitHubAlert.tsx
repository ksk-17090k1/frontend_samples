import React from "react";

interface GitHubAlertProps {
  type: "note" | "tip" | "important" | "warning" | "caution";
  children: React.ReactNode;
}

const GitHubAlert: React.FC<GitHubAlertProps> = ({ type, children }) => {
  const alertConfig = {
    note: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
      leftBorderColor: "border-l-blue-500",
      titleColor: "text-blue-800",
      title: "Note",
      icon: "ℹ️",
    },
    tip: {
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-900",
      leftBorderColor: "border-l-emerald-500",
      titleColor: "text-emerald-800",
      title: "Tip",
      icon: "💡",
    },
    important: {
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-900",
      leftBorderColor: "border-l-purple-500",
      titleColor: "text-purple-800",
      title: "Important",
      icon: "❗",
    },
    warning: {
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-900",
      leftBorderColor: "border-l-amber-500",
      titleColor: "text-amber-800",
      title: "Warning",
      icon: "⚠️",
    },
    caution: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-900",
      leftBorderColor: "border-l-red-500",
      titleColor: "text-red-800",
      title: "Caution",
      icon: "🛑",
    },
  };

  const config = alertConfig[type];

  return (
    <div
      className={`
        p-4 mb-6 border-l-4 border rounded-md
        ${config.bgColor} 
        ${config.borderColor} 
        ${config.leftBorderColor}
        ${config.textColor}
        shadow-sm
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-lg flex-shrink-0">{config.icon}</span>
        <p className={`font-semibold text-sm ${config.titleColor}`}>
          {config.title}
        </p>
      </div>
      <div className="text-sm leading-relaxed prose prose-sm max-w-none">
        {children}
      </div>
    </div>
  );
};

export default GitHubAlert;
