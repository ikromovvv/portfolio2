"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const value = height > 0 ? (scrollTop / height) * 100 : 0;
            setProgress(value);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
        >
            <div
                className="h-full bg-primary transition-[width] duration-100 ease-out"
                style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 10px var(--primary)",
                }}
            />
        </div>
    );
}
