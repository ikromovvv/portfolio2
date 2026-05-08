"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_ITEMS: { id: string; label: string }[] = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" },
]

export function Navigation() {
    const [activeSection, setActiveSection] = useState("home")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24)

            const sections = ["home", ...NAV_ITEMS.map((n) => n.id)]
            const scrollPosition = window.scrollY + 120
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setMobileMenuOpen(false)
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.18)]"
                    : "bg-background/40 backdrop-blur-sm border-b border-transparent"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => scrollToSection("home")}
                        className="group flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
                        aria-label="Home"
                    >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/70 font-mono text-sm group-hover:border-primary/60 group-hover:text-primary transition-colors">
                            S
                        </span>
                    </button>

                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`group flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                                    activeSection === item.id
                                        ? "text-primary"
                                        : "text-foreground/80 hover:text-primary"
                                }`}
                            >
                                <span className="font-mono text-xs text-primary/80">
                                    0{idx + 1}.
                                </span>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                        <a
                            href="https://github.com/ikromovvv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center justify-center rounded-md border border-primary/60 px-3 py-1.5 text-sm font-mono text-primary hover:bg-primary/10 transition-colors"
                        >
                            Resume
                        </a>
                        <div className="ml-2">
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-border/40 pt-3">
                        {NAV_ITEMS.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                                    activeSection === item.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground/80 hover:bg-accent/50"
                                }`}
                            >
                                <span className="font-mono text-xs text-primary/80">
                                    0{idx + 1}.
                                </span>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                        <a
                            href="https://github.com/ikromovvv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-2 text-center rounded-md border border-primary/60 px-3 py-2 text-sm font-mono text-primary hover:bg-primary/10 transition-colors"
                        >
                            Resume
                        </a>
                    </div>
                )}
            </div>
        </nav>
    )
}
