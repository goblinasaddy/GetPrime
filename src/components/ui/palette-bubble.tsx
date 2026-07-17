import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type QuestionStatus =
  | "unvisited"
  | "unanswered"
  | "answered"
  | "review"
  | "answered-review";

export interface PaletteBubbleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  number: number;
  status: QuestionStatus;
  isActive?: boolean;
}

export const PaletteBubble = React.forwardRef<
  HTMLButtonElement,
  PaletteBubbleProps
>(({ className, number, status, isActive = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        clsx(
          "h-10 w-10 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary select-none",
          {
            // Base border for active state
            "ring-2 ring-blue-600 ring-offset-2 scale-105 z-10": isActive,

            // Status shapes & colors
            // 1. Unvisited: Grayish rectangle
            "bg-palette-unvisited text-palette-unvisited-text border border-slate-300 rounded-md hover:bg-slate-200":
              status === "unvisited",

            // 2. Unanswered: Reddish-orange box with rounded top (TCS style)
            "bg-palette-unanswered text-palette-unanswered-text border border-orange-700 rounded-t-lg hover:bg-orange-700":
              status === "unanswered",

            // 3. Answered: Green box with rounded bottom (TCS style)
            "bg-palette-answered text-palette-answered-text border border-green-700 rounded-b-lg hover:bg-green-700":
              status === "answered",

            // 4. Marked for Review: Purple/Violet circle (TCS style)
            "bg-palette-review text-palette-review-text border border-purple-700 rounded-full hover:bg-purple-700":
              status === "review",

            // 5. Answered & Marked for Review: Blue circle with a small status indicator
            "bg-palette-answered-review text-palette-answered-review-text border border-blue-700 rounded-full relative hover:bg-blue-700":
              status === "answered-review",
          },
          className
        )
      )}
      {...props}
    >
      <span>{number}</span>
      {status === "answered-review" && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
      )}
    </button>
  );
});
PaletteBubble.displayName = "PaletteBubble";
