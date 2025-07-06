"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { HearingProgress } from "./hearing-progress";
import { HearingStepComponent } from "./hearing-step";
import { hearingSteps, getNextStep } from "@/data/hearing-flow";
import { UserPreferences, HearingSession } from "@/types";

interface InteractiveHearingProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function InteractiveHearing({ onComplete }: InteractiveHearingProps) {
  const [session, setSession] = useState<HearingSession>({
    id: Date.now().toString(),
    currentStep: 'welcome',
    preferences: {},
    completedSteps: [],
    startedAt: new Date().toISOString(),
    completed: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const totalSteps = Object.keys(hearingSteps).length - 1; // Exclude 'result' step
  const currentStepIndex = Object.keys(hearingSteps).indexOf(session.currentStep) + 1;

  const handleAnswer = (stepId: string, values: string[]) => {
    setSession(prev => {
      const newPreferences = { ...prev.preferences };
      
      // Map step answers to preferences
      switch (stepId) {
        case 'budget':
          newPreferences.budget = values[0] === 'custom' ? 'custom' : parseInt(values[0]);
          break;
        case 'group_size':
          newPreferences.groupType = values[0] as UserPreferences['groupType'];
          if (values[0] === 'solo') newPreferences.groupSize = 1;
          else if (values[0] === 'couple') newPreferences.groupSize = 2;
          else if (values[0] === 'family') newPreferences.groupSize = 4;
          else if (values[0] === 'friends') newPreferences.groupSize = 5;
          else if (values[0] === 'large_group') newPreferences.groupSize = 8;
          break;
        case 'duration':
          newPreferences.duration = values[0] === '5+' ? 5 : parseInt(values[0]);
          break;
        case 'transportation':
          newPreferences.transportation = values[0] as UserPreferences['transportation'];
          break;
        case 'interests':
          newPreferences.interests = values;
          break;
        case 'departure_location':
          newPreferences.departureLocation = values[0];
          break;
      }

      return {
        ...prev,
        preferences: newPreferences
      };
    });
  };

  const handleNext = () => {
    const currentStep = hearingSteps[session.currentStep];
    if (!currentStep) return;

    if (session.currentStep === 'confirmation') {
      setIsProcessing(true);
      // Complete the hearing process
      setTimeout(() => {
        setSession(prev => ({ ...prev, completed: true }));
        onComplete(session.preferences);
      }, 1000);
      return;
    }

    const nextStepId = getNextStep(session.currentStep);
    if (nextStepId) {
      setSession(prev => ({
        ...prev,
        currentStep: nextStepId,
        completedSteps: [...prev.completedSteps, session.currentStep]
      }));
    }
  };

  const currentStepData = hearingSteps[session.currentStep];

  if (isProcessing) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[70%]">
          <HearingProgress 
            currentStep={totalSteps} 
            totalSteps={totalSteps} 
            className="mb-4" 
          />
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Bot className="w-5 h-5 mt-1 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">あなたの理想の旅行プランを作成しています...</p>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentStepData) {
    return null;
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] w-full">
        {session.currentStep !== 'welcome' && (
          <HearingProgress 
            currentStep={currentStepIndex} 
            totalSteps={totalSteps} 
            className="mb-4" 
          />
        )}
        
        <div className="flex items-start space-x-2">
          <Bot className="w-5 h-5 mt-1 text-muted-foreground flex-shrink-0" />
          <div className="flex-1">
            <HearingStepComponent
              step={currentStepData}
              preferences={session.preferences}
              onAnswer={handleAnswer}
              onNext={handleNext}
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}