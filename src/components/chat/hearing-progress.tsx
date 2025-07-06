"use client";

interface HearingProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function HearingProgress({ currentStep, totalSteps, className = "" }: HearingProgressProps) {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>旅行プランヒアリング</span>
        <span>{currentStep}/{totalSteps}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}