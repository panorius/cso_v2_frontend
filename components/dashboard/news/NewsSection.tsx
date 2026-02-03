import React from "react";
import patternStandard from "@/assets/images/patterns/standard.png";
import { Title } from "@/components/ui/Title";

export default function NewsSection() {
    const NEWS_ITEMS = [
        {
            id: "n1",
            title: "Mise à jour 2.5 : Lancer de dés avancés",
            date: "Aujourd'hui",
            category: "UPDATE",
            image: "https://charactersheetonline.com/images/features/feature7.webp",
            description:
                "Découvrez notre nouveau moteur de simulation physique pour des lancers de dés plus réalistes.",
        },
        {
            id: "n2",
            title: "Nouvel Univers : Cyber-Noir",
            date: "Hier",
            category: "NEW CONTENT",
            image: "https://charactersheetonline-images.s3.ca-central-1.amazonaws.com/images/487e3a45b61008ea6a2af017.jpeg",
            description:
                "Plongez dans les néons d'une cité dystopique avec notre nouveau pack d'assets visuels.",
        },
        {
            id: "n3",
            title: "Concours : Meilleure Fiche de Perso",
            date: "Il y a 2 jours",
            category: "COMMUNITY",
            image: "https://charactersheetonline-images.s3.ca-central-1.amazonaws.com/images/625610e8755c0a16b09d5512.jpeg",
            description:
                'Gagnez un accès VIP au prochain module "Legends of the Void" en partageant vos créations.',
        },
    ];

    return (
        <section key="news-view" className="space-y-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <i className="icon-radio" />
                    <Title withDecorations level="h2" className="">
                        ACTUALITÉS & RÉCITS
                    </Title>
                </div>
                <span className="px-3 py-1 text-xs font-black tracking-widest uppercase border rounded text-orange border-orange/30">
                    Dernière MaJ : Mars 2024
                </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {NEWS_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className="cursor-pointer group relative border-white/80 border-8 overflow-hidden rounded-2xl bg-[#2d2b38] shadow-2xl flex flex-col hover:border-orange transition-all duration-300"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-orange text-white text-[10px] font-black px-2 py-1 rounded uppercase">
                                {item.category}
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                            <span className="text-slate-500 text-[10px] font-bold uppercase mb-2">
                                {item.date}
                            </span>
                            <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-orange">
                                {item.title}
                            </h3>
                            <p className="flex-1 mb-6 text-sm text-slate-400">
                                {item.description}
                            </p>
                            <button className="flex items-center gap-2 text-xs font-black tracking-widest uppercase transition-all text-orange group-hover:gap-4">
                                Lire la suite <i className="icon-arrow-right" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Banner Info */}
            <div
                className="flex items-center justify-between p-8 border-8 border-white/50 rounded-3xl"
                style={{
                    backgroundImage: patternStandard.src
                        ? `url(${patternStandard.src})`
                        : undefined,
                    backgroundSize: 200,
                }}
            >
                <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white uppercase">
                        Besoin d'aide avec la mise à jour ?
                    </h4>
                    <p className="text-sm text-slate-400">
                        Consultez notre guide de migration complet pour vos
                        anciennes campagnes.
                    </p>
                </div>
                <button className="px-6 py-2 cursor-pointer bg-orange hover:bg-orange/90 text-white text-[10px] font-black uppercase rounded-full border border-white/10 transition-all">
                    Guide de Migration
                </button>
            </div>
        </section>
    );
}
