"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, LoaderCircle, Search } from "lucide-react";
import type { Workout } from "@/types/fitlog";
import WorkoutCard from "./workout-card";

export default function WorkoutLibrary() {
  const [items, setItems] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((r) => r.json())
      .then((x) => {
        const data = Array.isArray(x) ? x : (x?.data ?? x?.workouts ?? []);
        setItems(data);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    return items
      .filter((w) => {
        const name = String(w.name ?? "");
        return name.toLowerCase().includes(query.toLowerCase());
      })
      .slice()
      .sort(
        (a, b) =>
          Number(a[sort as keyof Workout] ?? 0) -
          Number(b[sort as keyof Workout] ?? 0),
      );
  }, [items, sort, query]);

  return (
    <section id="library" className="container py-20">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black tracking-[.25em] text-[var(--accent)]">
            THE LIBRARY
          </p>

          <h2 className="display mt-2 text-5xl sm:text-6xl">TWELVE LIFTS</h2>

          <p className="mt-2 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
            <Search size={16} />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workouts"
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
            <ArrowDownUp size={16} />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent py-3 text-sm outline-none"
            >
              <option className="bg-zinc-900" value="duration">
                Sort By: Duration
              </option>

              <option className="bg-zinc-900" value="calories">
                Sort By: Calories
              </option>

              <option className="bg-zinc-900" value="rating">
                Sort By: Rating
              </option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="grid min-h-80 place-items-center">
          <div className="flex items-center gap-3 text-zinc-400">
            <LoaderCircle className="animate-spin" />
            Loading workouts…
          </div>
        </div>
      ) : sorted.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((w) => (
            <WorkoutCard
              key={String(w.id)}
              workout={{
                ...w,
                name: String(w.name ?? "Workout"),
                image: String(w.image ?? w.imageUrl ?? w.thumbnail ?? ""),
              }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 p-12 text-center text-zinc-400">
          No workouts found.
        </div>
      )}
    </section>
  );
}
