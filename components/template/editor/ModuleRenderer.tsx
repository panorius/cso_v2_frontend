"use client";

import { TabModule } from "@/types/template/schema";
import { TextModule } from "../module/TextModule";
import { NumberModule } from "../module/NumberModule";
import { CheckboxModule } from "../module/CheckboxModule";
import { ListModule } from "../module/ListModule";
import { PointModule } from "../module/PointModule";
import { TextareaModule } from "../module/TextareaModule";
import { AbilityModule } from "../module/AbilityModule";
import { AptitudeModule } from "../module/AptitudeModule";
import { BalanceModule } from "../module/BalanceModule";
import { GaugeModule } from "../module/GaugeModule";
import { IconStatisticModule } from "../module/IconStatisticModule";
import { TableModule } from "../module/TableModule";
import { SkillModule } from "../module/SkillModule";
import { SeparatorModule } from "../module/SeparatorModule";
import { MasteriesPercentageModule } from "../module/MasteriesPercentageModule";
import { InventoryModule } from "../module/InventoryModule";
import { BlockModule } from "../module/BlockModule";

interface ModuleRendererProps {
    module: TabModule;
    onUpdate: (updates: any) => void;
    onDelete: () => void;
    onAddModule: (blockId: string, position: number) => void;
}

export function ModuleRenderer({
    module,
    onUpdate,
    onDelete,
    onAddModule,
}: ModuleRendererProps) {
    switch (module.type) {
        case "text":
            return (
                <TextModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "number":
            return (
                <NumberModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "checkbox":
            return (
                <CheckboxModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "list":
            return (
                <ListModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "point":
            return (
                <PointModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "textarea":
            return (
                <TextareaModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "ability":
            return (
                <AbilityModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "aptitude":
            return (
                <AptitudeModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "balance":
            return (
                <BalanceModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "gauge":
            return (
                <GaugeModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "iconstatistic":
            return (
                <IconStatisticModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "table":
            return (
                <TableModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "skill":
            return (
                <SkillModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "separator":
            return (
                <SeparatorModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "masteriespercentage":
            return (
                <MasteriesPercentageModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "inventory":
            return (
                <InventoryModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "block":
            return (
                <BlockModule
                    module={module}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAddModule={onAddModule}
                />
            );
        default:
            return (
                <div className="p-4 border rounded bg-red-50 text-red-600">
                    Type de module inconnu: {(module as any).type}
                </div>
            );
    }
}
