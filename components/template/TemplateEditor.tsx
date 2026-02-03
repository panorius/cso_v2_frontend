"use client";

import { useState } from "react";
import {
    CharacterSheetTemplate,
    SheetSection,
    ThemeConfig,
} from "@/types/template";
import { ModuleDefinition, ModuleCategory } from "@/types/template/modules";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClassicTabs, StyledTabs } from "@/components/ui/tabs";
import { SectionEditor } from "./editor/SectionEditor";
import { ThemeEditor } from "./editor/ThemeEditor";
import { ModulePalette } from "./editor/ModulePalette";
import { TemplatePreview } from "./editor/TemplatePreview";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    Save,
    Eye,
    Plus,
    FileJson,
    Upload,
    User,
    Users,
    Dice1,
    Palette,
} from "lucide-react";
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
    const [activeTab, setActiveTab] = useState("sections");
    const [activeSchema, setActiveSchema] = useState<SchemaType>("players");
    const [primaryColor, setPrimaryColor] = useState("#f59e0b");
    const [selected, setSelected] = useState("sections");

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

    return (
        <div className="flex flex-col gap-[52px]">
            <div className="flex items-center justify-center w-full gap-4 max-w-[606px] mx-auto">
                <StyledTabs
                    fullWidth
                    aria-label="Tabs form"
                    selectedKey={selected}
                    size="lg"
                    renderContentOutside
                    disableCursorAnimation
                    borderRadius="xl"
                    onSelectionChange={setSelected}
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
                            })
                        }
                    />
                </div> */}
                    {/* Contenu affiché en dehors des tabs */}
                    <div className="w-full max-w-[606px] mx-auto">
                        {selected === "players" && (
                            <ContentSchema text="players" />
                        )}
                        {selected === "creatures" && (
                            <ContentSchema text="creatures" />
                        )}
                        {selected === "holdings" && (
                            <ContentSchema text="holdings" />
                        )}
                        {selected === "dices" && <ContentSchema text="dices" />}
                    </div>

                    <div className="flex flex-col items-center justify-center w-full bg-grey-dark/50 py-10 px-2.5 gap-5 rounded-[20px]">
                        <div className="">
                            <div className="flex gap-5">
                                <ClassicInput
                                    label="Nom label"
                                    value={template.description}
                                    onChange={(e) =>
                                        handleTemplateChange({
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <ClassicInput
                                    label="Biographie label"
                                    value={template.description}
                                    onChange={(e) =>
                                        handleTemplateChange({
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <ClassicInput
                                    label="Genre label"
                                    value={template.description}
                                    onChange={(e) =>
                                        handleTemplateChange({
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <ClassicTabs
                            fullWidth
                            aria-label="Navigation sections"
                            selectedKey={selected}
                            size="md"
                            onSelectionChange={setSelected}
                            variant="cso"
                        >
                            <Tab key="sections" title="Sections">
                                <div className="p-4 mt-4 bg-grey-dark/50 rounded-[20px]">
                                    <p className="text-white">
                                        Contenu des sections du schéma{" "}
                                        {activeSchema}
                                    </p>
                                </div>
                            </Tab>
                            <Tab key="modules" title="Modules">
                                <div className="p-4 mt-4 bg-grey-dark/50 rounded-[20px]">
                                    <p className="text-white">
                                        Contenu des modules
                                    </p>
                                </div>
                            </Tab>
                            <Tab key="settings" title="Paramètres">
                                <div className="p-4 mt-4 bg-grey-dark/50 rounded-[20px]">
                                    <p className="text-white">
                                        Paramètres avancés
                                    </p>
                                </div>
                            </Tab>
                        </ClassicTabs>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center w-[calc(25%-58px)] min-w-[300px] bg-grey-dark min-h-dvh rounded-[20px]">
                    <span>PREVIEW BACK</span>
                </section>
            </div>
        </div>
    );
}
