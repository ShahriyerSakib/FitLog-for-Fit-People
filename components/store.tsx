'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PlanItem, Workout } from '@/types/fitlog';

type Store = { plan: PlanItem[]; saved: Workout[]; addPlan:(w:Workout)=>boolean; removePlan:(id:string|number)=>void; addSaved:(w:Workout)=>void; removeSaved:(id:string|number)=>void; toggleDone:(id:string|number)=>void };
const Ctx = createContext<Store | null>(null);
const key='fitlog-state-v1';
export function StoreProvider({children}:{children:React.ReactNode}) {
  const [plan,setPlan]=useState<PlanItem[]>([]); const [saved,setSaved]=useState<Workout[]>([]);
  useEffect(()=>{ try { const raw=localStorage.getItem(key); if(raw){const x=JSON.parse(raw);setPlan(x.plan??[]);setSaved(x.saved??[]);} } catch {} },[]);
  useEffect(()=>{ try{localStorage.setItem(key,JSON.stringify({plan,saved}));}catch{} },[plan,saved]);
  const value=useMemo(()=>({plan,saved,
    addPlan:(w:Workout)=>{if(plan.some(x=>String(x.id)===String(w.id))||plan.length>=5)return false;setPlan(x=>[...x,{...w,done:false}]);return true;},
    removePlan:(id:string|number)=>setPlan(x=>x.filter(w=>String(w.id)!==String(id))),
    addSaved:(w:Workout)=>setSaved(x=>x.some(y=>String(y.id)===String(w.id))?x:[...x,w]),
    removeSaved:(id:string|number)=>setSaved(x=>x.filter(w=>String(w.id)!==String(id))),
    toggleDone:(id:string|number)=>setPlan(x=>x.map(w=>String(w.id)===String(id)?{...w,done:!w.done}:w))
  }),[plan,saved]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useStore=()=>{const c=useContext(Ctx);if(!c)throw new Error('useStore must be used inside StoreProvider');return c;};
