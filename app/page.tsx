"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Parallax from "@/components/homepage/parallax";

export default function Home() {
    const [health, setHealth] = useState<string>("…");
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/users")
            .then((r) => r.json())
            .then((data) => {
                setHealth("ok");
                console.log(data);
            })
            .catch((e) => setHealth(e.message));
    }, []);
    return (
        <main className="min-h-screen bg-purple-cso-bg">
            {/* Parallax Hero Section */}
            <Parallax />

            {/* Contenu après le parallax */}
            {/* <section className="flex flex-col items-center p-24">
                <Image
                    src="/images/logos/cso.svg"
                    alt="CSO Logo"
                    width={274}
                    height={110}
                    priority
                />
                <div className="p-14">
                    <h1 className="mb-4 text-4xl font-bold text-orange-cso uppercase">
                        New Generation of Role Playing Game
                    </h1>
                </div>
                <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
                    API Health: {health}
                </div>
            </section> */}
            <section className="h-[1500px]"></section>
        </main>
    );
}
