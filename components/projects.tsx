"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Folder } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Collapse, Modal, Image } from "antd";
import img from "./img.png";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    description: string;
    image: string[];
    tags: string[];
    github: string;
    demo: string;
}

const featuredProjects: Project[] = [
    {
        title: "Gennis — Education-Center SaaS",
        description:
            "A multi-tenant platform that automates ~70% of an education center's work: student registration, grouping, online payments, teacher & staff management, salary handling and more. Used in production by dozens of centers.",
        image: [
            "https://www.ulug.me/static/media/gennis1.1c18c285403853eed27e.png",
            "https://www.ulug.me/static/media/gennis1.1c18c285403853eed27e.png",
            "https://www.ulug.me/static/media/gennis3.0ff9851c69a551451a59.png",
        ],
        tags: ["React", "Redux", "Framer Motion", "Sass"],
        github: "https://github.com/ikromovvv",
        demo: "https://gennis.uz/",
    },
    {
        title: "Gennis Classroom",
        description:
            "Online learning platform offering interactive lessons and exercises across subjects (English, etc.). Built to support remote learners with structured courses, practice activities, and a rich content editor powered by Lexical.",
        image: [
            "https://www.ulug.me/static/media/classroom1.ad59dbb645e45672c85f.png",
            "https://www.ulug.me/static/media/classroom2.91543edbc3775f6f485e.png",
            "https://www.ulug.me/static/media/classroom3.e62633ce5b01adc26b29.png",
        ],
        tags: ["React", "Redux", "GSAP", "LEXICAL", "Sass"],
        github: "https://github.com/ikromovvv",
        demo: "https://classroom.gennis.uz/login",
    },
    {
        title: "Turon Platform",
        description:
            "An internal admin / student system for Turon School automating 60–70% of operations: registration, online payments, role-based access and other custom flows. Built with a feature-sliced architecture.",
        image: [`${img.src}`],
        tags: ["React", "Redux", "FSD", "GSAP", "Sass"],
        github: "https://github.com/ikromovvv",
        demo: "https://tisedu.uz/",
    },
    {
        title: "NTT — Private Education Portal",
        description:
            "A platform for university applicants in Uzbekistan that lets them browse private institutions and apply directly. Ships with both Student and Admin platforms sharing a typed UI library.",
        image: ["https://www.ulug.me/static/media/ntt.07ec8407f3995035768a.png"],
        tags: ["React", "Redux", "FSD", "Sass"],
        github: "https://github.com/ikromovvv",
        demo: "https://xususiytalim.uz/",
    },
];

export function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const subTitleRef = useRef<HTMLParagraphElement | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState<Project>({
        demo: "",
        description: "",
        github: "",
        image: [],
        tags: [],
        title: "",
    });

    useGSAP(
        () => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "restart none none reset",
                },
                y: -22,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                clearProps: "transform,opacity",
            });
            gsap.from(subTitleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 78%",
                    toggleActions: "restart none none reset",
                },
                y: 16,
                opacity: 0,
                duration: 0.6,
                delay: 0.1,
                ease: "power3.out",
                clearProps: "transform,opacity",
            });

            const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
            ScrollTrigger.batch(cards, {
                start: "top 88%",
                onEnter: (batch) => {
                    gsap.from(batch, {
                        autoAlpha: 0,
                        y: 60,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.12,
                        clearProps: "transform,opacity,visibility",
                    });
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="projects"
            className="flex items-center justify-center px-4 sm:px-6 py-24"
            ref={containerRef}
        >
            <div className="container mx-auto max-w-6xl">
                <div className="space-y-16">
                    <div>
                        <div ref={titleRef} className="flex items-center gap-4">
                            <h2 className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                                <span className="text-primary font-mono text-base sm:text-lg md:text-xl">
                                    04.
                                </span>
                                Some Things I&apos;ve Built
                            </h2>
                            <span className="h-px flex-1 bg-border/60" />
                        </div>
                        <p
                            ref={subTitleRef}
                            className="mt-4 text-base sm:text-lg text-muted-foreground"
                        >
                            A selection of projects I&apos;ve shipped recently
                        </p>
                    </div>

                    <div className="space-y-24 sm:space-y-32">
                        {featuredProjects.map((project, index) => {
                            const isReversed = index % 2 === 1;
                            return (
                                <article
                                    key={project.title}
                                    className="feature-card relative grid grid-cols-1 md:grid-cols-12 items-center gap-y-6 md:gap-y-0"
                                >
                                    <div
                                        className={`md:col-span-7 md:row-start-1 ${
                                            isReversed
                                                ? "md:col-start-6"
                                                : "md:col-start-1"
                                        }`}
                                    >
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative block group rounded-md overflow-hidden border border-border/60"
                                        >
                                            <div className="absolute inset-0 z-10 bg-primary/30 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
                                            {project.image[0] ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={project.image[0]}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]"
                                                />
                                            ) : (
                                                <div className="aspect-[16/10] flex items-center justify-center bg-muted">
                                                    <Folder className="h-12 w-12 text-muted-foreground" />
                                                </div>
                                            )}
                                        </a>
                                    </div>

                                    <div
                                        className={`md:col-span-6 md:row-start-1 z-20 ${
                                            isReversed
                                                ? "md:col-start-1 md:text-left"
                                                : "md:col-start-7 md:text-right"
                                        }`}
                                    >
                                        <p className="font-mono text-xs sm:text-sm text-primary tracking-widest">
                                            Featured Project
                                        </p>
                                        <h3 className="mt-2 text-xl sm:text-2xl md:text-[28px] font-bold text-foreground">
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-colors"
                                            >
                                                {project.title}
                                            </a>
                                        </h3>

                                        <div
                                            className={`mt-5 p-5 sm:p-6 rounded-md bg-card/85 backdrop-blur-sm border border-border/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.45)] ${
                                                isReversed ? "" : "md:-ml-16"
                                            }`}
                                        >
                                            <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        <ul
                                            className={`mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground ${
                                                isReversed
                                                    ? "justify-start"
                                                    : "md:justify-end"
                                            }`}
                                        >
                                            {project.tags.map((tag) => (
                                                <li key={tag}>{tag}</li>
                                            ))}
                                        </ul>

                                        <div
                                            className={`mt-5 flex items-center gap-4 text-foreground ${
                                                isReversed ? "" : "md:justify-end"
                                            }`}
                                        >
                                            <button
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setItem(project);
                                                }}
                                                aria-label="More details"
                                                className="hover:text-primary transition-colors"
                                            >
                                                <Folder className="h-5 w-5" />
                                            </button>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="GitHub"
                                                className="hover:text-primary transition-colors"
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Live"
                                                className="hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Modal
                title={item.title}
                closable={{ "aria-label": "Custom Close Button" }}
                open={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
            >
                <div className="flex flex-col gap-2">
                    <h2>{item.description}</h2>

                    <Collapse
                        size="small"
                        items={[
                            {
                                key: "1",
                                label: "Frameworks & Languages",
                                children: (
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((t) => (
                                            <Badge key={t} variant="default">
                                                <span className="text-[14px] cursor-pointer">{t}</span>
                                            </Badge>
                                        ))}
                                    </div>
                                ),
                            },
                        ]}
                    />
                    {item.image.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {item.image.map((src) =>
                                src ? (
                                    <Image
                                        key={src}
                                        width={"49%"}
                                        className="rounded-md"
                                        src={src}
                                        alt="Project preview"
                                    />
                                ) : null
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </section>
    );
}
