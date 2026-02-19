"use client";

import { TableModuleConfig } from "@/types/template/modules/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TableModuleProps {
    module: TableModuleConfig;
    onUpdate: (updates: Partial<TableModuleConfig>) => void;
    onDelete: () => void;
}

export function TableModule({ module, onUpdate, onDelete }: TableModuleProps) {
    return (
        <div className="border-2 rounded p-4 bg-gradient-to-br from-violet-50 to-purple-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-violet-300 px-2 py-1 rounded">
                        TABLE
                    </span>
                    <span className="text-sm font-semibold">
                        {module.title || "Tableau"}
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Titre
                        </label>
                        <input
                            type="text"
                            value={module.title || ""}
                            onChange={(e) =>
                                onUpdate({ title: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Formule de dé
                        </label>
                        <input
                            type="text"
                            value={module.rollDice || ""}
                            onChange={(e) =>
                                onUpdate({ rollDice: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="1d6+SUM"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.hasSumRow}
                            onChange={(e) =>
                                onUpdate({ hasSumRow: e.target.checked })
                            }
                        />
                        Ligne de somme
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.hasCheckboxColumn}
                            onChange={(e) =>
                                onUpdate({
                                    hasCheckboxColumn: e.target.checked,
                                })
                            }
                        />
                        Colonne de checkbox
                    </label>
                </div>

                <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-500">
                        Configuration complète des en-têtes et lignes du tableau
                        à implémenter selon vos besoins.
                    </p>
                </div>
            </div>
        </div>
    );
}
