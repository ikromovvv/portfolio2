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

export function Footer() {
    return (
        <footer className="border-t border-border/50 px-4 sm:px-6 py-10">
            <div className="container mx-auto max-w-4xl">
                <div className="flex md:hidden justify-center gap-5 mb-6">
                    {socials.map(({ href, icon: Icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>

                <div className="flex flex-col items-center text-center gap-1 text-xs sm:text-sm font-mono text-muted-foreground">
                    <a
                        href="https://github.com/ikromovvv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Designed &amp; Built by Sardor Ikromov
                    </a>
                    <p className="opacity-70">
                        Built with Next.js, TypeScript, Tailwind CSS &amp; GSAP
                    </p>
                    <p className="opacity-50 mt-1">© {new Date().getFullYear()} — All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
