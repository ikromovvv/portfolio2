"use client";

import {Github, Mail, Instagram} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function TelegramIcon({className}: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21.198 3.698l-9.5 9.5-4.5-4.5"/>
            <path d="M21.198 3.698l-6.5 17.5-4.5-8-8-4.5z"/>
        </svg>
    );
}

export function Hero() {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);
    const headTitleRef = useRef<HTMLHeadingElement | null>(null);
    const smallDesc = useRef<HTMLHeadingElement | null>(null);
    const ctaRowRef = useRef<HTMLDivElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: {duration: 0.9, ease: "power3.out"},
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    toggleActions: "restart none none reset",
                },
            });

            tl.fromTo(
                bgRef.current,
                {opacity: 0},
                {opacity: 1, duration: 0.6, ease: "power2.out"},
                0
            );
            tl.from(headTitleRef.current, {y: -22, opacity: 0}, 0.05);
            tl.from(titleRef.current, {x: -26, opacity: 0}, 0.12);
            tl.from(smallDesc.current, {x: 26, opacity: 0}, 0.18);
            tl.from(descRef.current, {y: 18, opacity: 0}, 0.25);
            tl.from(ctaRowRef.current, {y: 14, opacity: 0}, 0.32);
        },
        {scope: container}
    );

    return (
        <section
            ref={container}
            id="home"
            className="relative flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 min-h-[100svh] overflow-hidden"
        >
            <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-grid-subtle opacity-30"/>
                <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl animate-blob"/>
                <div className="absolute top-8 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-blob [animation-delay:-2.5s]"/>
                <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl animate-blob [animation-delay:-5s]"/>
                <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background"/>
            </div>

            <div className="container mx-auto max-w-4xl">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p
                            ref={headTitleRef}
                            className="inline-flex items-center gap-2 text-primary text-sm sm:text-base font-mono"
                        >
                            <span className="h-2 w-2 rounded-full bg-primary/80 animate-floaty"/>
                            Hi, my name is
                        </p>
                        <h1
                            ref={titleRef}
                            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground"
                        >
                            Sardor Ikromov.
                        </h1>
                        <h2
                            ref={smallDesc}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-muted-foreground/80 leading-tight"
                        >
                            I build things for the web.
                        </h2>
                    </div>
                    <p
                        ref={descRef}
                        className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
                    >
                        I&apos;m a Frontend Developer with{" "}
                        <span className="text-foreground">3+ years</span> of experience
                        building high-performance, scalable, and responsive web applications.
                        Currently, I&apos;m focused on building accessible, human-centered
                        products at{" "}
                        <a
                            href="https://gennis.uz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            Gennis
                        </a>.
                    </p>
                    <div
                        ref={ctaRowRef}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6"
                    >
                        <a href="#projects" className="btn-senior">
                            Check out my work!
                        </a>
                        <div className="flex items-center gap-3 lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <a
                                    href="https://github.com/ikromovvv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-5 w-5"/>
                                </a>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <a
                                    href="https://www.instagram.com/ikromovvvl8/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram className="h-5 w-5"/>
                                </a>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <a
                                    href="https://t.me/ikromovvvl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <TelegramIcon className="h-5 w-5"/>
                                </a>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <a href="mailto:isardor859@gmail.com">
                                    <Mail className="h-5 w-5"/>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );


}
