"use client"

import type React from "react"
import { useMemo, useRef } from "react"

type TiltProps = {
  children: React.ReactNode
  className?: string
  maxDeg?: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function Tilt({ children, className, maxDeg = 10 }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      onPointerMove={(e) => {
        if (prefersReducedMotion) return
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        const rx = clamp((0.5 - y) * 2 * maxDeg, -maxDeg, maxDeg)
        const ry = clamp((x - 0.5) * 2 * maxDeg, -maxDeg, maxDeg)
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      }}
      onPointerLeave={() => {
        const el = ref.current
        if (!el) return
        el.style.transform = "rotateX(0deg) rotateY(0deg)"
      }}
    >
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </div>
  )
}

