"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import html from "../public/HTML.svg";
import css from "../public/css.svg";
import javaScript from "../public/JavaScript.svg";
import typeScript from "../public/typescript.svg";
import react from "../public/React.svg";
import next from "../public/nextjs-icon 1.svg";
import tailwind from "../public/tailwind.svg";
import nodejs from "../public/nodejs.png";
import redux from "../public/redux 1.svg";
import gsapImg from "../public/gsap.svg";
import framerMotion from "../public/framer motion 1.svg";
import gitHub from "../public/GitHub.svg";
import netlify from "../public/netlify-logo-png-transparent 1.svg";
import figma from "../public/figma2.png";
import vercel from "../public/vercel-icon.svg";
import shadn from "../public/shadcn-ui-logo-png_seeklogo-519786.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Skill {
    name: string;
    icon: string;
    glow: string; // tailwind color for glow
}

interface SkillCategory {
    label: string;
    items: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        label: "Languages",
        items: [
            { name: "HTML",       icon: html.src,       glow: "rgba(249,115,22,0.35)" },
            { name: "CSS",        icon: css.src,        glow: "rgba(59,130,246,0.35)" },
            { name: "JavaScript", icon: javaScript.src, glow: "rgba(234,179,8,0.35)"  },
            { name: "TypeScript", icon: typeScript.src, glow: "rgba(96,165,250,0.35)" },
        ],
    },
    {
        label: "Frameworks & Libraries",
        items: [
            { name: "React",         icon: react.src,        glow: "rgba(34,211,238,0.35)" },
            { name: "Next.js",       icon: next.src,         glow: "rgba(161,161,170,0.25)" },
            { name: "Tailwind CSS",  icon: tailwind.src,     glow: "rgba(20,184,166,0.35)" },
            { name: "Node.js",       icon: nodejs.src,       glow: "rgba(34,197,94,0.35)"  },
            { name: "Redux",         icon: redux.src,        glow: "rgba(168,85,247,0.35)" },
            { name: "GSAP",          icon: gsapImg.src,      glow: "rgba(74,222,128,0.35)" },
            { name: "Framer Motion", icon: framerMotion.src, glow: "rgba(236,72,153,0.35)" },
            { name: "Shadcn UI",     icon: shadn.src,        glow: "rgba(161,161,170,0.25)" },
        ],
    },
    {
        label: "Tools",
        items: [
            { name: "GitHub",  icon: gitHub.src,  glow: "rgba(161,161,170,0.25)" },
            { name: "Netlify", icon: netlify.src, glow: "rgba(59,130,246,0.35)"  },
            { name: "Figma",   icon: figma.src,   glow: "rgba(168,85,247,0.35)"  },
            { name: "Vercel",  icon: vercel.src,  glow: "rgba(161,161,170,0.25)" },
        ],
    },
];

export function Skills() {
    const sectionRef  = useRef<HTMLElement | null>(null);
    const headerRef   = useRef<HTMLDivElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);

    useGSAP(() => {
        // Header
        gsap.from([headerRef.current, subtitleRef.current], {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "restart none none reset",
            },
            opacity: 0,
            y: -22,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
        });

        // Category titles
        const catTitles = gsap.utils.toArray<HTMLElement>(".cat-title");
        gsap.from(catTitles, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "restart none none reset",
            },
            opacity: 0,
            x: -18,
            stagger: 0.1,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform,opacity",
        });

        // Skill cards pop-in
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
        gsap.from(cards, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
                toggleActions: "restart none none reset",
            },
            opacity: 0,
            scale: 0.72,
            y: 28,
            stagger: { each: 0.045, from: "start" },
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "transform,opacity",
        });
    }, { scope: sectionRef });

    return (
        <>
            <style>{`
        /* Y-axis 3D spin for icons */
        @keyframes icon-spin-y {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        .skill-icon-spin {
          animation: icon-spin-y 4.5s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .skill-card:hover .skill-icon-spin {
          animation-duration: 0.55s;
        }

        /* Gradient border via pseudo-element */
        .skill-card {
          position: relative;
          background: transparent;
          border-radius: 16px;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1.5px;
          background: linear-gradient(
            135deg,
            color-mix(in oklch, var(--border) 80%, transparent),
            color-mix(in oklch, var(--border) 20%, transparent)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          transition: background 0.25s ease;
        }
        .skill-card:hover::before {
          background: linear-gradient(
            135deg,
            var(--card-glow),
            color-mix(in oklch, var(--border) 30%, transparent)
          );
        }
        .skill-card:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 12px 32px -8px var(--card-glow), 0 2px 8px -2px rgba(0,0,0,0.12);
        }
        .skill-card-inner {
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background: color-mix(in oklch, var(--card) 60%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 12px 14px;
        }
      `}</style>

            <section
                id="skills"
                ref={sectionRef}
                className="flex items-center justify-center px-4 sm:px-6 py-24"
            >
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div ref={headerRef} className="flex items-center gap-4 mb-12">
                        <h2 className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                            <span className="text-primary font-mono text-base sm:text-lg md:text-xl">03.</span>
                            My Skills
                        </h2>
                        <span className="h-px flex-1 bg-border/60" />
                    </div>
                    <p ref={subtitleRef} className="-mt-6 mb-16 text-base sm:text-lg text-muted-foreground">
                        Technologies and tools I work with
                    </p>

                    {/* Categories */}
                    <div className="flex flex-col gap-14">
                        {skillCategories.map((cat) => (
                            <div key={cat.label}>
                                {/* Category label */}
                                <p className="cat-title mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55">
                                    {cat.label}
                                </p>

                                {/* Grid */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {cat.items.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="skill-card"
                                            style={{ "--card-glow": skill.glow } as React.CSSProperties}
                                        >
                                            <div className="skill-card-inner">
                                                {/* Icon with 3D spin */}
                                                <div style={{ perspective: "240px" }}>
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        draggable={false}
                                                        className="skill-icon-spin w-9 h-9 object-contain drop-shadow-sm select-none"
                                                    />
                                                </div>

                                                {/* Name */}
                                                <span className="text-[11px] font-medium text-center text-muted-foreground leading-tight">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-14 h-px bg-border/40" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
