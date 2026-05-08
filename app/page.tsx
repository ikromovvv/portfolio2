"use client"
import {Hero} from "@/components/hero"
import {About} from "@/components/about"
import {Experience} from "@/components/experience"
import {Skills} from "@/components/skills"
import {Projects} from "@/components/projects"
import {Contact} from "@/components/contact"
import {Navigation} from "@/components/navigation"
import {Footer} from "@/components/footer"
import {SideRails} from "@/components/side-rails"
import {ScrollProgress} from "@/components/scroll-progress"

import React, {useState} from "react";
import {Loader} from "@/components/ui/loader";
import {ConfigProvider} from "antd";


export default function Home() {

    const [loading, setLoading] = useState(true);

    return (
        <ConfigProvider
            theme={{
                token: {colorPrimary: "#262F69"},
                components: {
                    Button: {
                        borderRadius: 8,
                        // primaryShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                        // primaryShadow: "0px -2px 0px 0px rgba(10, 13, 18, 0.05)",
                        primaryShadow: "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset",
                        controlHeight: 36,
                        colorPrimary: "black",

                    },
                    Input: {
                        // primaryShadow: "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset",
                        boxShadow: "0px 0px 0px 1px rgba(10, 13, 18, 0.18)",
                        controlHeight: 44,
                    },
                },
            }}
        >
            <div>
                {loading ? (
                    <Loader duration={5} onComplete={() => setLoading(false)}/>
                ) : (
                    <div className="min-h-screen flex flex-col">
                        <Navigation/>
                        <main className="flex-1">
                            <Hero/>
                            <About/>
                            <Experience/>
                            <Skills/>
                            <Projects/>
                            <Contact/>
                        </main>
                        <Footer/>
                    </div>
                )}


            </div>
        </ConfigProvider>
    )
}
