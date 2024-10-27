import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";
import { clsx } from "clsx";

import style from "./CssMChadcnBadge.module.css";

const badgeVariants = cva(
  //   "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  style.badge,
  {
    variants: {
      variant: {
        default:
          //   "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
          style.default,
        secondary:
          //   "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          style.secondary,
        destructive:
          //   "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
          style.destructive,
        outline:
          // "text-foreground",
          style.outline,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function CssMChadcnBadge({ className, variant, ...props }: BadgeProps) {
  console.log(badgeVariants());
  return (
    // <div className={cn(badgeVariants({ variant }), className)} {...props} />
    <div className={clsx(badgeVariants({ variant }), className)} {...props} />
  );
}

export { CssMChadcnBadge, badgeVariants };
