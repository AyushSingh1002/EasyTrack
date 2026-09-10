'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import TokenCounter from './TokenCounter';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: '/profile', label: 'Profile', icon: 'profile' },
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { href: '/applications', label: 'Applications', icon: 'applications' },
    { href: '/templates', label: 'Templates', icon: 'templates' },
    { href: '/pricing', label: 'Pricing', icon: 'pricing' },
  ];
  const isActive = (href) => pathname === href;
  const close = () => setIsOpen(false);

  return (
    <motion.nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-6" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 rounded-md text-lg font-bold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-black text-[var(--background)]">E</span>
          EazieTrack
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? 'text-[var(--foreground)]' : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]'}`}><Icon name={item.icon} size="sm" /><span>{item.label}</span>{active && <motion.span layoutId="active-nav" className="absolute inset-x-3 -bottom-3 h-0.5 rounded-full bg-[var(--primary)]" />}</Link>;
          })}
          <div className="ml-3 border-l border-[var(--border)] pl-3"><TokenCounter /></div>
          {session ? <button onClick={() => signOut()} className="ml-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--danger)] hover:text-[var(--danger)]">Sign out</button> : <Link href="/api/auth/signin" className="ml-2 rounded-lg bg-[var(--primary-strong)] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">Sign in</Link>}
        </div>
        <button className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen}><Icon name={isOpen ? 'close' : 'menu'} size="md" /></button>
      </div>
      <AnimatePresence>{isOpen && <><motion.button aria-label="Close menu" className="fixed inset-0 z-40 cursor-default bg-black/60 md:hidden" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="fixed right-0 top-0 z-50 flex h-full w-[min(88vw,22rem)] flex-col border-l border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl md:hidden" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}><div className="mb-8 flex items-center justify-between"><span className="text-base font-semibold">Menu</span><button onClick={close} className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-raised)]" aria-label="Close menu"><Icon name="close" size="md" /></button></div><div className="flex flex-col gap-2">{navItems.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={isActive(item.href) ? 'page' : undefined} className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium ${isActive(item.href) ? 'bg-[var(--surface-raised)] text-[var(--foreground)]' : 'text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)]'}`}><Icon name={item.icon} size="md" />{item.label}</Link>)}<div className="mt-4 flex items-center gap-3 border-t border-[var(--border)] px-4 pt-5 text-[var(--muted)]"><Icon name="tokens" size="md" />Tokens <TokenCounter isMobileMenu /></div>{session ? <button onClick={() => { signOut(); close(); }} className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-left text-[var(--danger)] hover:bg-red-500/10"><Icon name="close" size="md" />Sign out</button> : <Link href="/api/auth/signin" onClick={close} className="mt-2 rounded-lg bg-[var(--primary-strong)] px-4 py-3 font-semibold text-white">Sign in</Link>}</div></motion.aside></>}</AnimatePresence>
    </motion.nav>
  );
}
