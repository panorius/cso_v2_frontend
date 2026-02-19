"use client";

import { CheckboxModuleConfig } from "@/types/template/modules/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CheckboxModuleProps {
    module: CheckboxModuleConfig;
    onUpdate: (updates: Partial<CheckboxModuleConfig>) => void;
    onDelete: () => void;
}

export function CheckboxModule({
    module,
    onUpdate,
    onDelete,
}: CheckboxModuleProps) {
    return (
        <div className="border rounded p-4 bg-yellow-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-yellow-200 px-2 py-1 rounded">
                        CHECKBOX
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
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.defaultValue === "true"}
                            onChange={(e) =>
                                onUpdate({
                                    defaultValue: e.target.checked
                                        ? "true"
                                        : "false",
                                })
                            }
                        />
                        Coché par défaut
                    </label>
                </div>
            </div>
        </div>
    );
}
