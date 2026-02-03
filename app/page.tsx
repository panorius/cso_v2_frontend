"use client";

import Image from "next/image";
import LoginPage from "@/components/homepage/login";
import { Title } from "@/components/ui/Title";
import Parallax from "@/components/homepage/parallax";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { RunningCharacterLoader } from "@/components/ui/RunningCharacterLoader";

export default function Home() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthContext();

    useEffect(() => {
        // Rediriger vers le dashboard si l'utilisateur est connecté
        if (!isLoading && isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, isLoading, router]);

    // Afficher un loader pendant la vérification ou la redirection
    if (isLoading || isAuthenticated) {
        return <RunningCharacterLoader message="Chargement..." />;
    }

    return (
        <>
            <section className="flex flex-col items-center justify-center gap-4">
                <Parallax />
                {/* Contenu par-dessus le parallax */}
                <div className="relative z-10 flex flex-col h-full gap-4 p-4 sm:gap-6 sm:p-6 md:gap-10 md:p-10 -mt-[790px]">
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                        <Image
                            className="w-[180px] h-auto m-auto sm:w-[220px] md:w-[274px]"
                            src="/images/logos/cso.svg"
                            alt="CSO Logo"
                            width={274}
                            height={110}
                            priority
                        />
                        <div className="px-4 sm:px-8 md:px-14">
                            <Title
                                level="h1"
                                withDecorations
                                className="mb-2 text-center sm:mb-3 md:mb-4"
                            >
                                New Generation of Role Playing Game
                            </Title>
                        </div>
                    </div>

                    {/* Login Block */}
                    <div className="flex justify-start flex-1">
                        <LoginPage />
                    </div>
                </div>
            </section>
            <section className="h-[1200px]"></section>
        </>
    );
}
