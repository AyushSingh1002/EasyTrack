'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Dither from './components/Dither';

const steps = [
  ['01', 'Capture the opportunity', 'Save roles as you find them, with the details that actually matter.'],
  ['02', 'Make the next move clear', 'Keep notes, status, contacts, and follow-ups in one focused view.'],
  ['03', 'Build momentum', 'Turn a scattered search into a steady rhythm you can see and trust.'],
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[760px] border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-20"><Dither /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_srgb,var(--background)_88%,transparent)_42%,transparent_100%)]" />
        <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-5 pb-12 pt-7 sm:px-8 lg:px-10">
          <div className="grid max-w-5xl items-end gap-10 pb-10 pt-28 lg:grid-cols-[1.25fr_.75fr]">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
              <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[.25em] text-[var(--primary)]"><span className="size-2 rounded-full bg-[var(--primary)]" />A calmer job search</p>
              <h1 className="max-w-4xl text-6xl font-medium leading-[.94] tracking-[-.07em] text-balance sm:text-8xl">Make progress you can actually <span className="text-[var(--primary)]">see.</span></h1>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3,duration:.7}}><p className="max-w-sm text-lg leading-8 text-[var(--muted-strong)]">EazieTrack brings your applications, notes, and next steps into one focused workspace.</p><Link href="/applications" className="mt-7 inline-flex items-center gap-3 border-b border-[var(--primary)] pb-2 text-sm font-semibold text-[var(--foreground)]">Start tracking <span aria-hidden="true">→</span></Link></motion.div>
          </div>
        </div>
      </section>
      <section id="principles" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">A better system</p><h2 className="mt-4 max-w-sm text-4xl font-medium leading-tight tracking-[-.05em]">Less noise. More signal.</h2></div><div className="grid gap-0 border-t border-[var(--border)] sm:grid-cols-3">{[['01','One clear workspace'],['02','Useful signals'],['03','Better follow-through']].map(([n,t])=><div key={n} className="border-b border-[var(--border)] py-6 sm:border-b-0 sm:border-l sm:px-6"><span className="font-mono text-xs text-[var(--primary)]">{n}</span><h3 className="mt-10 text-lg font-medium">{t}</h3></div>)}</div></div></section>
      <section id="how-it-works" className="border-y border-[var(--border)] bg-[var(--surface-muted)]"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"><div className="mb-14 flex items-end justify-between gap-6"><div><p className="eyebrow">The rhythm</p><h2 className="mt-4 text-4xl font-medium tracking-[-.05em]">A simple way forward.</h2></div><span className="hidden font-mono text-xs text-[var(--muted)] sm:block">EAZIETRACK / 001</span></div><div className="grid gap-8 md:grid-cols-3">{steps.map(([n,t,d])=><article key={n} className="border-t border-[var(--border-strong)] pt-5"><span className="font-mono text-xs text-[var(--primary)]">{n}</span><h3 className="mt-16 text-xl font-medium tracking-[-.02em]">{t}</h3><p className="mt-4 max-w-xs leading-7 text-[var(--muted)]">{d}</p></article>)}</div></div></section>
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"><div className="border border-[var(--border-strong)] p-8 sm:p-14"><p className="eyebrow">Ready when you are</p><div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-[-.05em] sm:text-5xl">Your next role is a series of small, clear moves.</h2><Link href="/applications" className="btn-primary shrink-0">Open EazieTrack <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}
