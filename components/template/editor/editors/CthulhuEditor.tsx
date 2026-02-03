import React from "react";
interface ModuleConfig {
    label?: string;
    fieldCount?: number;
    fieldLabels?: string[];
    diceFormula?: string;
    modFormula?: string;
    hasBonus?: boolean;
    placeholder?: string;
    defaultValue?: string | number;
    options?: string;
    max?: number;
    required?: boolean;
}
import { DiceInput, LabelInput } from "../CommonInputs";

interface EditorProps {
    config: ModuleConfig;
    updateConfig: (updates: Partial<ModuleConfig>) => void;
}

export const CthulhuEditor: React.FC<EditorProps> = ({
    config,
    updateConfig,
}) => {
    const updateLabel = (val: string) => {
        const labels = [...(config.fieldLabels || [])];
        labels[0] = val;
        updateConfig({ fieldLabels: labels });
    };

    return (
        <div className="space-y-6">
            <div className="max-w-md">
                <DiceInput
                    value={config.diceFormula || ""}
                    onChange={(val) => updateConfig({ diceFormula: val })}
                />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <LabelInput
                    value={config.fieldLabels?.[0] || ""}
                    onChange={updateLabel}
                />
            </div>
        </div>
    );
};
