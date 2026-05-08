"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const techStack = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Redux Toolkit",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
];

export function About() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                    toggleActions: "restart none none reset",
                },
                defaults: { duration: 0.7, ease: "power3.out" },
            });

            tl.from(headerRef.current, { y: -22, opacity: 0 }, 0);
            tl.from(textRef.current, { x: -28, opacity: 0 }, 0.1);
            tl.from(imageRef.current, { x: 28, opacity: 0 }, 0.2);

            const items = gsap.utils.toArray<HTMLElement>(".tech-item");
            gsap.from(items, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "restart none none reset",
                },
                opacity: 0,
                x: -10,
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.out",
                clearProps: "transform,opacity",
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="about"
            ref={sectionRef}
            className="flex items-center justify-center px-4 sm:px-6 py-24"
        >
            <div className="container mx-auto max-w-4xl">
                <div ref={headerRef} className="flex items-center gap-4 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                        <span className="text-primary font-mono text-base sm:text-lg md:text-xl">01.</span>
                        About Me
                    </h2>
                    <span className="h-px flex-1 bg-border/60" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
                    <div ref={textRef} className="md:col-span-3 space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            Hello! My name is Sardor and I enjoy creating things that live on
                            the internet. My interest in web development started back in
                            2021 when I decided to try building my first website — turns out
                            hacking together a custom layout taught me a lot about HTML &amp;
                            CSS!
                        </p>
                        <p>
                            Fast-forward to today, I&apos;ve had the privilege of building
                            production-grade platforms for{" "}
                            <span className="text-foreground">education centers</span>,{" "}
                            <span className="text-foreground">classrooms</span>, and{" "}
                            <span className="text-foreground">government-affiliated</span>{" "}
                            projects across Uzbekistan. My main focus these days is building
                            accessible, performant products that scale.
                        </p>
                        <p>Here are a few technologies I&apos;ve been working with recently:</p>

                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 font-mono text-sm">
                            {techStack.map((t) => (
                                <li key={t} className="tech-item flex items-start gap-2">
                                    <span className="text-primary mt-[2px]">▹</span>
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div ref={imageRef} className="md:col-span-2">
                        <div className="relative group max-w-[280px] mx-auto">
                            <div className="absolute inset-0 rounded-lg bg-primary/15 translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
                            <div className="relative rounded-lg overflow-hidden border border-border bg-card aspect-square flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/15" />
                                <div className="relative text-center px-4">
                                    <div className="text-6xl sm:text-7xl font-bold text-foreground/90 tracking-tight">
                                        SI
                                    </div>
                                    <div className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground">
                                        Sardor Ikromov
                                    </div>
                                </div>
                                <div className="absolute inset-0 ring-1 ring-inset ring-border/40 rounded-lg pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
