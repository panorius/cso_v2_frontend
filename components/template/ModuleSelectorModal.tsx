import React from "react";
import { ModuleCategory, ModuleType } from "./types";
import { MODULE_PALETTE } from "./constants";

interface ModuleSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (
        type: ModuleType,
        category: ModuleCategory,
        label: string
    ) => void;
}

export const ModuleSelectorModal: React.FC<ModuleSelectorModalProps> = ({
    isOpen,
    onClose,
    onSelect,
}) => {
    if (!isOpen) return null;

    const categories = Object.values(ModuleCategory);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#2a2235] border border-[#4a3b5c] rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-6 border-b border-[#4a3b5c] flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-wider text-white uppercase">
                            Ajouter un module
                        </h2>
                        <p className="mt-1 text-xs text-gray-400">
                            Choisissez la structure du champ à intégrer au
                            modèle
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#382f44] rounded-full transition-colors"
                    >
                        <i className="w-6 h-6 text-gray-400 icon-text" />
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    {categories.map((category) => (
                        <div key={category} className="mb-8 last:mb-0">
                            <h3 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {MODULE_PALETTE.filter(
                                    (m) => m.category === category
                                ).map((module) => (
                                    <button
                                        key={module.type}
                                        onClick={() => {
                                            onSelect(
                                                module.type,
                                                module.category,
                                                module.label
                                            );
                                            onClose();
                                        }}
                                        className="flex flex-col items-center justify-center p-4 bg-[#382f44] border border-[#4a3b5c] rounded-2xl hover:bg-orange-500 hover:border-orange transition-all group active:scale-95"
                                    >
                                        <div className="text-orange group-hover:text-white mb-3 bg-[#241b2f] p-3 rounded-xl group-hover:bg-orange-600 transition-colors">
                                            {module.icon}
                                        </div>
                                        <span className="text-xs font-bold text-center text-gray-200 group-hover:text-white">
                                            {module.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
