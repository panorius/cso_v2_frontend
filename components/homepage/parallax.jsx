"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import city from "@/assets/parallax/city.svg";
import front from "@/assets/parallax/front.svg";
import lake from "@/assets/parallax/lake.svg";
import montains from "@/assets/parallax/montains.svg";
import sky from "@/assets/parallax/sky.svg";
import sun from "@/assets/parallax/sun.svg";
import trees from "@/assets/parallax/trees.svg";
import LoginPage from "@/components/homepage/login.jsx";

import {Button, ButtonGroup} from "@heroui/button";
import {Textarea, Input} from "@heroui/input";
import { ClassicInput } from "@/components/ui/inputs";

gsap.registerPlugin(ScrollTrigger);

export default function Parallax() {
    const parallaxRef = useRef(null);
    const overlayRef = useRef(null);
    const skyRef = useRef(null);
    const sunRef = useRef(null);
    const cityRef = useRef(null);
    const lakeRef = useRef(null);
    const montainsRef = useRef(null);
    const treesRef = useRef(null);
    const frontRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const value = window.scrollY;
            const maxScroll = window.innerHeight;
            const opacity = Math.min((value / maxScroll) * 0.4, 0.7);

            // Assombrir progressivement
            if (overlayRef.current) {
                overlayRef.current.style.opacity = opacity;
            }

            if (skyRef.current) {
                skyRef.current.style.top = -value * 0.5 + "px";
            }
            // Le soleil est géré par GSAP, on ne touche pas au top ici
            if (cityRef.current) {
                cityRef.current.style.top = value * 1 + "px";
            }
            if (lakeRef.current) {
                lakeRef.current.style.top = value * 0.9 + "px";
            }
            if (montainsRef.current) {
                montainsRef.current.style.top = value * 0.6 + "px";
            }
            if (treesRef.current) {
                treesRef.current.style.top = value * 0.4 + "px";
            }
            if (frontRef.current) {
                frontRef.current.style.top = value * 0.2 + "px";
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Animation GSAP pour le soleil (parabole de gauche à droite)
        if (sunRef.current) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
                .fromTo(
                    sunRef.current,
                    {
                        left: "50%",
                        top: "0%",
                    },
                    {
                        left: "0%",
                        top: "60%",
                        ease: "power1.out",
                    },
                    0
                )
                .to(sunRef.current, {
                    left: "0%",
                    top: "60%",
                    ease: "power1.inOut",
                });
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={parallaxRef}
            className="relative w-full h-screen overflow-hidden bg-[#72518f]"
        >
            {/* Sky - Fond qui remonte (inverse) */}
            <div
                ref={skyRef}
                className="absolute inset-0 w-full h-full rotate-180"
            >
                <Image
                    src={sky}
                    alt="Sky"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Overlay d'assombrissement progressif */}
            <div
                ref={overlayRef}
                className="absolute inset-0 w-full h-screen bg-black pointer-events-none z-5"
                style={{ opacity: 0 }}
            />

            {/* Sun - Petit soleil qui se déplace en parabole */}
            <div
                ref={sunRef}
                className="absolute w-32 h-32"
                style={{ left: "10%", top: "60%" }}
            >
                <Image src={sun} alt="Sun" fill className="object-contain" />
            </div>

            {/* City */}
            <div ref={cityRef} className="absolute inset-0 w-full h-full">
                <Image src={city} alt="City" fill className="object-cover" />
            </div>

            {/* Lake */}
            <div ref={lakeRef} className="absolute inset-0 w-full h-full">
                <Image src={lake} alt="Lake" fill className="object-cover" />
            </div>

            {/* Mountains */}
            <div ref={montainsRef} className="absolute inset-0 w-full h-full">
                <Image
                    src={montains}
                    alt="Mountains"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Trees */}
            <div ref={treesRef} className="absolute inset-0 w-full h-full">
                <Image src={trees} alt="Trees" fill className="object-cover" />
            </div>

            {/* Front - Premier plan */}
            <div ref={frontRef} className="absolute inset-0 z-10 w-full h-full">
                <Image src={front} alt="Front" fill className="object-cover" />
            </div>

            {/* Contenu par-dessus le parallax */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white">
                    <Image
                        className="m-auto"
                        src="/images/logos/cso.svg"
                        alt="CSO Logo"
                        width={274}
                        height={110}
                        priority
                    />
                    <div className="p-14">
                        <h1 className="mb-4 text-4xl font-bold uppercase text-orange-cso">
                            New Generation of Role Playing Game
                        </h1>
                    </div>
                    {/* Login Block */}
                    <LoginPage />
                    <div className="flex flex-wrap items-center gap-4">
                        <Button color="default">Default</Button>
                        <Button isDisabled  color="primary">Primary</Button>
                        <Button color="secondary">Secondary</Button>
                        <Button color="success">Success</Button>
                        <Button color="warning">Warning</Button>
                        <Button color="danger">Danger</Button>
                    </div>
                    {/* <Textarea
                        classNames={{
                            base: "max-w-xs",
                            input: "resize-y min-h-[40px]",
                        }}
                        label="Description"
                        placeholder="Enter your description"
                        variant="bordered"
                    /> */}
                    <Input
        isClearable
        variant="faded"
        label="Search"
        placeholder="Type to search..."
        radius="lg"
      />
      <ClassicInput variant="faded" label="Search" placeholder="Type to search..." />
                </div>
            </div>
        </div>
    );
}
