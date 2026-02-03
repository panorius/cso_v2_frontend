"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import city from "@/assets/images/parallax/city.svg";
import front from "@/assets/images/parallax/front.svg";
import lake from "@/assets/images/parallax/lake.svg";
import montains from "@/assets/images/parallax/montains.svg";
import sky from "@/assets/images/parallax/sky.svg";
import sun from "@/assets/images/parallax/sun.svg";
import trees from "@/assets/images/parallax/trees.svg";
import LoginPage from "@/components/homepage/login.jsx";

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
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const value = window.scrollY;
                    const maxScroll = window.innerHeight;
                    const scrollPercent = value / maxScroll;

                    // Assombrir progressivement
                    if (overlayRef.current) {
                        overlayRef.current.style.opacity = Math.min(
                            scrollPercent * 0.7,
                            0.7
                        );
                    }

                    // Sky - arrête après 20% du scroll
                    if (skyRef.current) {
                        const skyScroll = Math.min(scrollPercent, 0.2);
                        skyRef.current.style.transform = `translateY(${-skyScroll * maxScroll * 0.5}px)`;
                    }

                    // City - Défilement rapide
                    if (cityRef.current) {
                        cityRef.current.style.transform = `translateY(${value * 0.8}px)`;
                    }

                    // Lake - Légèrement moins rapide
                    if (lakeRef.current) {
                        lakeRef.current.style.transform = `translateY(${value * 0.7}px)`;
                    }

                    // Mountains - Défilement moyen
                    if (montainsRef.current) {
                        montainsRef.current.style.transform = `translateY(${value * 0.5}px)`;
                    }

                    // Trees - Défilement plus lent
                    if (treesRef.current) {
                        treesRef.current.style.transform = `translateY(${value * 0.3}px)`;
                    }

                    // Front - Défilement très lent
                    if (frontRef.current) {
                        frontRef.current.style.transform = `translateY(${value * 0.15}px)`;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Animation GSAP pour le soleil (parabole)
        if (sunRef.current) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            }).fromTo(
                sunRef.current,
                {
                    left: "50%",
                    top: "5%",
                    x: "-50%",
                },
                {
                    left: "5%",
                    top: "65%",
                    x: "0%",
                    ease: "power1.inOut",
                }
            );
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={parallaxRef}
            className="relative w-full max-w-[1920px] h-[800px] overflow-hidden bg-[unset]"
        >
            {/* Sky - Dégradé bleu vers violet */}
            <div
                ref={skyRef}
                className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#a172b1] to-[#5d417f]"
            ></div>

            {/* Overlay d'assombrissement progressif */}
            <div
                ref={overlayRef}
                className="absolute inset-0 w-full h-full bg-black pointer-events-none z-5"
                style={{ opacity: 0 }}
            />

            {/* Sun - Petit soleil qui se déplace en parabole */}
            <div
                ref={sunRef}
                className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
                style={{ left: "10%", top: "60%" }}
            >
                <Image src={sun} alt="Sun" fill className="object-contain" />
            </div>

            {/* City */}
            <Image
                ref={cityRef}
                src={city}
                alt="City"
                fill
                className="object-cover absolute w-[1920px] h-full right-[calc(100vh - 1920px)] left-[calc(100vh - 1920px)]"
            />

            {/* Lake */}
            <Image
                ref={lakeRef}
                src={lake}
                alt="Lake"
                fill
                className="object-cover absolute w-[1920px] h-full right-[calc(100vh - 1920px)] left-[calc(100vh - 1920px)]"
            />

            {/* Mountains */}
            <Image
                ref={montainsRef}
                src={montains}
                alt="Mountains"
                fill
                className="object-cover absolute w-[1920px] h-full right-[calc(100vh - 1920px)] left-[calc(100vh - 1920px)]"
            />

            {/* Trees */}
            <Image
                ref={treesRef}
                src={trees}
                alt="Trees"
                fill
                className="object-cover absolute w-[1920px] h-full right-[calc(100vh - 1920px)] left-[calc(100vh - 1920px)]"
            />

            {/* Front - Premier plan */}
            <Image
                ref={frontRef}
                src={front}
                alt="Front"
                fill
                className="object-cover absolute z-10 w-[1920px] h-full right-[calc(100vh - 1920px)] left-[calc(100vh - 1920px)]"
            />
        </div>
    );
}
