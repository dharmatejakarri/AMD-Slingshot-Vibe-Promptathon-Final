// Frontend service to call the server API
export interface MealAnalysis {
  title: string;
  calories: number;
  score: number;
  nutrients: { label: string; val: string; color: string }[];
  activityInsight: string;
  swaps: { from: string; to: string; diff: string }[];
}

export async function analyzeMeal(mealText: string, imageBase64?: string): Promise<MealAnalysis> {
  const response = await fetch('/api/analyze-meal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mealText, imageBase64 }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to analyze meal: ${response.statusText}`);
  }

  return response.json();
}
