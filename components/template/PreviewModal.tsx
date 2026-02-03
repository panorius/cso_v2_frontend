import React, { useState } from "react";
import { CharacterSheetTemplate, ModuleType } from "./types";

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: CharacterSheetTemplate;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onClose,
    template,
}) => {
    const [activeTab, setActiveTab] = useState(template.sections[0]?.id || "");

    if (!isOpen) return null;

    const activeSection =
        template.sections.find((s) => s.id === activeTab) ||
        template.sections[0];
    const theme = template.theme;

    const renderModuleInstance = (module: any) => {
        const label = module.config.label || module.label;

        switch (module.type as ModuleType) {
            case "stat_mod":
                return (
                    <div
                        key={module.id}
                        className="bg-[#382f44] rounded-2xl overflow-hidden border border-[#4a3b5c] shadow-lg flex flex-col items-center"
                    >
                        <div className="w-full bg-[#1a1423]/50 py-1.5 text-center text-[9px] font-black uppercase text-gray-400 tracking-widest">
                            {label}
                        </div>
                        <div className="relative w-full aspect-square flex items-center justify-center bg-[#2d2438]">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <i
                                    className="w-14 h-14 icon-text"
                                    style={{ color: theme.primaryColor }}
                                />
                            </div>
                            <span className="relative z-10 text-2xl font-black text-white">
                                +0
                            </span>
                        </div>
                        <div className="w-full bg-[#1a1423] py-2 text-center text-sm font-black text-gray-300">
                            10
                        </div>
                    </div>
                );
            case "points":
                return (
                    <div key={module.id} className="my-4 col-span-full">
                        <div
                            className="flex items-center justify-between px-4 py-2 text-white border rounded-lg shadow-lg border-white/10"
                            style={{ backgroundColor: theme.primaryColor }}
                        >
                            <button className="transition-transform hover:scale-125">
                                <i className="w-5 h-5 icon-chevron-left" />
                            </button>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                                    {label}
                                </span>
                                <span className="text-sm font-black">
                                    13 / {module.config.max || 13}
                                </span>
                            </div>
                            <button className="transition-transform hover:scale-125">
                                <i className="w-5 h-5 icon-chevron-right" />
                            </button>
                        </div>
                    </div>
                );
            case "checkbox":
                return (
                    <div
                        key={module.id}
                        className="flex flex-col items-center gap-2 p-2 bg-[#2d2438] rounded-xl border border-[#4a3b5c]/30"
                    >
                        <span className="text-[9px] font-black text-gray-500 uppercase">
                            {label}
                        </span>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-4 h-4 border-2 rounded-full"
                                    style={{
                                        backgroundColor:
                                            i === 1 ? "white" : "transparent",
                                        borderColor:
                                            i === 1 ? "white" : "#4b5563",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div
                        key={module.id}
                        className="col-span-full bg-[#1a1423]/40 p-4 rounded-2xl border border-[#4a3b5c]/40"
                    >
                        <label className="text-[9px] uppercase font-black text-gray-500 mb-2 block tracking-widest">
                            {label}
                        </label>
                        <div className="w-full bg-[#1a1423] border border-[#4a3b5c] rounded-xl p-3 text-xs text-gray-400 italic">
                            {module.config.placeholder ||
                                "Exemple de saisie..."}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div
                className="w-full max-w-sm h-[85vh] rounded-[3rem] overflow-hidden flex flex-col border-[10px] border-[#1a1423] shadow-2xl"
                style={{ backgroundColor: theme.backgroundColor }}
            >
                {/* Header dynamique */}
                <div
                    className="relative flex flex-col items-center p-6 pt-12"
                    style={{ backgroundColor: theme.headerColor }}
                >
                    <button
                        onClick={onClose}
                        className="absolute p-2 text-white rounded-full top-4 right-4 bg-black/10 hover:bg-black/20"
                    >
                        <i className="w-5 h-5 icon-x" />
                    </button>
                    <div
                        className="absolute flex flex-col items-center justify-center w-12 h-12 border-4 rounded-full shadow-xl top-4 left-4"
                        style={{
                            backgroundColor: theme.accentColor,
                            borderColor: "rgba(0,0,0,0.1)",
                        }}
                    >
                        <span className="text-[7px] font-black text-white/50 uppercase leading-none">
                            lev.
                        </span>
                        <span className="text-lg font-black leading-none text-white">
                            1
                        </span>
                    </div>
                    <div className="flex items-center justify-center w-24 h-24 mb-6 border-4 shadow-2xl bg-white/10 rounded-3xl backdrop-blur-md border-white/20">
                        <i className="w-12 h-12 text-white icon-dice-5" />
                    </div>
                    <div className="bg-white rounded-full px-6 py-2.5 shadow-xl border-2 border-black/5 mb-4">
                        <span
                            className="text-sm font-black tracking-widest uppercase"
                            style={{ color: theme.accentColor }}
                        >
                            {template.name}
                        </span>
                    </div>
                    <div
                        className="absolute right-0 flex flex-col gap-2 p-2 -translate-y-1/2 top-1/2 rounded-l-xl"
                        style={{ backgroundColor: theme.accentColor }}
                    >
                        <i className="w-4 h-4 text-white opacity-50 icon-layout" />
                        <i className="w-4 h-4 text-white opacity-50 icon-info" />
                    </div>
                </div>

                {/* Tabs dynamiques */}
                <div
                    className="flex"
                    style={{ backgroundColor: theme.accentColor }}
                >
                    {template.sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className="flex flex-col items-center flex-1 gap-1 py-4 transition-all"
                            style={{
                                backgroundColor:
                                    activeTab === section.id
                                        ? theme.backgroundColor
                                        : "transparent",
                                color:
                                    activeTab === section.id
                                        ? theme.accentColor
                                        : "rgba(255,255,255,0.6)",
                            }}
                        >
                            <i className="w-5 h-5 icon-file-text" />
                            {activeTab === section.id && (
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                        backgroundColor: theme.accentColor,
                                    }}
                                ></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="mb-8 text-center">
                        <div className="text-xs font-black tracking-widest uppercase text-white/90">
                            {template.gameSystem}
                        </div>
                        <div className="text-[9px] text-white/30 font-bold uppercase tracking-tighter mt-1">
                            Template Preview
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center p-2 border shadow-sm bg-white/5 rounded-xl border-white/5"
                            >
                                <i className="w-3 h-3 mb-1 text-white/20 icon-shield" />
                                <span className="text-xs font-bold text-white">
                                    --
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {activeSection?.modules.map(renderModuleInstance)}
                    </div>
                    {(!activeSection || activeSection.modules.length === 0) && (
                        <div className="text-center py-12 text-gray-700 uppercase font-black text-[10px] tracking-widest">
                            Section vide
                        </div>
                    )}
                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    );
};
