"use client"
import Link from 'next/link'
import Image from "next/image";

export function APIKeyCTA() {
  return (
    <div className="my-6 flex items-center gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
        <Link className="button-primary" href="https://agentverse.ai/">Sign up</Link> <div>Get instant access to agentverse and the APIs.</div>
    </div>
  );
}
