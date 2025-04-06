"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";

const defaultExercises: string[] = [
  "Bench Press",
  "Incline Bench Press",
  "Chest Fly",
  "Push-Ups",
  "Pec Deck",
  "Lat Pulldown",
  "Pull-Ups",
  "Seated Row",
  "Deadlift",
  "T-Bar Row",
  "One-Arm Dumbbell Row",
  "Overhead Press",
  "Lateral Raise",
  "Front Raise",
  "Rear Delt Fly",
  "Arnold Press",
  "Shoulder Press Machine",
  "Squats",
  "Leg Press",
  "Leg Curl",
  "Leg Extension",
  "Romanian Deadlift",
  "Walking Lunges",
  "Calf Raises",
  "Bicep Curl",
  "Preacher Curl",
  "Concentration Curl",
  "Tricep Pushdown",
  "Overhead Tricep Extension",
  "Tricep Dips",
  "Skull Crushers",
  "Plank",
  "Russian Twists",
  "Hanging Leg Raise",
  "Sit-Ups",
  "Bicycle Crunches",
  "Cable Woodchoppers",
  "Ab Wheel Rollout",
  "Treadmill",
  "Elliptical",
  "StairMaster",
  "Rowing Machine",
  "Stationary Bike",
  "Battle Ropes",
  "Jump Rope"
];

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export default function WorkoutTracker() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "", reps: "", weight: "" }
  ]);
  const [customExercises, setCustomExercises] = useState<string[]>([]);

  const getSuggestions = (): string[] => [...new Set([...defaultExercises, ...customExercises])];

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExercise = (index: number) => {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
  };

  const handleCustomExercise = (name: string) => {
    if (!getSuggestions().includes(name)) {
      setCustomExercises((prev) => [...prev, name]);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">🏋️ Workout Tracker</h1>

      {exercises.map((exercise, index) => (
        <Card key={index} className="shadow-md">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <Combobox
                options={getSuggestions()}
                value={exercise.name}
                onValueChange={(val: string) => updateExercise(index, "name", val)}
                onCustomValue={(val: string) => {
                  handleCustomExercise(val);
                  updateExercise(index, "name", val);
                }}
                placeholder="Exercise Name"
              />
              <Button variant="ghost" onClick={() => removeExercise(index)}>
                <Trash2 className="text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => updateExercise(index, "sets", e.target.value)}
              />
              <Input
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => updateExercise(index, "reps", e.target.value)}
              />
              <Input
                placeholder="Weight (lbs)"
                value={exercise.weight}
                onChange={(e) => updateExercise(index, "weight", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addExercise} className="w-full">
        <Plus className="mr-2" /> Add Exercise
      </Button>

      <Button variant="secondary" className="w-full mt-2">
        Save Workout
      </Button>
    </div>
  );
}
