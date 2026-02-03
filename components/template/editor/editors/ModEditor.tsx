import React from "react";
import { ModuleConfig } from "../../types";
import { DiceInput, LabelInput } from "../CommonInputs";

interface EditorProps {
    config: ModuleConfig;
    updateConfig: (updates: Partial<ModuleConfig>) => void;
}

export const ModEditor: React.FC<EditorProps> = ({ config, updateConfig }) => {
    const updateLabel = (val: string) => {
        const labels = [...(config.fieldLabels || [])];
        labels[0] = val;
        updateConfig({ fieldLabels: labels });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-8">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() =>
                            updateConfig({ hasBonus: !config.hasBonus })
                        }
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${config.hasBonus ? "bg-orange-500 border-orange-500" : "border-orange-500/50"}`}
                    >
                        {config.hasBonus && (
                            <i className="w-4 h-4 text-white icon-text" />
                        )}
                    </button>
                    <span className="text-sm font-bold text-gray-400">
                        Avec bonus
                    </span>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <DiceInput
                        value={config.diceFormula || ""}
                        onChange={(val) => updateConfig({ diceFormula: val })}
                    />
                </div>
                <div className="flex-1 min-w-[250px] flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        Calcul du MOD
                    </label>
                    <div className="relative">
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
                            className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg p-2.5 text-sm text-transparent outline-none"
                        />
                        <div className="absolute top-0 bottom-0 right-0 w-4 bg-orange-500 rounded-r-lg"></div>
                    </div>
                </div>
            </div>
            <div className="max-w-xs">
                <LabelInput
                    value={config.fieldLabels?.[0] || ""}
                    onChange={updateLabel}
                />
            </div>
        </div>
    );
};
