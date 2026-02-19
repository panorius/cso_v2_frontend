"use client";

import { PointModuleConfig } from "@/types/template/modules/point";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PointModuleProps {
    module: PointModuleConfig;
    onUpdate: (updates: Partial<PointModuleConfig>) => void;
    onDelete: () => void;
}

export function PointModule({ module, onUpdate, onDelete }: PointModuleProps) {
    return (
        <div className="border rounded p-4 bg-red-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-red-200 px-2 py-1 rounded">
                        POINT
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
                        Valeur actuelle
                    </label>
                    <input
                        type="number"
                        value={module.defaultValue || "0"}
                        onChange={(e) =>
                            onUpdate({ defaultValue: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">
                        Valeur maximale
                    </label>
                    <input
                        type="number"
                        value={module.maxDefaultValue || "10"}
                        onChange={(e) =>
                            onUpdate({ maxDefaultValue: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded text-sm"
                    />
                </div>
                <div className="col-span-3">
                    <label className="flex items-center gap-2 text-sm">
                        <span>Label visible</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
