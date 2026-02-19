"use client";

import { NumberModuleConfig } from "@/types/template/modules/number";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface NumberModuleProps {
    module: NumberModuleConfig;
    onUpdate: (updates: Partial<NumberModuleConfig>) => void;
    onDelete: () => void;
}

export function NumberModule({
    module,
    onUpdate,
    onDelete,
}: NumberModuleProps) {
    return (
        <div className="border rounded p-4 bg-green-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-green-200 px-2 py-1 rounded">
                        NUMBER
                    </span>
                    <span className="text-sm font-semibold">
                        {module.title}
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block text-xs font-medium mb-1">
                        Titre
                    </label>
                    <input
                        type="text"
                        value={module.title}
                        onChange={(e) => onUpdate({ title: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">
                        Unité
                    </label>
                    <input
                        type="text"
                        value={module.unit || ""}
                        onChange={(e) => onUpdate({ unit: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                        placeholder="kg, m, etc."
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">
                        Valeur par défaut
                    </label>
                    <input
                        type="number"
                        value={module.defaultValue || 0}
                        onChange={(e) =>
                            onUpdate({ defaultValue: parseInt(e.target.value) })
                        }
                        className="w-full px-2 py-1 border rounded text-sm"
                    />
                </div>
                <div className="col-span-3">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.hasLabelVisible}
                            onChange={(e) =>
                                onUpdate({ hasLabelVisible: e.target.checked })
                            }
                        />
                        Label visible
                    </label>
                </div>
            </div>
        </div>
    );
}
