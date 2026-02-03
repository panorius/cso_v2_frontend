import React from "react";
import patternStandard from "@/assets/images/patterns/standard.png";
import { Title } from "@/components/ui/Title";

export default function WorkshopSection() {
    return (
        <section className="flex flex-col gap-10">
            <div className="flex items-center gap-3">
                <i className="icon-boxes" />
                <Title withDecorations level="h2" className="">
                    Workshop communautaire
                </Title>
            </div>
            <div
                className="flex flex-col items-center gap-4 py-20 space-y-8 text-center border-8 border-white/50 rounded-3xl"
                style={{
                    backgroundImage: patternStandard.src
                        ? `url(${patternStandard.src})`
                        : undefined,
                    backgroundSize: 200,
                }}
            >
                <i className="icon-boxes" />
                <h2 className="text-4xl italic font-black text-white uppercase">
                    WORKSHOP COMMUNAUTAIRE
                </h2>
                <p className="max-w-md text-slate-400">
                    Découvrez des milliers de modèles créés par la communauté
                    CSO.
                </p>
                <button className="cursor-pointer mt-8 px-10 py-4 bg-[#f59e0b] text-white font-black rounded-full shadow-xl hover:scale-105 transition-transform">
                    EXPLORER LE WORKSHOP
                </button>
            </div>
        </section>
    );
}
