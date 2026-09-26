"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/components/store";
import type { Workout } from "@/types/fitlog";
function Card({
  w,
  planned,
  remove,
  done,
}: {
  w: Workout & { done?: boolean };
  planned: boolean;
  remove: () => void;
  done?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[var(--panel)] p-4 sm:flex-row sm:items-center">
      <div className="relative h-28 w-full overflow-hidden rounded-xl bg-zinc-900 sm:w-40">
        <Image
          src={String(w.image ?? "/assets/banner.png")}
          alt={w.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="display text-2xl uppercase">{w.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">
          {Array.isArray(w.equipment)
            ? w.equipment.join(", ")
            : String(w.equipment ?? "Bodyweight")}
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock3 size={14} />
            {String(w.duration ?? 20)} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} />
            {String(w.calories ?? 150)} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} />
            {String(w.rating ?? 4.8)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:w-56 sm:justify-end">
        <Link
          href={`/workout/${w.id}`}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold"
        >
          VIEW DETAILS
        </Link>
        {planned && (
          <>
            <button
              onClick={done}
              className={`rounded-full px-4 py-2 text-xs font-bold ${w.done ? "bg-[var(--accent)] text-black" : "bg-white/10"}`}
            >
              <Check size={14} className="mr-1 inline" />
              {w.done ? "DONE" : "MARK AS DONE"}
            </button>
            <button
              onClick={remove}
              className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default function MyPlan() {
  const { plan, saved, removePlan, removeSaved, toggleDone } = useStore();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const a = tab === "plan" ? plan : saved;
    return a.filter((w) =>
      String(w.name).toLowerCase().includes(q.toLowerCase()),
    );
  }, [tab, plan, saved, q]);
  const minutes = plan.reduce((n, w) => n + Number(w.duration ?? 0), 0);
  const calories = plan.reduce((n, w) => n + Number(w.calories ?? 0), 0);
  return (
    <main className="container py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black tracking-[.25em] text-[var(--accent)]">
            THE LOG
          </p>
          <h1 className="display mt-2 text-6xl">MY PLAN</h1>
          <p className="mt-2 text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search entries"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none"
        />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Exercises", plan.length],
          ["Minutes", minutes],
          ["Calories", calories],
        ].map(([k, v]) => (
          <div
            key={String(k)}
            className="rounded-2xl border border-white/10 bg-[var(--panel)] p-5"
          >
            <p className="text-xs font-black tracking-widest text-zinc-500">
              {k}
            </p>
            <p className="display mt-2 text-4xl">{String(v)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-2 border-b border-white/10">
        <button
          onClick={() => setTab("plan")}
          className={`border-b-2 px-4 py-3 text-sm font-black ${tab === "plan" ? "border-[var(--accent)] text-white" : "border-transparent text-zinc-500"}`}
        >
          TODAY&apos;S PLAN ({plan.length})
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`border-b-2 px-4 py-3 text-sm font-black ${tab === "saved" ? "border-[var(--accent)] text-white" : "border-transparent text-zinc-500"}`}
        >
          SAVED ({saved.length})
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {list.length ? (
          list.map((w) => (
            <Card
              key={String(w.id)}
              w={w}
              planned={tab === "plan"}
              remove={() => {
  if (tab === "plan") {
    removePlan(w.id);
    toast.success("Removed from plan");
  } else {
    removeSaved(w.id);
    toast.success("Removed from saved");
  }
}}
              done={() => {
                toggleDone(w.id);
                toast.success(
                  w.done ? "Marked as not done" : "Workout marked as done",
                );
              }}
            />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center">
            <p className="text-xs font-black tracking-[.3em] text-[var(--accent)]">
              EMPTY STATE
            </p>
            <h2 className="display mt-3 text-5xl">NOTHING HERE YET</h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-500">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-black text-black"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
