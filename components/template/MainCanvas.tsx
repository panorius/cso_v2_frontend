import React, { useState, useRef } from "react";
import {
    CharacterSheetTemplate,
    ModuleType,
    ModuleCategory,
    SheetSection,
    ModuleDefinition,
} from "./types";
import { ModuleItem } from "./editor/ModuleItem";
import { MiniModulePlaceholder } from "./editor/MiniModulePlaceholder";
import { ModuleSelectorModal } from "./ModuleSelectorModal";
import { PreviewModal } from "./PreviewModal";
import { MODULE_PALETTE } from "./constants";

interface MainCanvasProps {
    sheet: CharacterSheetTemplate;
    setSheet: React.Dispatch<React.SetStateAction<CharacterSheetTemplate>>;
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ sheet, setSheet }) => {
    const [activeSectionId, setActiveSectionId] = useState(
        sheet.sections[0]?.id || ""
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [insertIndex, setInsertIndex] = useState<number | null>(null);
    const [showStylePanel, setShowStylePanel] = useState(false);

    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const activeSection =
        sheet.sections.find((s) => s.id === activeSectionId) ||
        sheet.sections[0];

    const updateTheme = (key: string, value: string) => {
        setSheet((prev) => ({
            ...prev,
            theme: { ...prev.theme, [key]: value },
        }));
    };

    const handleAddModule = (
        type: ModuleType,
        category: ModuleCategory,
        label: string
    ) => {
        if (insertIndex === null) return;
        const paletteItem = MODULE_PALETTE.find((m) => m.type === type);
        const initialConfig = paletteItem?.initialConfig || { label };
        const newModule: ModuleDefinition = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            category,
            label,
            config: JSON.parse(JSON.stringify(initialConfig)),
        };
        const updatedSections = sheet.sections.map((s) => {
            if (s.id === activeSectionId) {
                const newModules = [...s.modules];
                newModules.splice(insertIndex, 0, newModule);
                return { ...s, modules: newModules };
            }
            return s;
        });
        setSheet({ ...sheet, sections: updatedSections });
        setInsertIndex(null);
    };

    const handleUpdateSection = (
        id: string,
        updates: Partial<SheetSection>
    ) => {
        setSheet((prev) => ({
            ...prev,
            sections: prev.sections.map((s) =>
                s.id === id ? { ...s, ...updates } : s
            ),
        }));
    };

    const addSection = () => {
        const newSection: SheetSection = {
            id: Math.random().toString(36).substr(2, 9),
            title: "Section",
            icon: "file-text",
            modules: [],
        };
        setSheet((prev) => ({
            ...prev,
            sections: [...prev.sections, newSection],
        }));
        setActiveSectionId(newSection.id);
    };

    const deleteSection = (id: string) => {
        if (sheet.sections.length <= 1) return;
        const remaining = sheet.sections.filter((s) => s.id !== id);
        setSheet((prev) => ({ ...prev, sections: remaining }));
        if (activeSectionId === id) setActiveSectionId(remaining[0].id);
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        dragItem.current = index;
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        dragOverItem.current = index;
    };

    const handleDragEnd = () => {
        if (
            dragItem.current !== null &&
            dragOverItem.current !== null &&
            dragItem.current !== dragOverItem.current
        ) {
            const updatedSections = sheet.sections.map((s) => {
                if (s.id === activeSectionId) {
                    const newModules = [...s.modules];
                    const [movedItem] = newModules.splice(dragItem.current!, 1);
                    newModules.splice(dragOverItem.current!, 0, movedItem);
                    return { ...s, modules: newModules };
                }
                return s;
            });
            setSheet({ ...sheet, sections: updatedSections });
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };

    // Grouping logic for rendering
    const renderModules = () => {
        if (!activeSection) return null;

        const elements: React.ReactNode[] = [];
        let currentMiniGroup: { mod: ModuleDefinition; idx: number }[] = [];

        const flushMiniGroup = () => {
            if (currentMiniGroup.length === 0) return;

            const groupIdx = elements.length;
            const lastIdx = currentMiniGroup[currentMiniGroup.length - 1].idx;

            elements.push(
                <div
                    key={`mini-group-${groupIdx}`}
                    className="col-span-3 bg-[#1a1423]/40 border border-[#4a3b5c]/50 rounded-[2.5rem] p-6 mb-10"
                >
                    <div className="flex items-center gap-2 px-2 mb-4">
                        <i className="w-3 h-3 text-orange-500 icon-text" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                            Modules Rapides
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {currentMiniGroup.map(({ mod, idx }) => (
                            <ModuleItem
                                key={mod.id}
                                module={mod}
                                index={idx}
                                onDelete={(id) =>
                                    setSheet((prev) => ({
                                        ...prev,
                                        sections: prev.sections.map((s) => ({
                                            ...s,
                                            modules: s.modules.filter(
                                                (m) => m.id !== id
                                            ),
                                        })),
                                    }))
                                }
                                onUpdate={(id, updates) =>
                                    setSheet((prev) => ({
                                        ...prev,
                                        sections: prev.sections.map((s) => ({
                                            ...s,
                                            modules: s.modules.map((m) =>
                                                m.id === id
                                                    ? { ...m, ...updates }
                                                    : m
                                            ),
                                        })),
                                    }))
                                }
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                        {/* Add placeholders to fill the row or provide next spot */}
                        {Array.from({
                            length: 3 - (currentMiniGroup.length % 3) || 0,
                        }).map((_, i) => (
                            <MiniModulePlaceholder
                                key={`placeholder-${groupIdx}-${i}`}
                                onClick={() => {
                                    setInsertIndex(lastIdx + 1);
                                    setIsModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            );
            currentMiniGroup = [];
        };

        activeSection.modules.forEach((module, idx) => {
            if (module.category === ModuleCategory.MINI) {
                currentMiniGroup.push({ mod: module, idx });
            } else {
                flushMiniGroup();
                elements.push(
                    <div key={module.id} className="col-span-3 mb-10">
                        <ModuleItem
                            module={module}
                            index={idx}
                            onDelete={(id) =>
                                setSheet((prev) => ({
                                    ...prev,
                                    sections: prev.sections.map((s) => ({
                                        ...s,
                                        modules: s.modules.filter(
                                            (m) => m.id !== id
                                        ),
                                    })),
                                }))
                            }
                            onUpdate={(id, updates) =>
                                setSheet((prev) => ({
                                    ...prev,
                                    sections: prev.sections.map((s) => ({
                                        ...s,
                                        modules: s.modules.map((m) =>
                                            m.id === id
                                                ? { ...m, ...updates }
                                                : m
                                        ),
                                    })),
                                }))
                            }
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                        />
                        <div className="relative flex items-center justify-center h-10 mb-4 -mt-4 group">
                            <button
                                onClick={() => {
                                    setInsertIndex(idx + 1);
                                    setIsModalOpen(true);
                                }}
                                className="relative z-10 w-8 h-8 bg-[#32293d] border border-[#4a3b5c] rounded-xl flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                            >
                                <i className="w-4 h-4 icon-plus" />
                            </button>
                        </div>
                    </div>
                );
            }
        });

        flushMiniGroup();
        return elements;
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#1a1423] overflow-hidden">
            {/* Header Panel */}
            <div className="p-8 pb-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 shadow-lg bg-grey-dark rounded-2xl">
                            <i className="w-6 h-6 text-white icon-scroll" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-white uppercase tracking-[0.4em]">
                                Editeur de modèle de fiche
                            </h1>
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1">
                                Création
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowStylePanel(!showStylePanel)}
                            className={`cursor-pointer h-full p-3 rounded-2xl border transition-all ${showStylePanel ? "bg-orange text-white border-orange" : "bg-orange text-white border-[#4a3b5c] hover:bg-orange/80 hover:text-white"}`}
                        >
                            <i className="w-5 h-5 icon-palette" />
                        </button>
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="cursor-pointer h-full p-3 rounded-2xl border transition-all bg-orange text-white border-[#4a3b5c] hover:bg-orange/80 hover:text-white"
                        >
                            <i className="content-center w-5 h-5 icon-eye" />{" "}
                            Tester le Modèle
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-[#2a2235] border border-[#4a3b5c] rounded-[2rem] p-5">
                        <label className="text-[9px] uppercase font-black text-orange-500 mb-2 tracking-widest block">
                            Nom du Template
                        </label>
                        <input
                            type="text"
                            className="w-full text-lg font-bold text-white bg-transparent outline-none"
                            value={sheet.name}
                            onChange={(e) =>
                                setSheet({ ...sheet, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="bg-[#2a2235] border border-[#4a3b5c] rounded-[2rem] p-5">
                        <label className="text-[9px] uppercase font-black text-orange-500 mb-2 tracking-widest block">
                            Système de jeu
                        </label>
                        <input
                            type="text"
                            className="w-full text-lg font-bold text-white bg-transparent outline-none"
                            value={sheet.gameSystem}
                            onChange={(e) =>
                                setSheet({
                                    ...sheet,
                                    gameSystem: e.target.value,
                                })
                            }
                        />
                    </div>
                    {/* <div className="bg-[#2a2235] border border-[#4a3b5c] rounded-[2rem] p-5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase font-black text-orange-500 mb-1 tracking-widest">
                                Complexité
                            </label>
                            <span className="text-xl font-black text-white">
                                {activeSection?.modules.length || 0} Modules
                            </span>
                        </div>
                        <i className="w-6 h-6 text-gray-700 icon-grid" />
                    </div> */}
                </div>

                {showStylePanel && (
                    <div className="bg-[#2a2235] border border-[#4a3b5c] rounded-[2rem] p-6 mb-8 flex flex-wrap gap-8 items-center animate-in slide-in-from-top-4 fade-in duration-300">
                        {[
                            "headerColor",
                            "accentColor",
                            "backgroundColor",
                            "primaryColor",
                        ].map((key) => (
                            <div key={key} className="flex flex-col gap-2">
                                <label className="text-[9px] uppercase font-black text-gray-500 tracking-widest">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={(sheet.theme as any)[key]}
                                        onChange={(e) =>
                                            updateTheme(key, e.target.value)
                                        }
                                        className="w-8 h-8 bg-transparent border-none rounded-lg cursor-pointer"
                                    />
                                    <span className="font-mono text-xs text-gray-400 uppercase">
                                        {(sheet.theme as any)[key]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 bg-[#241b2f] mx-8 mb-8 rounded-[3rem] border border-[#4a3b5c] flex flex-col overflow-hidden shadow-2xl">
                <div className="flex items-center bg-[#1a1423]/40 border-b border-[#4a3b5c]">
                    <div className="p-6 border-r border-[#4a3b5c] text-orange-500">
                        <i className="w-6 h-6 icon-settings" />
                    </div>
                    <div className="flex flex-1 overflow-x-auto no-scrollbar">
                        {sheet.sections.map((section) => (
                            <div
                                key={section.id}
                                className={`relative group flex items-center ${activeSectionId === section.id ? "bg-[#241b2f]" : "hover:bg-[#1a1423]/20"}`}
                            >
                                <input
                                    type="text"
                                    className={`px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] border-r border-[#4a3b5c] outline-none min-w-[160px] text-center bg-transparent ${activeSectionId === section.id ? "text-orange-500" : "text-gray-600"}`}
                                    value={section.title}
                                    onClick={() =>
                                        setActiveSectionId(section.id)
                                    }
                                    onChange={(e) =>
                                        handleUpdateSection(section.id, {
                                            title: e.target.value,
                                        })
                                    }
                                />
                                {activeSectionId === section.id && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSection(section.id);
                                        }}
                                        className="absolute p-1 text-gray-700 transition-opacity opacity-0 right-2 top-2 hover:text-red-500 group-hover:opacity-100"
                                    >
                                        <i className="w-3 h-3 icon-trash-2" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addSection}
                        className="p-6 text-gray-600 transition-all hover:text-orange-500"
                    >
                        <i className="w-6 h-6 icon-plus" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-gradient-to-b from-[#1a1423]/20 to-transparent">
                    <div className="max-w-4xl mx-auto">
                        {/* Initial Add button if empty */}
                        {activeSection?.modules.length === 0 && (
                            <button
                                onClick={() => {
                                    setInsertIndex(0);
                                    setIsModalOpen(true);
                                }}
                                className="w-full py-12 mb-8 border-2 border-dashed border-[#4a3b5c] rounded-[2.5rem] flex flex-col items-center justify-center text-gray-600 hover:border-orange-500/50 hover:text-orange-500 transition-all group"
                            >
                                <i className="w-8 h-8 mb-2 transition-transform group-hover:scale-110 icon-plus" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                                    Commencer le modèle
                                </span>
                            </button>
                        )}

                        <div className="grid grid-cols-3 gap-0">
                            {renderModules()}
                        </div>
                    </div>
                </div>
            </div>

            <ModuleSelectorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleAddModule}
            />
            <PreviewModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                template={sheet}
            />
        </div>
    );
};
