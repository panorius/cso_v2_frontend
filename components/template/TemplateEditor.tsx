"use client";

import { useState } from "react";
import {
    CharacterSheetTemplate,
    SheetSection,
    ThemeConfig,
} from "@/types/template";
import { ModuleDefinition, ModuleCategory } from "@/types/template/modules";
import { Button, StyledButton } from "@/components/ui/button";
import { ClassicTabs, StyledTabs } from "@/components/ui/tabs";
import { ModulePalette } from "./editor/ModulePalette";
import { TemplatePreview } from "./editor/TemplatePreview";
import { SchemaEditor } from "./editor/SchemaEditor";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import patternStandard from "@/assets/images/patterns/standard.png";
import { ClassicInput } from "../ui/inputs";
import { Tab } from "@heroui/tabs";
import ContentSchema from "./sections/ContentSchema";

type SchemaType = "players" | "creatures" | "dice";

interface TemplateEditorProps {
    initialTemplate?: CharacterSheetTemplate;
    onSave?: (template: CharacterSheetTemplate) => void;
}

export function TemplateEditor({
    initialTemplate,
    onSave,
}: TemplateEditorProps) {
    const [template, setTemplate] = useState<CharacterSheetTemplate>(
        initialTemplate || {
            name: "Nouveau Template",
            gameSystem: "",
            description: "",
            sections: [],
            theme: {
                primaryColor: "#3b82f6",
                accentColor: "#8b5cf6",
                backgroundColor: "#ffffff",
                headerColor: "#1e40af",
            },
        },
    );

    const [showPreview, setShowPreview] = useState(false);
    const [activeTabSchema, setActiveTabSchema] = useState("schemas");
    const [activeSchema, setActiveSchema] = useState<SchemaType>("players");
    const [primaryColor, setPrimaryColor] = useState("#f59e0b");
    const [selectedSchemas, setSelectedSchemas] = useState("schemas");
    const [activeTabSection, setActiveTabSection] = useState("sections");
    const [selectedSection, setSelectedSection] = useState("sections");

    const handleTemplateChange = (updates: Partial<CharacterSheetTemplate>) => {
        setTemplate((prev) => ({ ...prev, ...updates }));
    };

    const handleAddSection = () => {
        const newSection: SheetSection = {
            id: `section-${Date.now()}`,
            title: "Nouvelle Section",
            icon: "star",
            modules: [],
        };
        setTemplate((prev) => ({
            ...prev,
            sections: [...prev.sections, newSection],
        }));
    };

    const handleUpdateSection = (
        sectionId: string,
        updates: Partial<SheetSection>,
    ) => {
        setTemplate((prev) => ({
            ...prev,
            sections: prev.sections.map((section) =>
                section.id === sectionId ? { ...section, ...updates } : section,
            ),
        }));
    };

    const handleDeleteSection = (sectionId: string) => {
        setTemplate((prev) => ({
            ...prev,
            sections: prev.sections.filter(
                (section) => section.id !== sectionId,
            ),
        }));
    };

    const handleAddModule = (sectionId: string, module: ModuleDefinition) => {
        setTemplate((prev) => ({
            ...prev,
            sections: prev.sections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        modules: [...section.modules, module.category],
                    };
                }
                return section;
            }),
        }));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        // Check if dragging from palette to section
        if (
            String(active.id).startsWith("palette-") &&
            String(over.id).startsWith("section-drop-")
        ) {
            const moduleData = active.data.current;
            const sectionId = String(over.id).replace("section-drop-", "");

            if (moduleData && sectionId) {
                handleAddModule(sectionId, moduleData as ModuleDefinition);
            }
            return;
        }

        // Handle section reordering
        if (active.id === over.id) return;

        const activeIndex = template.sections.findIndex(
            (s) => s.id === active.id,
        );
        const overIndex = template.sections.findIndex((s) => s.id === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
            const newSections = [...template.sections];
            const [removed] = newSections.splice(activeIndex, 1);
            newSections.splice(overIndex, 0, removed);
            setTemplate((prev) => ({ ...prev, sections: newSections }));
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave(template);
        }
    };

    const handleExportJson = () => {
        const json = JSON.stringify(template, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${template.name.replace(/\s+/g, "-").toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target?.result as string);
                    setTemplate(imported);
                } catch (error) {
                    console.error("Erreur lors de l'import:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    const JSON_TEMPLATE_EXAMPLE = {
        _id: {
            $oid: "68f4fa9cf10272873e97d004",
        },
        name: "Template D&D Test",
        image: null,
        version: {
            players: 1,
            creature: 1,
            dice: 1,
            npc: 1,
            item: 1,
            spell: 1,
        },
        schemaIds: [
            // Les schémas définissent les sections et modules disponibles dans le template. C'est la section centrale et éditable du templateEditor. On peut passer d'un schéma à l'autre via les tabs.
            {
                // Exemple de schéma pour les joueurs (entité à partir de laquelle le template est construit)
                _id: {
                    $oid: "68f4fa9cf10272873e97d005",
                },
                templateId: {
                    $oid: "68f4fa9cf10272873e97d004",
                },
                type: "player",
                version: {
                    $numberLong: "1",
                },
                outsideTabs: {
                    labelName: "Nom",
                    labelBiography: "Biographie",
                    labelGenre: "Genre",
                    level: {
                        labelLevel: "Niveau",
                        defaultValue: 1,
                        levels: [
                            200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800,
                        ],
                    },
                },
                tabs: [
                    {
                        id: "c1a2b3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p4",
                        title: "Caractéristiques",
                        icon: "book-open",
                        order: 1,
                        rights: {
                            tab: {
                                view: "ALL",
                                edit: "GM_ONLY",
                            },
                            modules: [
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b41",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b42",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b43",
                                    view: "ALL",
                                    edit: "ALL",
                                },
                                {
                                    moduleId:
                                        "c897a1b2-3c4d-5e6f-7g8h-9i0jklmnopqrst",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c897a1b2-3c4d-5e6f-7g8h-9i0jklmnopqrstu",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b81",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8c32",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                            ],
                        },
                        modules: [
                            {
                                id: "c1a2b3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
                                order: 1,
                                type: "block",
                                modules: [
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b41",
                                        type: "text",
                                        order: 1,
                                        title: "Race du personnage",
                                        defaultValue: "Gobelin",
                                        hasLabelVisible: true,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b42",
                                        type: "number",
                                        order: 2,
                                        title: "Poids du personnage",
                                        unit: "kg",
                                        defaultValue: 40,
                                        hasLabelVisible: true,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b43",
                                        type: "list",
                                        order: 3,
                                        title: "Métiers",
                                        hasLabelVisible: true,
                                        values: ["Forgeron", "Alchimiste"],
                                        defaultValue: [
                                            "Forgeron",
                                            "Alchimiste",
                                            "Herboriste",
                                        ],
                                        isMultiple: true,
                                    },
                                ],
                            },
                            {
                                id: "c897a1b2-3c4d-5e6f-7g8h-9i0jklmnopqrst",
                                order: 2,
                                type: "ability",
                                title: "Caractéristiques",
                                values: [
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b44",
                                        name: "Force",
                                        defaultValues: 0,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b45",
                                        name: "Dextérité",
                                        defaultValues: 0,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b46",
                                        name: "Constitution",
                                        defaultValues: 0,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b47",
                                        name: "Intelligence",
                                        defaultValues: 0,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b48",
                                        name: "Sagesse",
                                        defaultValues: 0,
                                    },
                                ],
                                rolldice: "1d20+VALUE",
                                modificator: "ROUNDDOWN((VALUE-10)/2)",
                                hasBonus: false,
                                display: "classic",
                            },
                            {
                                id: "c1a2b3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p5",
                                order: 3,
                                type: "block",
                                modules: [
                                    {
                                        id: "c897a1b2-3c4d-5e6f-7g8h-9i0jklmnopqrstu",
                                        type: "number",
                                        order: 1,
                                        title: "Age du personnage",
                                        unit: "ans",
                                        defaultValue: 22,
                                        hasLabelVisible: false,
                                    },
                                ],
                            },
                            {
                                id: "c1a2b3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p7",
                                order: 4,
                                type: "block",
                                modules: [
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8b81",
                                        type: "point",
                                        order: 1,
                                        title: "Point de satiété",
                                        defaultValue: 5,
                                        maxDefaultValue: 10,
                                        hasLabelVisible: true,
                                    },
                                    {
                                        id: "c3a7b8d4-5e2f-4b9a-9d3a-1f7e2a6c8c32",
                                        type: "checkbox",
                                        order: 2,
                                        title: "Est mort",
                                        defaultValue: false,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "c1a2b3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p8",
                        title: "Autres Informations",
                        icon: "info",
                        order: 2,
                        rights: {
                            tab: {
                                view: "ALL",
                                edit: "ALL",
                            },
                            modules: [
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b81",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b82",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b83",
                                    view: "ALL",
                                    edit: "ALL",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b85",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b86",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                            ],
                        },
                        modules: [
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b81",
                                type: "textarea",
                                order: 1,
                                title: "Histoire du personnage",
                                defaultValue:
                                    "Quelques informations supplémentaires ici...",
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b82",
                                type: "aptitude",
                                order: 2,
                                title: "Aptitudes passives",
                                labelName: "Nom de l'aptitude",
                                labelDescription: "Description",
                                values: [
                                    {
                                        id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p9",
                                        name: "Natation",
                                        description: "Peut nager efficacement.",
                                    },
                                    {
                                        id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p8",
                                        name: "Escalade",
                                        description:
                                            "Peut grimper des surfaces difficiles.",
                                    },
                                ],
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b83",
                                type: "balance",
                                order: 3,
                                title: "Balance de moralité",
                                step: 1,
                                minimum: {
                                    icon: "sad",
                                    label: "Mauvais",
                                    defaultValue: -10,
                                },
                                maximum: {
                                    icon: "happy",
                                    label: "Bon",
                                    defaultValue: 10,
                                },
                                defaultValue: 0,
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b85",
                                type: "masteriespercentage",
                                order: 4,
                                label: "Maîtrises de compétences",
                                values: [
                                    {
                                        id: "m1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p7",
                                        label: "Acrobaties",
                                        value: "75%",
                                        isReadOnly: false,
                                    },
                                    {
                                        id: "m1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p8",
                                        label: "Discrétion",
                                        value: "50%",
                                        isReadOnly: true,
                                    },
                                ],
                                rollDice: "1d100+VALUE",
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b86",
                                type: "separator",
                                order: 5,
                                label: "Informations supplémentaires",
                                icons: {
                                    left: "star",
                                    right: "star",
                                },
                            },
                        ],
                    },
                    {
                        id: "c1a2b3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p9",
                        title: "Modules intelligents",
                        icon: "cpu",
                        order: 3,
                        rights: {
                            tab: {
                                view: "ALL",
                                edit: "ALL",
                            },
                            modules: [
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b81",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7964-1f7e2a6c8b82",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                                {
                                    moduleId:
                                        "c3a7b8d4-5e2f-4b9a-7965-1f7e2a6c8b83",
                                    view: "ALL",
                                    edit: "ALL",
                                },
                                {
                                    moduleId:
                                        "s1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p12",
                                    view: "ALL",
                                    edit: "GM_ONLY",
                                },
                            ],
                        },
                        modules: [
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1f7e2a6c8b81",
                                type: "gauge",
                                order: 1,
                                values: [
                                    {
                                        id: "g1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p6",
                                        label: "Endurance",
                                        hasNegativeValues: false,
                                        defaultMinValue: 0,
                                        defaultMaxValue: 100,
                                        color: "#f87171",
                                    },
                                    {
                                        id: "g1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p7",
                                        label: "Mana",
                                        hasNegativeValues: false,
                                        defaultMinValue: 0,
                                        defaultMaxValue: 50,
                                        color: "#60a5fa",
                                    },
                                    {
                                        id: "g1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p8",
                                        label: "Corruption",
                                        hasNegativeValues: true,
                                        defaultMinValue: -50,
                                        defaultMaxValue: 50,
                                        color: "#a78bfa",
                                    },
                                ],
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7964-1f7e2a6c8b82",
                                type: "iconstatistic",
                                order: 2,
                                values: [
                                    {
                                        id: "i1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p9",
                                        icon: "heart",
                                        label: "Relations amicales",
                                        defaultValue: "Amis",
                                    },
                                    {
                                        id: "i1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p10",
                                        icon: "skull",
                                        label: "Relations hostiles",
                                        defaultValue: "Ennemis",
                                    },
                                ],
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7965-1f7e2a6c8b83",
                                type: "table",
                                order: 3,
                                title: "Aptitudes de combat",
                                rollDice: "1d6+SUM",
                                headers: ["Aptitude", "Niveau", "Description"],
                                rows: [
                                    {
                                        id: "t1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p11",
                                        cells: [
                                            "Attaque à l'épée",
                                            3,
                                            "Permet de faire une attaque puissante avec une épée.",
                                        ],
                                    },
                                ],
                                hasSumRow: true,
                                hasCheckboxColumn: true,
                            },
                            {
                                id: "s1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p12",
                                type: "skill",
                                order: 4,
                                values: [
                                    {
                                        id: "s1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p13",
                                        label: "Perception",
                                        defaultValue: "5+FORCE",
                                    },
                                    {
                                        id: "s1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p14",
                                        label: "Athlétisme",
                                        defaultValue: 3,
                                        defaultBonus: "2+DEXTÉRITÉ",
                                    },
                                ],
                                rollDice: "1d20+VALUE",
                                listBonusMalus: [
                                    {
                                        id: "b1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p15",
                                        name: "Avantage",
                                        operator: "+",
                                        value: "10",
                                    },
                                    {
                                        id: "b1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p16",
                                        name: "Désavantage",
                                        operator: "-",
                                        value: "5",
                                    },
                                ],
                            },
                            {
                                id: "c3a7b8d4-5e2f-4b9a-7963-1g7e2a6c8b85",
                                type: "inventory",
                                order: 5,
                                labels: {
                                    name: "Nom de l'objet",
                                    rarity: "Rareté",
                                    quantity: "Quantité",
                                    description: "Description",
                                    weight: "",
                                },
                                hasRarity: true,
                                hasWeight: false,
                                categories: [
                                    {
                                        id: "cat1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p17",
                                        icon: "sword",
                                        title: "Armes",
                                        values: [
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p18",
                                                title: "Type",
                                                type: "text",
                                                order: 1,
                                                defaultValue: "Épée longue",
                                                hasLabelVisible: true,
                                            },
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p19",
                                                title: "Dégâts",
                                                type: "text",
                                                order: 2,
                                                defaultValue: "1d6+2",
                                                hasLabelVisible: true,
                                            },
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p20",
                                                order: 3,
                                                type: "number",
                                                title: "Portée",
                                                unit: "m",
                                                defaultValue: 22,
                                                hasLabelVisible: false,
                                            },
                                        ],
                                    },
                                    {
                                        id: "cat1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p21",
                                        icon: "shield",
                                        title: "Armures",
                                        values: [
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p22",
                                                title: "Type",
                                                type: "text",
                                                order: 1,
                                                defaultValue: "Cuir",
                                                hasLabelVisible: true,
                                            },
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p23",
                                                title: "Protection",
                                                type: "text",
                                                order: 2,
                                                defaultValue: "1d6+2",
                                                hasLabelVisible: true,
                                            },
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p24",
                                                order: 3,
                                                type: "number",
                                                title: "Poids",
                                                unit: "kg",
                                                defaultValue: 10,
                                                hasLabelVisible: false,
                                            },
                                        ],
                                    },
                                    {
                                        id: "cat1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p25",
                                        icon: "potion",
                                        title: "Consommables",
                                        values: [
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p26",
                                                title: "Type",
                                                type: "text",
                                                order: 1,
                                                defaultValue: "Potion de soin",
                                                hasLabelVisible: true,
                                            },
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p27",
                                                title: "Effet",
                                                type: "text",
                                                order: 2,
                                                defaultValue:
                                                    "Soigne 1d8 points de vie",
                                                hasLabelVisible: true,
                                            },
                                            {
                                                id: "v1a2b3c4-d5e6-7f8g-9h0i-k1l2m3n4o5p28",
                                                order: 3,
                                                type: "point",
                                                title: "Nombre d'utilisations",
                                                defaultValue: 5,
                                                maxDefaultValue: 5,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                globalSettings: {
                    allowCustomFields: true,
                    strictMode: false,
                },
                createdAt: {
                    $date: "2025-10-19T14:50:04.269Z",
                },
                updatedAt: {
                    $date: "2025-10-19T14:50:04.269Z",
                },
            },
        ],
        rules: null,
        isPublished: false,
        userId: {
            $oid: "68f4fa9cf10272873e97d003",
        },
        contributors: ["68f4fa9cf10272873e97d003"],
        tags: ["d&d", "fantasy"],
        lang: "fr",
        createdAt: {
            $date: "2025-10-19T14:50:04.215Z",
        },
        updatedAt: {
            $date: "2025-10-19T14:50:04.215Z",
        },
    };

    return (
        <div className="flex flex-col gap-[52px]">
            <div className="flex items-center justify-center w-full gap-4 max-w-[606px] mx-auto">
                <StyledTabs
                    fullWidth
                    aria-label="Tabs form"
                    selectedKey={selectedSchemas}
                    size="lg"
                    renderContentOutside
                    disableCursorAnimation
                    borderRadius="xl"
                    onSelectionChange={setSelectedSchemas}
                    items={[
                        {
                            key: "players",
                            title: (
                                <>
                                    <i className="icon-users" /> Players
                                </>
                            ),
                        },
                        {
                            key: "creatures",
                            title: (
                                <>
                                    <i className="icon-user-monster" />{" "}
                                    Creatures
                                </>
                            ),
                        },
                        {
                            key: "holdings",
                            title: (
                                <>
                                    <i className="icon-building" /> Holdings
                                </>
                            ),
                        },
                        {
                            key: "dices",
                            title: (
                                <>
                                    <i className="icon-dice" /> Dices
                                </>
                            ),
                        },
                    ]}
                />
            </div>

            <div className="flex flex-row flex-wrap justify-center w-full gap-[58px]">
                <section className="flex flex-col items-center justify-center w-[calc(25%-58px)] min-w-[300px] bg-grey-dark min-h-dvh rounded-[20px]">
                    <span>PREVIEW FRONT</span>
                </section>

                <section className="flex flex-col items-center w-[606px] gap-5 min-h-dvh">
                    {/* <div className="flex items-center justify-center w-full gap-10 p-10 rounded-full bg-grey-dark/50">
                    <ClassicInput
                        label="Template Name"
                        value={template.name}
                        onChange={(e) =>
                            handleTemplateChange({ name: e.target.value })
                        }
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">
                            Primary Color
                        </label>
                        <div className="relative">
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) =>
                                    setPrimaryColor(e.target.value)
                                }
                                className="w-12 h-12 border-2 rounded-lg cursor-pointer border-white/20"
                            />
                        </div>
                    </div>
                    <ClassicInput
                        label="Description"
                        value={template.description}
                        onChange={(e) =>
                            handleTemplateChange({
                                description: e.target.value,
                            })w
                        }
                    />
                </div> */}
                    {/* Éditeur de schéma selon le type sélectionné */}
                    <div className="w-full max-w-[606px] mx-auto">
                        {selectedSchemas === "players" && (
                            <SchemaEditor
                                compact
                                initialSchema={{
                                    type: "player",
                                    outsideTabs: {
                                        labelName: "Nom",
                                        labelBiography: "Biographie",
                                        labelGenre: "Genre",
                                    },
                                    tabs: [],
                                }}
                                onSave={(schema) =>
                                    console.log("Schema saved:", schema)
                                }
                            />
                        )}
                        {selectedSchemas === "creatures" && (
                            <SchemaEditor
                                compact
                                initialSchema={{
                                    type: "creature",
                                    outsideTabs: {
                                        labelName: "Nom de la créature",
                                        labelBiography: "Description",
                                        labelGenre: "Type",
                                    },
                                    tabs: [],
                                }}
                                onSave={(schema) =>
                                    console.log("Schema saved:", schema)
                                }
                            />
                        )}
                        {selectedSchemas === "holdings" && (
                            <ContentSchema text="holdings" />
                        )}
                        {selectedSchemas === "dices" && (
                            <SchemaEditor
                                compact
                                initialSchema={{
                                    type: "dice",
                                    outsideTabs: {
                                        labelName: "Nom du dé",
                                        labelBiography: "Description",
                                        labelGenre: "Type",
                                    },
                                    tabs: [],
                                }}
                                onSave={(schema) =>
                                    console.log("Schema saved:", schema)
                                }
                            />
                        )}
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center w-[calc(25%-58px)] min-w-[300px] bg-grey-dark min-h-dvh rounded-[20px]">
                    <span>PREVIEW BACK</span>
                </section>
            </div>
        </div>
    );
}
