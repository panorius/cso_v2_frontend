import React from "react";
import { ModuleConfig } from "../../types";
import { DiceInput } from "../CommonInputs";

interface EditorProps {
    config: ModuleConfig;
    updateConfig: (updates: Partial<ModuleConfig>) => void;
}

export const SimpleStatEditor: React.FC<EditorProps> = ({
    config,
    updateConfig,
}) => {
    const updateFieldLabel = (idx: number, val: string) => {
        const newLabels = [...(config.fieldLabels || [])];
        newLabels[idx] = val;
        updateConfig({ fieldLabels: newLabels });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-8">
                <div className="flex items-center gap-3">
                    <div className="text-orange">
                        <i className="w-5 h-5 icon-text" />
                    </div>
                    <span className="text-sm font-bold text-gray-400">
                        Bonus/Malus
                    </span>
                </div>
                <div className="flex-1 min-w-[300px]">
                    <DiceInput
                        value={config.diceFormula || ""}
                        onChange={(val) => updateConfig({ diceFormula: val })}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: config.fieldCount || 1 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            Label
                        </label>
                        <input
                            type="text"
                            className="bg-[#2a2a2a] border border-transparent rounded-lg p-2.5 text-sm text-white font-bold outline-none focus:border-orange-500/50 focus:bg-[#1e1e1e] transition-all"
                            placeholder="Label..."
                            value={config.fieldLabels?.[i] || ""}
                            onChange={(e) =>
                                updateFieldLabel(i, e.target.value)
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
