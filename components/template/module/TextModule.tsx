"use client";

import { TextModuleConfig } from "@/types/template/modules/text";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TextModuleProps {
    module: TextModuleConfig;
    onUpdate: (updates: Partial<TextModuleConfig>) => void;
    onDelete: () => void;
}

export function TextModule({ module, onUpdate, onDelete }: TextModuleProps) {
    return (
        <div className="border rounded p-4 bg-blue-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-blue-200 px-2 py-1 rounded">
                        TEXT
                    </span>
                    <span className="text-sm font-semibold">
                        {module.title}
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                        Valeur par défaut
                    </label>
                    <input
                        type="text"
                        value={module.defaultValue || ""}
                        onChange={(e) =>
                            onUpdate({ defaultValue: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded text-sm"
                    />
                </div>
                <div className="col-span-2">
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
