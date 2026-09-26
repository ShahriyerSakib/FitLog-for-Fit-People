"use client";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/fitlog";
const val = (v: unknown, f: string) => String(v ?? f);
const tags = (w: Workout) =>
  Array.isArray(w.category) ? w.category : [w.category ?? "FULL BODY"];
export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)] transition hover:-translate-y-1 hover:border-white/25"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        <Image
          src={String(workout.image ?? "/assets/banner.png")}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {tags(workout)
            .slice(0, 2)
            .map((t) => (
              <span
                key={String(t)}
                className="rounded bg-black/70 px-2 py-1 text-[10px] font-black uppercase"
              >
                {String(t)}
              </span>
            ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="display text-2xl uppercase">{workout.name}</h3>
        <p className="mt-2 text-sm text-zinc-400">
          {Array.isArray(workout.equipment)
            ? workout.equipment.join(", ")
            : val(workout.equipment, "Bodyweight")}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock3 size={14} /> {val(workout.duration, "20")} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} /> {val(workout.calories, "150")} kcal
          </span>
          <span className="flex items-center gap-1 text-white">
            <Star size={14} fill="currentColor" /> {val(workout.rating, "4.8")}
          </span>
        </div>
      </div>
    </Link>
  );
}
