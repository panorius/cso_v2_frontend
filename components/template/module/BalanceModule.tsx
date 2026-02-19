"use client";

import { BalanceModuleConfig } from "@/types/template/modules/balance";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface BalanceModuleProps {
    module: BalanceModuleConfig;
    onUpdate: (updates: Partial<BalanceModuleConfig>) => void;
    onDelete: () => void;
}

export function BalanceModule({
    module,
    onUpdate,
    onDelete,
}: BalanceModuleProps) {
    return (
        <div className="border-2 rounded p-4 bg-gradient-to-br from-cyan-50 to-blue-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-cyan-300 px-2 py-1 rounded">
                        BALANCE
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

                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Pas
                        </label>
                        <input
                            type="number"
                            value={module.step}
                            onChange={(e) =>
                                onUpdate({ step: parseInt(e.target.value) })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Valeur par défaut
                        </label>
                        <input
                            type="number"
                            value={module.defaultValue}
                            onChange={(e) =>
                                onUpdate({
                                    defaultValue: parseInt(e.target.value),
                                })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-2 rounded border">
                        <h4 className="text-xs font-semibold mb-2">Minimum</h4>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={module.minimum.label}
                                onChange={(e) =>
                                    onUpdate({
                                        minimum: {
                                            ...module.minimum,
                                            label: e.target.value,
                                        },
                                    })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Label"
                            />
                            <input
                                type="text"
                                value={module.minimum.icon}
                                onChange={(e) =>
                                    onUpdate({
                                        minimum: {
                                            ...module.minimum,
                                            icon: e.target.value,
                                        },
                                    })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Icône"
                            />
                            <input
                                type="number"
                                value={module.minimum.defaultValue}
                                onChange={(e) =>
                                    onUpdate({
                                        minimum: {
                                            ...module.minimum,
                                            defaultValue: parseInt(
                                                e.target.value,
                                            ),
                                        },
                                    })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Valeur"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-2 rounded border">
                        <h4 className="text-xs font-semibold mb-2">Maximum</h4>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={module.maximum.label}
                                onChange={(e) =>
                                    onUpdate({
                                        maximum: {
                                            ...module.maximum,
                                            label: e.target.value,
                                        },
                                    })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Label"
                            />
                            <input
                                type="text"
                                value={module.maximum.icon}
                                onChange={(e) =>
                                    onUpdate({
                                        maximum: {
                                            ...module.maximum,
                                            icon: e.target.value,
                                        },
                                    })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Icône"
                            />
                            <input
                                type="number"
                                value={module.maximum.defaultValue}
                                onChange={(e) =>
                                    onUpdate({
                                        maximum: {
                                            ...module.maximum,
                                            defaultValue: parseInt(
                                                e.target.value,
                                            ),
                                        },
                                    })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Valeur"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
