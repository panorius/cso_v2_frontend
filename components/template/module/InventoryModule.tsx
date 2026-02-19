"use client";

import { InventoryModuleConfig } from "@/types/template/modules/inventory";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface InventoryModuleProps {
    module: InventoryModuleConfig;
    onUpdate: (updates: Partial<InventoryModuleConfig>) => void;
    onDelete: () => void;
}

export function InventoryModule({
    module,
    onUpdate,
    onDelete,
}: InventoryModuleProps) {
    return (
        <div className="border-2 rounded p-4 bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-rose-300 px-2 py-1 rounded">
                        INVENTORY
                    </span>
                    <span className="text-sm font-semibold">Inventaire</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Label Nom
                        </label>
                        <input
                            type="text"
                            value={module.labels.name}
                            onChange={(e) =>
                                onUpdate({
                                    labels: {
                                        ...module.labels,
                                        name: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Label Quantité
                        </label>
                        <input
                            type="text"
                            value={module.labels.quantity}
                            onChange={(e) =>
                                onUpdate({
                                    labels: {
                                        ...module.labels,
                                        quantity: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.hasRarity}
                            onChange={(e) =>
                                onUpdate({ hasRarity: e.target.checked })
                            }
                        />
                        Avec rareté
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.hasWeight}
                            onChange={(e) =>
                                onUpdate({ hasWeight: e.target.checked })
                            }
                        />
                        Avec poids
                    </label>
                </div>

                <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-500">
                        Configuration complète des catégories et devises à
                        implémenter selon vos besoins.
                    </p>
                </div>
            </div>
        </div>
    );
}
