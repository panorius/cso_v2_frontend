"use client";

import { TextareaModuleConfig } from "@/types/template/modules/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TextareaModuleProps {
    module: TextareaModuleConfig;
    onUpdate: (updates: Partial<TextareaModuleConfig>) => void;
    onDelete: () => void;
}

export function TextareaModule({
    module,
    onUpdate,
    onDelete,
}: TextareaModuleProps) {
    return (
        <div className="border rounded p-4 bg-indigo-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-indigo-200 px-2 py-1 rounded">
                        TEXTAREA
                    </span>
                    <span className="text-sm font-semibold">
                        {module.title}
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="space-y-3">
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
                    <textarea
                        value={module.defaultValue || ""}
                        onChange={(e) =>
                            onUpdate({ defaultValue: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded text-sm"
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
}
