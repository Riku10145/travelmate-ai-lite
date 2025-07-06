"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HearingStep, HearingOption, UserPreferences } from "@/types";
import { CheckCircle } from "lucide-react";

interface HearingStepProps {
  step: HearingStep;
  preferences: UserPreferences;
  onAnswer: (stepId: string, values: string[]) => void;
  onNext: () => void;
  disabled?: boolean;
}

export function HearingStepComponent({ 
  step, 
  preferences, 
  onAnswer, 
  onNext, 
  disabled = false 
}: HearingStepProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionSelect = (option: HearingOption) => {
    if (disabled) return;

    let newSelectedValues: string[];
    
    // For interests step, allow multiple selection
    if (step.id === 'interests') {
      if (selectedValues.includes(option.value)) {
        newSelectedValues = selectedValues.filter(v => v !== option.value);
      } else {
        newSelectedValues = [...selectedValues, option.value];
      }
    } else {
      // For other steps, single selection
      newSelectedValues = [option.value];
    }

    setSelectedValues(newSelectedValues);
    setHasAnswered(true);
    onAnswer(step.id, newSelectedValues);

    // Auto-advance for single-select questions
    if (step.id !== 'interests') {
      setTimeout(() => onNext(), 500);
    }
  };

  const handleNext = () => {
    if (step.id === 'interests' || !step.required) {
      onNext();
    }
  };

  const isOptionSelected = (option: HearingOption) => {
    return selectedValues.includes(option.value);
  };

  if (step.type === 'confirmation') {
    return (
      <Card className="max-w-[70%]">
        <CardContent className="p-4">
          <div className="space-y-4">
            <p className="text-sm">{step.question}</p>
            
            <div className="space-y-2 text-xs bg-muted/50 rounded-lg p-3">
              <h4 className="font-semibold">ヒアリング内容:</h4>
              {preferences.budget && (
                <div className="flex justify-between">
                  <span>予算:</span>
                  <span>{typeof preferences.budget === 'string' && preferences.budget === 'custom' ? 'その他' : `${preferences.budget}円`}</span>
                </div>
              )}
              {preferences.groupType && (
                <div className="flex justify-between">
                  <span>人数:</span>
                  <span>{getGroupTypeLabel(preferences.groupType)}</span>
                </div>
              )}
              {preferences.duration && (
                <div className="flex justify-between">
                  <span>期間:</span>
                  <span>{preferences.duration === 1 ? '日帰り' : `${preferences.duration}日間`}</span>
                </div>
              )}
              {preferences.transportation && (
                <div className="flex justify-between">
                  <span>交通手段:</span>
                  <span>{getTransportationLabel(preferences.transportation)}</span>
                </div>
              )}
              {preferences.interests && preferences.interests.length > 0 && (
                <div className="flex justify-between">
                  <span>興味:</span>
                  <span>{preferences.interests.map(getInterestLabel).join(', ')}</span>
                </div>
              )}
              {preferences.departureLocation && (
                <div className="flex justify-between">
                  <span>出発地:</span>
                  <span>{preferences.departureLocation}</span>
                </div>
              )}
            </div>

            <Button onClick={onNext} className="w-full" disabled={disabled}>
              この内容でプランを作成する
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-[70%]">
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="text-sm font-medium">{step.question}</p>
          
          {step.options && (
            <div className="grid gap-2">
              {step.options.map((option) => (
                <Button
                  key={option.id}
                  variant={isOptionSelected(option) ? "default" : "outline"}
                  className="justify-start text-left h-auto p-3 text-sm"
                  onClick={() => handleOptionSelect(option)}
                  disabled={disabled}
                >
                  <div className="flex items-center gap-2 w-full">
                    {isOptionSelected(option) && (
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    )}
                    <span className="flex-1">{option.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {step.id === 'interests' && hasAnswered && (
            <Button onClick={handleNext} className="w-full mt-3" disabled={disabled}>
              次へ進む
            </Button>
          )}

          {!step.required && !hasAnswered && (
            <Button variant="ghost" onClick={handleNext} className="w-full" disabled={disabled}>
              スキップ
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getGroupTypeLabel(groupType: string): string {
  const labels: Record<string, string> = {
    'solo': '1人（一人旅）',
    'couple': '2人（カップル・夫婦）',
    'family': '3-4人（家族）',
    'friends': '3-6人（友人グループ）',
    'large_group': '7人以上'
  };
  return labels[groupType] || groupType;
}

function getTransportationLabel(transportation: string): string {
  const labels: Record<string, string> = {
    'train': '電車・新幹線',
    'car': '車',
    'bus': '高速バス',
    'plane': '飛行機',
    'mixed': '組み合わせ',
    'any': 'お任せ'
  };
  return labels[transportation] || transportation;
}

function getInterestLabel(interest: string): string {
  const labels: Record<string, string> = {
    'sightseeing': '観光・名所巡り',
    'gourmet': 'グルメ・食べ歩き',
    'onsen': '温泉・リラクゼーション',
    'nature': '自然・アウトドア',
    'culture': '歴史・文化体験',
    'shopping': 'ショッピング',
    'nightlife': '夜景・ナイトライフ',
    'photography': '写真・インスタ映え'
  };
  return labels[interest] || interest;
}