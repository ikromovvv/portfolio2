"use client";

import { Github, Mail, Instagram } from "lucide-react";

function TelegramIcon({ className }: { className?: string }) {
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
            <path d="M21.198 3.698l-9.5 9.5-4.5-4.5" />
            <path d="M21.198 3.698l-6.5 17.5-4.5-8-8-4.5z" />
        </svg>
    );
}

const socials = [
    { href: "https://github.com/ikromovvv", icon: Github, label: "GitHub" },
    { href: "https://www.instagram.com/ikromovvvl8/", icon: Instagram, label: "Instagram" },
    { href: "https://t.me/ikromovvvl", icon: TelegramIcon, label: "Telegram" },
    { href: "mailto:isardor859@gmail.com", icon: Mail, label: "Email" },
];

export function SideRails() {
    return (
        <>
            <aside
                aria-hidden
                className="hidden lg:flex fixed left-10 bottom-0 z-40 flex-col items-center gap-5"
            >
                <ul className="flex flex-col items-center gap-5">
                    {socials.map(({ href, icon: Icon, label }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="block text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-1"
                            >
                                <Icon className="h-[18px] w-[18px]" />
                            </a>
                        </li>
                    ))}
                </ul>
                <span className="side-rail-line" />
            </aside>

            <aside
                aria-hidden
                className="hidden lg:flex fixed right-10 bottom-0 z-40 flex-col items-center gap-6"
            >
                <a
                    href="mailto:isardor859@gmail.com"
                    className="font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-1"
                    style={{ writingMode: "vertical-rl" }}
                >
                    isardor859@gmail.com
                </a>
                <span className="side-rail-line" />
            </aside>
        </>
    );
}
