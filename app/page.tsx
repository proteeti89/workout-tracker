import Link from "next/link";
import WorkoutTracker from "@/components/WorkoutTracker";

export default function Home() {
  // Somewhere near the top or bottom:
  <Link href="/history" className="text-blue-600 underline text-sm block text-center">
  View Past Workouts →
  </Link>
  return <WorkoutTracker />;

  
}




