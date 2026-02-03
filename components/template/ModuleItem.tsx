import React from "react";
import { ModuleDefinition, ModuleType } from "./types";

interface ModuleItemProps {
    module: ModuleDefinition;
    index: number;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<ModuleDefinition>) => void;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
}

export const ModuleItem: React.FC<ModuleItemProps> = ({
    module,
    index,
    onDelete,
    onUpdate,
    onDragStart,
    onDragOver,
    onDragEnd,
}) => {
    const config = module.config;

    const updateConfig = (updates: any) => {
        onUpdate(module.id, { config: { ...config, ...updates } });
    };

    const handleFieldCountChange = (delta: number) => {
        const newCount = Math.max(1, (config.fieldCount || 1) + delta);
        const newLabels = [...(config.fieldLabels || [])];

        if (delta > 0) {
            for (let i = 0; i < delta; i++) newLabels.push("");
        } else {
            newLabels.splice(newCount);
        }

        updateConfig({ fieldCount: newCount, fieldLabels: newLabels });
    };

    const updateFieldLabel = (idx: number, val: string) => {
        const newLabels = [...(config.fieldLabels || [])];
        newLabels[idx] = val;
        updateConfig({ fieldLabels: newLabels });
    };

    const renderModuleHeader = () => (
        <div className="flex items-center justify-between p-3 bg-[#444444] rounded-t-xl border-b border-[#555555]">
            <div className="flex items-center gap-3">
                <div className="text-orange cursor-grab active:cursor-grabbing">
                    <i className="w-5 h-5 icon-grip-vertical" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-[#1a1423] rounded border border-gray-600">
                        <i className="w-3 h-3 text-white icon-hash" />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-gray-200 uppercase">
                        {module.type === "stat_cthulhu"
                            ? "Caractéristique Cthulhu"
                            : module.type === "stat_mod"
                              ? "Caractéristique avec MOD"
                              : module.type === "stat_simple"
                                ? "Caractéristique Simple"
                                : module.label}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 uppercase font-medium">
                        Nombre de champs
                    </span>
                    <div className="flex items-center bg-[#333333] rounded-lg overflow-hidden border border-gray-600">
                        <button
                            onClick={() => handleFieldCountChange(-1)}
                            className="p-1.5 hover:bg-orange text-gray-300 hover:text-white transition-colors"
                        >
                            <i className="w-3 h-3 icon-minus" />
                        </button>
                        <span className="px-3 text-sm font-bold text-white">
                            {config.fieldCount || 1}
                        </span>
                        <button
                            onClick={() => handleFieldCountChange(1)}
                            className="p-1.5 bg-orange text-white hover:bg-orange-600 transition-colors"
                        >
                            <i className="w-3 h-3 icon-plus" />
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => onDelete(module.id)}
                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all"
                >
                    <i className="w-4 h-4 icon-x" />
                </button>
            </div>
        </div>
    );

    const renderDiceInput = (label: string = "Lancer de dés au clic") => (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                {label}
            </label>
            <div className="relative group">
                <input
                    type="text"
                    placeholder="ex: 1d20+#MOD>=10"
                    className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg p-2.5 text-sm text-gray-300 outline-none focus:border-orange transition-all placeholder:text-gray-700"
                    value={config.diceFormula || ""}
                    onChange={(e) =>
                        updateConfig({ diceFormula: e.target.value })
                    }
                />
                <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-4 rounded-r-lg bg-orange">
                    <span className="text-[10px] font-black text-[#1a1423]">
                        #
                    </span>
                </div>
            </div>
        </div>
    );

    const renderSpecificContent = () => {
        switch (module.type as ModuleType) {
            case "stat_cthulhu":
                return (
                    <div className="space-y-6">
                        <div className="max-w-md">{renderDiceInput()}</div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-gray-500 font-bold uppercase">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    className="bg-[#1e1e1e] border border-orange/50 rounded-lg p-2.5 text-sm text-white font-bold outline-none"
                                    placeholder="Label"
                                    value={config.fieldLabels?.[0] || ""}
                                    onChange={(e) =>
                                        updateFieldLabel(0, e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                );

            case "stat_mod":
                return (
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-end gap-8">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        updateConfig({
                                            hasBonus: !config.hasBonus,
                                        })
                                    }
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${config.hasBonus ? "bg-orange border-orange" : "border-orange/50"}`}
                                >
                                    {config.hasBonus && (
                                        <i className="w-4 h-4 text-white icon-check" />
                                    )}
                                </button>
                                <span className="text-sm font-bold text-gray-400">
                                    Avec bonus
                                </span>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                {renderDiceInput()}
                            </div>
                            <div className="flex-1 min-w-[250px] flex flex-col gap-1.5">
                                <label className="text-[10px] text-gray-500 font-bold uppercase">
                                    Calcul du MOD
                                </label>
                                <div className="relative group">
                                    <div className="absolute flex items-center -translate-y-1/2 pointer-events-none left-3 top-1/2">
                                        <span className="mr-2 text-sm font-bold text-gray-400">
                                            ROUNDDOWN((
                                        </span>
                                        <span className="px-2 py-0.5 bg-gray-600 rounded text-[10px] text-white font-black uppercase">
                                            Value
                                        </span>
                                        <span className="ml-2 text-sm font-bold text-gray-400">
                                            x -10)/2)
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg p-2.5 text-sm text-transparent outline-none focus:border-orange"
                                    />
                                    <div className="absolute top-0 bottom-0 right-0 w-4 rounded-r-lg bg-orange"></div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-xs flex flex-col gap-1.5">
                            <label className="text-[10px] text-gray-500 font-bold uppercase">
                                Label
                            </label>
                            <input
                                type="text"
                                className="bg-[#1e1e1e] border border-orange/50 rounded-lg p-2.5 text-sm text-white font-bold outline-none"
                                placeholder="Label"
                                value={config.fieldLabels?.[0] || ""}
                                onChange={(e) =>
                                    updateFieldLabel(0, e.target.value)
                                }
                            />
                        </div>
                    </div>
                );

            case "stat_simple":
                return (
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-end gap-8">
                            <div className="flex items-center gap-3">
                                <div className="text-orange">
                                    <i className="w-5 h-5 icon-check" />
                                </div>
                                <span className="text-sm font-bold text-gray-400">
                                    Bonus/Malus
                                </span>
                            </div>
                            <div className="flex-1 min-w-[300px]">
                                {renderDiceInput()}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: config.fieldCount || 1 }).map(
                                (_, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <label className="text-[10px] text-gray-500 font-bold uppercase">
                                            Label
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-sm text-white font-bold outline-none focus:border-orange/50 focus:bg-[#1e1e1e] transition-all"
                                            placeholder="Label..."
                                            value={
                                                config.fieldLabels?.[i] || ""
                                            }
                                            onChange={(e) =>
                                                updateFieldLabel(
                                                    i,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block tracking-widest">
                                Label principal
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#1a1423] border border-[#4a3b5c] rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-orange transition-all"
                                value={config.label || ""}
                                onChange={(e) =>
                                    updateConfig({ label: e.target.value })
                                }
                                placeholder={`Ex: ${module.label}...`}
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-gray-600 text-[10px] italic">
                                Configuration standard pour ce module simple.
                            </span>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            className="bg-[#333333] border border-gray-700 rounded-2xl mb-6 shadow-2xl transition-all overflow-hidden group hover:border-gray-500"
        >
            {renderModuleHeader()}
            <div className="p-6">{renderSpecificContent()}</div>
        </div>
    );
};
