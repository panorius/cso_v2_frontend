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

type ModuleType =
    | "stat_simple"
    | "stat_mod"
    | "stat_cthulhu"
    | "text"
    | "number"
    | "list"
    | "points"
    | "checkbox"
    | "textarea"
    | "aptitude"
    | "balance"
    | "skill"
    | "separator"
    | "ai_bio"
    | "ai_portrait";

interface MiniEditorProps {
    type: ModuleType;
    config: ModuleConfig;
    updateConfig: (updates: Partial<ModuleConfig>) => void;
}

const MINI_ICONS: Record<string, any> = {
    text: <i className="icon-text" />,
    number: <i className="icon-text" />,
    list: <i className="icon-text" />,
    points: <i className="icon-text" />,
    checkbox: <i className="icon-text" />,
    textarea: <i className="icon-text" />,
};

export const MiniModuleEditor: React.FC<MiniEditorProps> = ({
    type,
    config,
    updateConfig,
}) => {
    const Icon = MINI_ICONS[type] || <i className="icon-text" />;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-orange-500/20 rounded-lg border border-orange-500/30">
                    <i className="w-3.5 h-3.5 text-orange icon-text" />
                </div>
                <input
                    type="text"
                    className="bg-transparent border-none text-[11px] font-black text-white uppercase tracking-wider outline-none w-full focus:text-orange transition-colors"
                    value={config.label || ""}
                    onChange={(e) => updateConfig({ label: e.target.value })}
                    placeholder="Titre..."
                />
            </div>

            <div className="bg-[#1a1423] border border-[#4a3b5c] rounded-xl p-2 h-10 flex items-center justify-center">
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                    Preview
                </span>
            </div>
        </div>
    );
};
