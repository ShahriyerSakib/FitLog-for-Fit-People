"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  ListChecks,
} from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useStore } from "@/components/store";
import type { Workout } from "@/types/fitlog";
const api = "https://api.abcz.workers.dev/api/fitlog";
export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [w, setW] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { plan, saved, addPlan, addSaved } = useStore();
  useEffect(() => {
    fetch(`${api}/${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((x) => {
        const a = x?.data ?? x?.workout ?? x;
        setW({
          ...a,
          id: a.id ?? id,
          name: a.name ?? a.title ?? "Workout",
          image: a.image ?? a.imageUrl ?? a.thumbnail ?? "/assets/banner.png",
          category: a.category ?? a.categories ?? [],
          equipment: a.equipment ?? "Bodyweight",
          difficulty: a.difficulty ?? "Intermediate",
          sets: a.sets ?? 4,
          reps: a.reps ?? "8-12",
          duration: a.duration ?? 20,
          calories: a.calories ?? 150,
          rating: a.rating ?? 4.8,
          instructions: a.instructions ?? [],
        });
      })
      .catch(() => setW(null))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading)
    return (
      <main className="container grid min-h-[70vh] place-items-center">
        <p className="text-zinc-400">Loading workout…</p>
      </main>
    );
  if (!w)
    return (
      <main className="container grid min-h-[70vh] place-items-center text-center">
        <div>
          <h1 className="display text-6xl">WORKOUT NOT FOUND</h1>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[var(--accent)] px-5 py-3 font-black text-black"
          >
            BACK TO LIBRARY
          </Link>
        </div>
      </main>
    );
  const tags = Array.isArray(w.category)
    ? w.category
    : [w.category ?? "FULL BODY"];
  const inPlan = plan.some((x) => String(x.id) === String(w.id));
  const inSaved = saved.some((x) => String(x.id) === String(w.id));
  const add = () => {
    if (inPlan) {
      toast.info("Already in today's plan");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Today's plan is full (5 lifts max)");
      return;
    }
    addPlan(w);
    toast.success("Added to today's plan");
  };
  const save = () => {
    if (inSaved) {
      toast.info("Already saved");
      return;
    }
    addSaved(w);
    toast.success("Saved for later");
  };
  return (
    <main className="container py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={16} /> BACK TO LIBRARY
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 lg:min-h-[680px]">
          <Image
            src={String(w.image)}
            alt={w.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="py-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={String(t)}
                className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-black uppercase text-[var(--accent)]"
              >
                {String(t)}
              </span>
            ))}
          </div>
          <h1 className="display mt-5 text-6xl uppercase leading-none sm:text-7xl">
            {w.name}
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-zinc-400">
            {String(
              w.description ||
                "A focused movement designed to build strength, control, and consistent training volume.",
            )}
          </p>
          <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)] sm:grid-cols-3">
            {[
              [
                "EQUIPMENT",
                Array.isArray(w.equipment)
                  ? w.equipment.join(", ")
                  : w.equipment,
              ],
              ["DIFFICULTY", w.difficulty],
              ["SETS", w.sets],
              ["REPS", w.reps],
              ["DURATION", `${w.duration} min`],
              ["CALORIES", `${w.calories} kcal`],
              ["RATING", w.rating],
            ].map(([k, v]) => (
              <div
                key={String(k)}
                className="border-b border-r border-white/10 p-4"
              >
                <p className="text-[10px] font-black tracking-widest text-zinc-500">
                  {k}
                </p>
                <p className="mt-1 font-bold">{String(v)}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-xs font-black tracking-[.25em] text-[var(--accent)]">
            INSTRUCTIONS
          </h2>
          <ol className="mt-4 space-y-3">
            {(Array.isArray(w.instructions) && w.instructions.length
              ? w.instructions
              : [
                  "Set up with controlled form and stable positioning.",
                  "Brace your core and move through a full comfortable range.",
                  "Keep the tempo controlled and focus on the target muscle.",
                  "Finish the prescribed reps, then rest before the next set.",
                ]
            )
              .slice(0, 4)
              .map((s, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl border border-white/10 p-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-zinc-300">
                    {String(s)}
                  </span>
                </li>
              ))}
          </ol>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              onClick={add}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-4 text-sm font-black text-black"
            >
              <ListChecks size={17} />{" "}
              {inPlan ? "IN TODAY'S PLAN" : "ADD TO TODAY'S PLAN"}
            </button>
            <button
              onClick={save}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-4 text-sm font-black"
            >
              <Bookmark size={17} /> {inSaved ? "SAVED" : "SAVE FOR LATER"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
