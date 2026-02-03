import React from "react";
import { ModuleCategory, ModuleType } from "./types";
import { MODULE_PALETTE } from "./constants";

interface SidebarProps {
    onAddModule: (
        type: ModuleType,
        category: ModuleCategory,
        label: string
    ) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddModule }) => {
    const categories = Object.values(ModuleCategory);

    return (
        <div className="w-80 h-full bg-[#32293d] border-l border-[#4a3b5c] overflow-y-auto p-4 flex flex-col gap-8 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold tracking-widest text-gray-300 uppercase">
                    Catalogue de Modules
                </h2>
                {/* <div className="p-1 bg-orange-500 rounded-full cursor-pointer">
                    <i className="w-4 h-4 text-white icon-plus" />
                </div> */}
            </div>

            {categories.map((category) => (
                <div key={category} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#4a3b5c] pb-2">
                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                            {category}
                        </span>
                        {category === ModuleCategory.INTELLIGENT && (
                            <i className="w-3 h-3 text-orange icon-info" />
                        )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {MODULE_PALETTE.filter(
                            (m) => m.category === category
                        ).map((module) => (
                            <button
                                key={module.type}
                                onClick={() =>
                                    onAddModule(
                                        module.type,
                                        module.category,
                                        module.label
                                    )
                                }
                                className="flex flex-col items-center justify-center p-3 bg-[#42374d] rounded-xl hover:bg-orange-500 transition-all group relative overflow-hidden active:scale-95"
                            >
                                <div className="mb-2 text-gray-300 group-hover:text-white">
                                    {module.icon}
                                </div>
                                <span className="text-[10px] font-medium text-gray-400 group-hover:text-white text-center leading-tight">
                                    {module.label}
                                </span>
                                <div className="absolute top-1 right-1 opacity-20 group-hover:opacity-40">
                                    <span className="text-[10px] font-bold">
                                        #
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
