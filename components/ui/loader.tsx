"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"

interface LoaderProps {
    duration?: number
    onComplete?: () => void
}

export function Loader({ duration = 5, onComplete }: LoaderProps) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState<"loading" | "done">("loading")
    const rafRef = useRef<number | null>(null)
    const startRef = useRef<number | null>(null)

    useEffect(() => {
        const totalMs = duration * 1000

        const tick = (now: number) => {
            if (!startRef.current) startRef.current = now
            const elapsed = now - startRef.current
            const pct = Math.min((elapsed / totalMs) * 100, 100)
            setProgress(Math.floor(pct))

            if (pct < 100) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                setPhase("done")
                setTimeout(() => onComplete?.(), 600)
            }
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [duration, onComplete])

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden"
            style={{
                opacity: phase === "done" ? 0 : 1,
                transition: "opacity 0.6s ease",
            }}
        >
            <style>{`
        /* Rotary ring */
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ring-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* Pulsing dot */
        @keyframes core-pulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.18); opacity: 0.85; }
        }
        /* Floating dots trail */
        @keyframes orbit {
          from { transform: rotate(var(--start)) translateX(52px) rotate(calc(-1 * var(--start))); }
          to   { transform: rotate(calc(var(--start) + 360deg)) translateX(52px) rotate(calc(-1 * (var(--start) + 360deg))); }
        }
        /* Progress shimmer */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        /* Ticker blink */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .ring-outer {
          animation: ring-spin 4s linear infinite;
        }
        .ring-inner {
          animation: ring-spin-rev 2.5s linear infinite;
        }
        .core-dot {
          animation: core-pulse 1.8s ease-in-out infinite;
        }
        .orbit-dot {
          animation: orbit calc(var(--dur, 3s)) linear infinite;
          animation-delay: var(--delay, 0s);
        }
        .progress-bar-fill {
          background: linear-gradient(90deg,
            transparent 0%,
            hsl(220 90% 60%) 30%,
            hsl(260 80% 70%) 50%,
            hsl(220 90% 60%) 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        .loader-exit {
          animation: fade-out 0.5s ease forwards;
        }
      `}</style>

            {/* Background blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-grid-subtle opacity-20" />
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-blob" />
                <div className="absolute top-0 -right-32 h-80 w-80 rounded-full bg-purple-500/12 blur-3xl animate-blob [animation-delay:-3s]" />
                <div className="absolute bottom-[-160px] left-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl animate-blob [animation-delay:-6s]" />
            </div>

            {/* Center loader group */}
            <div className="relative z-10 flex flex-col items-center gap-10">

                {/* ── Spinning rings + core ── */}
                <div className="relative w-36 h-36 flex items-center justify-center">

                    {/* Outer dashed ring */}
                    <div
                        className="ring-outer absolute inset-0 rounded-full"
                        style={{
                            border: "2px dashed",
                            borderColor: "color-mix(in oklch, var(--primary) 35%, transparent)",
                        }}
                    />

                    {/* Outer solid arc */}
                    <div
                        className="ring-outer absolute inset-0 rounded-full border-2 border-transparent"
                        style={{
                            borderTopColor: "hsl(220 90% 60%)",
                            borderRightColor: "hsl(260 80% 70%)",
                            animationDuration: "2.2s",
                        }}
                    />

                    {/* Inner counter ring */}
                    <div
                        className="ring-inner absolute inset-5 rounded-full border-2 border-transparent"
                        style={{
                            borderBottomColor: "hsl(260 80% 70%)",
                            borderLeftColor: "hsl(220 90% 60%)",
                        }}
                    />

                    {/* Orbiting dots */}
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="orbit-dot absolute w-2.5 h-2.5 rounded-full"
                            style={
                                {
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-5px",
                                    marginLeft: "-5px",
                                    background: i % 2 === 0 ? "hsl(220 90% 65%)" : "hsl(260 80% 70%)",
                                    "--start": `${i * 90}deg`,
                                    "--dur": `${2.8 + i * 0.3}s`,
                                    "--delay": `${-i * 0.7}s`,
                                    boxShadow: "0 0 8px 2px currentColor",
                                } as React.CSSProperties
                            }
                        />
                    ))}

                    {/* Core */}
                    <div
                        className="core-dot relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, hsl(220 90% 55%), hsl(260 80% 65%))",
                            boxShadow: "0 0 24px hsl(220 90% 55% / 0.5), 0 0 48px hsl(260 80% 65% / 0.25)",
                        }}
                    >
                        <div className="w-5 h-5 rounded-full bg-background/90" />
                    </div>
                </div>

                {/* ── Progress bar ── */}
                <div className="flex flex-col items-center gap-3 w-64">
                    {/* Track */}
                    <div className="relative w-full h-1 rounded-full bg-border/50 overflow-hidden">
                        <div
                            className="progress-bar-fill h-full rounded-full transition-all duration-150"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Counter + label */}
                    <div className="flex items-baseline justify-between w-full">
                        <span
                            className="font-mono text-xs font-semibold"
                            style={{ color: "hsl(220 90% 65%)" }}
                        >
                            {String(progress).padStart(3, "0")}
                            <span className="cursor-blink">%</span>
                        </span>

                        <span className="text-xs text-muted-foreground tracking-widest uppercase">
                            Initializing
                        </span>
                    </div>
                </div>

                {/* ── Tagline ── */}
                <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase select-none">
                    Preparing the experience…
                </p>
            </div>
        </div>
    )
}
