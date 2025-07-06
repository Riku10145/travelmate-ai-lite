import { HearingStep } from '@/types';

export const hearingSteps: Record<string, HearingStep> = {
  welcome: {
    id: 'welcome',
    type: 'question',
    question: 'こんにちは！あなたの理想の旅行プランを一緒に考えましょう。まず、どのような旅行をお考えですか？',
    options: [
      { id: 'new_plan', label: '新しい旅行を計画したい', value: 'new_plan', nextStep: 'budget' },
      { id: 'idea_search', label: '旅行先のアイデアを探している', value: 'idea_search', nextStep: 'budget' },
    ],
    required: true,
    nextStep: 'budget'
  },

  budget: {
    id: 'budget',
    type: 'question',
    question: '今回の旅行のご予算はどのくらいでしょうか？',
    options: [
      { id: 'budget_5k', label: '5千円以内（日帰り）', value: '5000', nextStep: 'group_size' },
      { id: 'budget_10k', label: '1万円以内', value: '10000', nextStep: 'group_size' },
      { id: 'budget_20k', label: '2万円以内', value: '20000', nextStep: 'group_size' },
      { id: 'budget_30k', label: '3万円以内', value: '30000', nextStep: 'group_size' },
      { id: 'budget_custom', label: 'その他（後で詳しく）', value: 'custom', nextStep: 'group_size' },
    ],
    required: true,
    nextStep: 'group_size'
  },

  group_size: {
    id: 'group_size',
    type: 'question',
    question: '何名での旅行でしょうか？',
    options: [
      { id: 'solo', label: '1人（一人旅）', value: 'solo', nextStep: 'duration' },
      { id: 'couple', label: '2人（カップル・夫婦）', value: 'couple', nextStep: 'duration' },
      { id: 'family', label: '3-4人（家族）', value: 'family', nextStep: 'duration' },
      { id: 'friends', label: '3-6人（友人グループ）', value: 'friends', nextStep: 'duration' },
      { id: 'large_group', label: '7人以上', value: 'large_group', nextStep: 'duration' },
    ],
    required: true,
    nextStep: 'duration'
  },

  duration: {
    id: 'duration',
    type: 'question',
    question: '何日間の旅行をお考えですか？',
    options: [
      { id: 'day_trip', label: '日帰り', value: '1', nextStep: 'transportation' },
      { id: 'one_night', label: '1泊2日', value: '2', nextStep: 'transportation' },
      { id: 'two_nights', label: '2泊3日', value: '3', nextStep: 'transportation' },
      { id: 'three_nights', label: '3泊4日', value: '4', nextStep: 'transportation' },
      { id: 'longer', label: '4泊以上', value: '5+', nextStep: 'transportation' },
    ],
    required: true,
    nextStep: 'transportation'
  },

  transportation: {
    id: 'transportation',
    type: 'question',
    question: '希望の交通手段はありますか？',
    options: [
      { id: 'train', label: '電車・新幹線', value: 'train', nextStep: 'interests' },
      { id: 'car', label: '車（レンタカー・マイカー）', value: 'car', nextStep: 'interests' },
      { id: 'bus', label: '高速バス', value: 'bus', nextStep: 'interests' },
      { id: 'plane', label: '飛行機', value: 'plane', nextStep: 'interests' },
      { id: 'mixed', label: '組み合わせ', value: 'mixed', nextStep: 'interests' },
      { id: 'any_transport', label: 'お任せ', value: 'any', nextStep: 'interests' },
    ],
    required: true,
    nextStep: 'interests'
  },

  interests: {
    id: 'interests',
    type: 'question',
    question: '旅行で特に楽しみたいことはありますか？（複数選択可）',
    options: [
      { id: 'sightseeing', label: '観光・名所巡り', value: 'sightseeing' },
      { id: 'gourmet', label: 'グルメ・食べ歩き', value: 'gourmet' },
      { id: 'onsen', label: '温泉・リラクゼーション', value: 'onsen' },
      { id: 'nature', label: '自然・アウトドア', value: 'nature' },
      { id: 'culture', label: '歴史・文化体験', value: 'culture' },
      { id: 'shopping', label: 'ショッピング', value: 'shopping' },
      { id: 'nightlife', label: '夜景・ナイトライフ', value: 'nightlife' },
      { id: 'photography', label: '写真・インスタ映え', value: 'photography' },
    ],
    required: false,
    nextStep: 'departure_location'
  },

  departure_location: {
    id: 'departure_location',
    type: 'question',
    question: '出発地はどちらからでしょうか？',
    options: [
      { id: 'tokyo', label: '東京都心', value: '東京', nextStep: 'confirmation' },
      { id: 'osaka', label: '大阪市内', value: '大阪', nextStep: 'confirmation' },
      { id: 'nagoya', label: '名古屋市内', value: '名古屋', nextStep: 'confirmation' },
      { id: 'fukuoka', label: '福岡市内', value: '福岡', nextStep: 'confirmation' },
      { id: 'other', label: 'その他', value: 'other', nextStep: 'confirmation' },
    ],
    required: false,
    nextStep: 'confirmation'
  },

  confirmation: {
    id: 'confirmation',
    type: 'confirmation',
    question: 'ヒアリング内容を確認します。これらの情報をもとに、あなたにぴったりの旅行プランをご提案いたします。',
    required: true,
    nextStep: 'result'
  },

  result: {
    id: 'result',
    type: 'result',
    question: 'プランを生成中です...',
    required: false
  }
};

export const getNextStep = (currentStepId: string, selectedValue?: string): string | null => {
  const currentStep = hearingSteps[currentStepId];
  if (!currentStep) return null;

  // If the option has a specific next step, use it
  if (selectedValue && currentStep.options) {
    const selectedOption = currentStep.options.find(opt => opt.value === selectedValue);
    if (selectedOption?.nextStep) {
      return selectedOption.nextStep;
    }
  }

  // Otherwise use the default next step
  return currentStep.nextStep || null;
};

export const isStepCompleted = (stepId: string, preferences: Record<string, unknown>): boolean => {
  switch (stepId) {
    case 'welcome':
      return true; // Always considered completed once visited
    case 'budget':
      return preferences.budget !== undefined;
    case 'group_size':
      return preferences.groupSize !== undefined || preferences.groupType !== undefined;
    case 'duration':
      return preferences.duration !== undefined;
    case 'transportation':
      return preferences.transportation !== undefined;
    case 'interests':
      return true; // Optional step
    case 'departure_location':
      return true; // Optional step
    case 'confirmation':
      return true; // Always completed when reached
    default:
      return false;
  }
};