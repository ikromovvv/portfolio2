"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Job {
    company: string;
    url?: string;
    position: string;
    period: string;
    points: string[];
}

const jobs: Job[] = [
    {
        company: "Gennis",
        url: "https://gennis.uz/",
        position: "Frontend Developer",
        period: "Jan 2024 — Present",
        points: [
            "Built and maintain a multi-tenant education-management SaaS used by dozens of learning centers across Uzbekistan, automating ~70% of administrative work.",
            "Architected the student-facing classroom platform with React, Redux Toolkit and GSAP, delivering interactive lesson flows with smooth, performant animations.",
            "Drove the migration of the codebase to a Feature-Sliced Design (FSD) architecture, reducing duplicated logic and onboarding time for new contributors.",
            "Collaborated daily with backend engineers, designers and QA to ship features end-to-end on a weekly release cadence.",
        ],
    },
    {
        company: "Turon School",
        url: "https://tisedu.uz/",
        position: "Frontend Developer",
        period: "May 2023 — Dec 2023",
        points: [
            "Developed Turon Platform — an internal admin / student system that automated 60–70% of school operations including registration and online payments.",
            "Implemented the design system and reusable component library on top of React + Sass, keeping pages visually consistent and easy to extend.",
            "Optimized initial load and route-level code splitting, dropping time-to-interactive on key pages by ~40%.",
        ],
    },
    {
        company: "NTT",
        url: "https://xususiytalim.uz/",
        position: "Frontend Developer (Contract)",
        period: "Aug 2022 — Apr 2023",
        points: [
            "Delivered both the applicant and admin platforms for NTT (Nodavlat ta'lim tashkilotlari) — a portal university applicants use to discover and apply to private institutions.",
            "Owned the complete frontend stack: routing, state management, forms, validation and integration with REST APIs.",
            "Translated Figma designs into pixel-precise responsive UIs across desktop and mobile.",
        ],
    },
    {
        company: "Freelance",
        position: "Frontend Developer",
        period: "2021 — 2022",
        points: [
            "Built marketing sites and small dashboards for local businesses using HTML, CSS, JavaScript and React.",
            "Acted as the sole developer on most projects — gathering requirements, prototyping, building and deploying to Netlify / Vercel.",
        ],
    },
];

export function Experience() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);

    useGSAP(
        () => {
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "restart none none reset",
                },
                y: -22,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                clearProps: "transform,opacity",
            });
        },
        { scope: sectionRef }
    );

    useGSAP(
        () => {
            if (!panelRef.current) return;
            gsap.fromTo(
                panelRef.current,
                { opacity: 0, x: 12 },
                { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }
            );
        },
        { dependencies: [active] }
    );

    const job = jobs[active];

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="flex items-center justify-center px-4 sm:px-6 py-24"
        >
            <div className="container mx-auto max-w-3xl">
                <div ref={headerRef} className="flex items-center gap-4 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                        <span className="text-primary font-mono text-base sm:text-lg md:text-xl">02.</span>
                        Where I&apos;ve Worked
                    </h2>
                    <span className="h-px flex-1 bg-border/60" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    <div className="flex md:flex-col overflow-x-auto md:overflow-visible md:min-w-[180px]">
                        <div className="relative flex md:flex-col">
                            <span className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border/60" />
                            <span className="md:hidden absolute left-0 right-0 bottom-0 h-px bg-border/60" />
                            {jobs.map((j, i) => (
                                <button
                                    key={j.company}
                                    onClick={() => setActive(i)}
                                    className={`relative px-4 py-3 text-sm font-mono whitespace-nowrap transition-colors duration-200 text-left
                                        ${active === i
                                        ? "text-primary bg-primary/5"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}
                                    `}
                                >
                                    <span
                                        className={`hidden md:block absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300
                                            ${active === i ? "bg-primary" : "bg-transparent"}
                                        `}
                                    />
                                    <span
                                        className={`md:hidden absolute left-0 right-0 bottom-0 h-[2px] transition-all duration-300
                                            ${active === i ? "bg-primary" : "bg-transparent"}
                                        `}
                                    />
                                    {j.company}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div ref={panelRef} className="flex-1 min-h-[260px]">
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                            <span>{job.position}</span>{" "}
                            {job.url ? (
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline underline-offset-4"
                                >
                                    @ {job.company}
                                </a>
                            ) : (
                                <span className="text-primary">@ {job.company}</span>
                            )}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm font-mono text-muted-foreground">
                            {job.period}
                        </p>

                        <ul className="mt-5 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {job.points.map((p, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-primary mt-[6px] shrink-0">▹</span>
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
