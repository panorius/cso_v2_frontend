"use client";

import { SeparatorModuleConfig } from "@/types/template/modules/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SeparatorModuleProps {
    module: SeparatorModuleConfig;
    onUpdate: (updates: Partial<SeparatorModuleConfig>) => void;
    onDelete: () => void;
}

export function SeparatorModule({
    module,
    onUpdate,
    onDelete,
}: SeparatorModuleProps) {
    return (
        <div className="p-4 border rounded bg-grey-darken">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 font-mono text-xs bg-gray-200 rounded">
                        SEPARATOR
                    </span>
                    <span className="text-sm font-semibold">
                        {module.label || "Séparateur"}
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block mb-1 text-xs font-medium">
                        Label
                    </label>
                    <input
                        type="text"
                        value={module.label || ""}
                        onChange={(e) => onUpdate({ label: e.target.value })}
                        className="w-full px-2 py-1 text-sm border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-xs font-medium">
                        Icône gauche
                    </label>
                    <input
                        type="text"
                        value={module.icons?.left || ""}
                        onChange={(e) =>
                            onUpdate({
                                icons: {
                                    ...module.icons,
                                    left: e.target.value,
                                },
                            })
                        }
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="star"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-xs font-medium">
                        Icône droite
                    </label>
                    <input
                        type="text"
                        value={module.icons?.right || ""}
                        onChange={(e) =>
                            onUpdate({
                                icons: {
                                    ...module.icons,
                                    right: e.target.value,
                                },
                            })
                        }
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="star"
                    />
                </div>
            </div>
        </div>
    );
}
