import type { Workout } from '@/types/fitlog';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

function isWorkout(value: unknown): value is Workout {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === 'string' ||
    typeof item.id === 'number'
  ) && typeof item.name === 'string';
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data.filter(isWorkout);
  }

  if (data && typeof data === 'object') {
    const responseData = data as Record<string, unknown>;

    if (Array.isArray(responseData.data)) {
      return responseData.data.filter(isWorkout);
    }

    if (Array.isArray(responseData.workouts)) {
      return responseData.workouts.filter(isWorkout);
    }
  }

  return [];
}

export async function getWorkout(
  id: string
): Promise<Workout | null> {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();

  if (isWorkout(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    const responseData = data as Record<string, unknown>;

    if (isWorkout(responseData.data)) {
      return responseData.data;
    }
  }

  return null;
}