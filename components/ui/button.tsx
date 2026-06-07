"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:bg-foreground/90 shadow-sm hover:shadow-md",
        secondary:
          "bg-background text-foreground border border-border hover:bg-muted hover:border-foreground/20",
        ghost:
          "text-secondary hover:text-foreground hover:bg-muted",
        accent:
          "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
        outline:
          "bg-transparent text-foreground border border-border hover:border-accent hover:text-accent",
        link:
          "text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-xs gap-1.5 rounded-lg",
        md: "h-10 px-5 text-sm gap-2 rounded-xl",
        lg: "h-12 px-7 text-sm gap-2 rounded-xl",
        xl: "h-14 px-8 text-base gap-2.5 rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
