"use client"

import type React from "react"

import {useRef, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { sendMessageToTelegram } from "@/app/actions/send-message"
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
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
    )
}
export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
    const [usernameError, setUsernameError] = useState<string | null>(null)

    const containerRef = useRef(null)

    const titleRef = useRef(null)
    const subTitleRef = useRef(null)
    const emailRef = useRef(null)
    const telegramRef = useRef(null)
    const locationRef = useRef(null)


    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
        gsap.from(subTitleRef.current, {
            scrollTrigger: {
                trigger: subTitleRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
        gsap.from(emailRef.current, {
            scrollTrigger: {
                trigger: emailRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
        gsap.from(telegramRef.current, {
            scrollTrigger: {
                trigger: telegramRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
        gsap.from(locationRef.current, {
            scrollTrigger: {
                trigger: locationRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })

    } , {scope: containerRef})

    const formatPhoneNumber = (value: string) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "")

        // Extract digits after country code
        let phoneDigits = ""
        if (digits.startsWith("998")) {
            phoneDigits = digits.slice(3) // Remove 998
        } else {
            phoneDigits = digits
        }

        // Limit to 9 digits
        phoneDigits = phoneDigits.slice(0, 9)

        let formatted = "+998"
        if (phoneDigits.length > 0) {
            formatted += " " + phoneDigits.slice(0, 2) // First 2 digits
        }
        if (phoneDigits.length > 2) {
            formatted += " " + phoneDigits.slice(2, 5) // Next 3 digits
        }
        if (phoneDigits.length > 5) {
            formatted += " " + phoneDigits.slice(5, 7) // Next 2 digits
        }
        if (phoneDigits.length > 7) {
            formatted += " " + phoneDigits.slice(7, 9) // Last 2 digits
        }

        return formatted
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        // const formatted = formatPhoneNumber(e.target.value)
        if (value.length > 0 && !value.startsWith("+")) {
            value = "+" + value
        }

        setFormData({ ...formData, phone: value })

    }

    const validateUsername = (username: string): string | null => {
        // Remove @ symbol for validation
        const cleanUsername = username.replace("@", "")

        if (cleanUsername.length === 0) {
            return null // Empty is okay, will be caught by required field
        }

        // Check length (5-32 characters)
        if (cleanUsername.length < 5) {
            return "Username kamida 5 ta belgidan iborat bo'lishi kerak"
        }
        if (cleanUsername.length > 32) {
            return "Username 32 ta belgidan oshmasligi kerak"
        }

        // Check for valid characters (only letters, numbers, underscores)
        const validCharsRegex = /^[a-zA-Z0-9_]+$/
        if (!validCharsRegex.test(cleanUsername)) {
            return "Username faqat harflar, raqamlar va _ belgisidan iborat bo'lishi mumkin"
        }

        // Check if starts or ends with underscore
        if (cleanUsername.startsWith("_") || cleanUsername.endsWith("_")) {
            return "Username _ belgisi bilan boshlanishi yoki tugashi mumkin emas"
        }

        // Check for consecutive underscores
        if (cleanUsername.includes("__")) {
            return "Username ketma-ket __ belgilarini o'z ichiga olmaydi"
        }

        return null // Valid username
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()

        value = value.replace(/[^a-zA-Z0-9_@]/g, "")

        if (value.length > 0 && !value.startsWith("@")) {
            value = "@" + value
        }

        setFormData({ ...formData, username: value })

        const error = validateUsername(value)
        setUsernameError(error)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const usernameValidationError = validateUsername(formData.username)
        if (usernameValidationError) {
            setUsernameError(usernameValidationError)
            return
        }

        setIsLoading(true)
        setStatus(null)

        const formDataObj = new FormData()
        formDataObj.append("name", formData.name)
        formDataObj.append("email", formData.email)
        formDataObj.append("phone", formData.phone)
        formDataObj.append("username", formData.username)
        formDataObj.append("message", formData.message)

        const result = await sendMessageToTelegram(formDataObj)

        setIsLoading(false)

        if (result.success) {
            setStatus({ type: "success", message: result.message || "Message sent successfully!" })
            setFormData({ name: "", email: "", phone: "", username: "", message: "" })
        } else {
            setStatus({ type: "error", message: result.error || "Failed to send message" })
        }
    }

    return (
        <section id="contact" className="flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
            <div ref={containerRef} className="container mx-auto max-w-4xl">
                <div className="space-y-12">
                    <div className="space-y-4 text-center">
                        <p ref={titleRef} className="font-mono text-sm text-primary tracking-widest uppercase">
                            05. What&apos;s Next?
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                            Get In Touch
                        </h2>
                        <p ref={subTitleRef} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi,
                            I&apos;ll try my best to get back to you!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        <Card
                            ref={emailRef}
                            className={`cursor-pointer hover:bg-accent/50 hover:scale-105 transition-all `}

                        >
                            <a href="mailto:isardor859@gmail.com">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-base sm:text-lg">Email</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm break-all">isardor859@gmail.com</CardDescription>
                                </CardContent>
                            </a>
                        </Card>

                        <Card
                            ref={telegramRef}

                            className={`cursor-pointer hover:bg-accent/50 hover:scale-105 transition-all `}

                        >
                            <a href="https://t.me/ikromovvvl" target={"_blank"}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <TelegramIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-base sm:text-lg">Telegram username</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm font-mono">@ikromovvvl</CardDescription>
                                </CardContent>
                            </a>
                        </Card>

                        <Card
                            ref={locationRef}

                            className={`sm:col-span-2 md:col-span-1 hover:scale-105 transition-transform `}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-base sm:text-lg">Location</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm">Tashkent, Uzbekistan</CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className={``}>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">Send me a message</CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Fill out the form below and I'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="username" className="text-sm font-medium">
                                            Telegram Username
                                        </label>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="@username"
                                            value={formData.username}
                                            onChange={handleUsernameChange}
                                            required
                                            disabled={isLoading}
                                            className={`font-mono ${usernameError ? "border-red-500" : ""}`}
                                        />
                                        {usernameError && (
                                            <p className="text-xs text-red-500">{usernameError}</p>
                                        ) }
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+998 90 123 45 67"
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            required
                                            disabled={isLoading}
                                            className="font-mono"
                                            maxLength={15}
                                        />
                                        {/*<p className="text-xs text-muted-foreground">Format: +998 XX XXX XX XX</p>*/}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Your message..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                {status && (
                                    <div
                                        className={`p-3 rounded-lg text-sm ${
                                            status.type === "success"
                                                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                                : "bg-red-500/10 text-red-500 border border-red-500/20"
                                        }`}
                                    >
                                        {status.message}
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full hover:scale-105 transition-transform"
                                    disabled={isLoading || !!usernameError}
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
