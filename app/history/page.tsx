"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface Workout {
  id: string;
  date: string;
  duration: string;
  location: string;
  notes: string;
  exercises: Exercise[];
}

export default function WorkoutHistory() {
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("workouts");
    if (data) {
      setSavedWorkouts(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">📋 Past Workouts</h1>
      {savedWorkouts.length === 0 ? (
        <p className="text-center text-gray-500">No workouts saved yet.</p>
      ) : (
        savedWorkouts.map((workout) => (
          <Card key={workout.id} className="bg-gray-50 shadow-sm">
            <CardContent className="p-4">
              <div className="font-medium">🗓️ {workout.date} • 🕒 {workout.duration}</div>
              <div className="text-sm text-gray-600">📍 {workout.location}</div>
              <div className="text-sm italic">📝 {workout.notes}</div>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {workout.exercises.map((ex, idx) => (
                  <li key={idx}>
                    {ex.name} – {ex.sets} sets × {ex.reps} reps @ {ex.weight} lbs
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
