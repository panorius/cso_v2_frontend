"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import standardWallpaper from "@/assets/images/wallpapers/standard.png";

export interface LoaderProps {
    message?: string;
}

export const RunningCharacterLoader: React.FC<LoaderProps> = ({
    message = "Chargement...",
}) => {
    const [dots, setDots] = useState(".");

    // Bloquer le scroll de la page
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Animation des points
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Fond avec image wallpaper */}
            <div className="absolute inset-0">
                <Image
                    src={standardWallpaper}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            </div>

            {/* Contenu par-dessus */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Personnage qui court */}
                {/* <div className="relative w-48 h-48">
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            x: [-100, 100],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <div className="relative w-16 h-16 mx-auto">
                            <motion.div
                                className="absolute top-0 w-8 h-8 transform -translate-x-1/2 rounded-full bg-gradient-to-br from-orange to-orange-600 left-1/2"
                                animate={{
                                    y: [0, -4, 0],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.div
                                className="absolute w-6 h-10 transform -translate-x-1/2 rounded-lg top-7 bg-gradient-to-br from-orange-500 to-orange-700 left-1/2"
                                animate={{
                                    y: [0, -3, 0],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.div
                                className="absolute w-2 h-8 rounded-full bg-gradient-to-b from-orange-600 to-orange-800 top-16 left-3"
                                animate={{
                                    rotate: [0, -30, 0, 30, 0],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{ transformOrigin: "top center" }}
                            />

                            <motion.div
                                className="absolute w-2 h-8 rounded-full bg-gradient-to-b from-orange-600 to-orange-800 top-16 left-9"
                                animate={{
                                    rotate: [0, 30, 0, -30, 0],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{ transformOrigin: "top center" }}
                            />
                        </div>
                    </motion.div>

                    <div className="absolute bottom-0 w-full h-1 rounded-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                </div> */}

                {/* Message */}
                <div className="text-center">
                    <p className="text-xl font-semibold text-white">
                        {message}
                        <span className="inline-block w-8 text-left">
                            {dots}
                        </span>
                    </p>
                </div>

                {/* Spinner de secours */}
                <motion.div
                    className="w-12 h-12 border-4 border-orange-500 rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
        </div>
    );
};
