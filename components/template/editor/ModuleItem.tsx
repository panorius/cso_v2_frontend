import React from "react";
import {
    ModuleDefinition,
    ModuleType,
    ModuleConfig,
    ModuleCategory,
} from "../types";
import { ModuleHeader } from "./ModuleHeader";
import { CthulhuEditor } from "./editors/CthulhuEditor";
import { ModEditor } from "./editors/ModEditor";
import { SimpleStatEditor } from "./editors/SimpleStatEditor";
import { MiniModuleEditor } from "./editors/MiniModuleEditor";

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
    const isMini = module.category === ModuleCategory.MINI;
    const config = module.config;

    const updateConfig = (updates: Partial<ModuleConfig>) => {
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

    const renderContent = () => {
        if (isMini) {
            return (
                <MiniModuleEditor
                    type={module.type}
                    config={config}
                    updateConfig={updateConfig}
                />
            );
        }

        switch (module.type as ModuleType) {
            case "stat_cthulhu":
                return (
                    <CthulhuEditor
                        config={config}
                        updateConfig={updateConfig}
                    />
                );
            case "stat_mod":
                return (
                    <ModEditor config={config} updateConfig={updateConfig} />
                );
            case "stat_simple":
                return (
                    <SimpleStatEditor
                        config={config}
                        updateConfig={updateConfig}
                    />
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
                                className="w-full bg-[#1a1423] border border-[#4a3b5c] rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-orange-500 transition-all"
                                value={config.label || ""}
                                onChange={(e) =>
                                    updateConfig({ label: e.target.value })
                                }
                                placeholder={`Ex: ${module.label}...`}
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-gray-600 text-[10px] italic">
                                Configuration standard.
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
            className={`relative bg-[#333333] border border-gray-700 rounded-2xl shadow-2xl transition-all overflow-hidden group hover:border-orange-500/30 ${isMini ? "h-full" : "mb-6"}`}
        >
            {!isMini ? (
                <ModuleHeader
                    type={module.type}
                    label={module.label}
                    fieldCount={config.fieldCount || 1}
                    onFieldCountChange={handleFieldCountChange}
                    onDelete={() => onDelete(module.id)}
                />
            ) : (
                <button
                    onClick={() => onDelete(module.id)}
                    className="absolute z-10 p-1 text-gray-600 transition-all opacity-0 top-2 right-2 hover:text-red-500 group-hover:opacity-100"
                >
                    <i className="w-3.5 h-3.5 icon-x" />
                </button>
            )}

            <div className={isMini ? "p-4" : "p-6"}>{renderContent()}</div>
        </div>
    );
};
