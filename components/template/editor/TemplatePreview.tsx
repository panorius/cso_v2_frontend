"use client";

import { CharacterSheetTemplate } from "@/types/template";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TemplatePreviewProps {
    template: CharacterSheetTemplate;
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
    return (
        <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
                {/* Header */}
                <div
                    className="p-8 text-white"
                    style={{ backgroundColor: template.theme.headerColor }}
                >
                    <h1 className="mb-2 text-3xl font-bold">{template.name}</h1>
                    <p className="text-lg opacity-90">{template.gameSystem}</p>
                    {template.description && (
                        <p className="mt-4 opacity-80">
                            {template.description}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div
                    className="p-8"
                    style={{ backgroundColor: template.theme.backgroundColor }}
                >
                    {template.sections.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">
                            <p>Aucune section définie</p>
                            <p className="mt-2 text-sm">
                                Ajoutez des sections pour voir l'aperçu
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {template.sections.map((section) => (
                                <div key={section.id} className="space-y-4">
                                    {/* Section Header */}
                                    <div
                                        className="flex items-center gap-3 p-4 rounded-lg"
                                        style={{
                                            backgroundColor:
                                                template.theme.primaryColor,
                                        }}
                                    >
                                        <span className="text-2xl">
                                            {section.icon}
                                        </span>
                                        <h2 className="text-xl font-semibold text-white">
                                            {section.title}
                                        </h2>
                                        <Badge
                                            variant="flat"
                                            className="ml-auto"
                                        >
                                            {section.modules.length} modules
                                        </Badge>
                                    </div>

                                    {/* Section Content */}
                                    <div className="pl-4 space-y-3">
                                        {section.modules.length === 0 ? (
                                            <p className="py-4 text-sm italic text-gray-400">
                                                Section vide - Ajoutez des
                                                modules
                                            </p>
                                        ) : (
                                            section.modules.map(
                                                (module, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center p-4 bg-white border rounded-lg"
                                                    >
                                                        <div
                                                            className="w-3 h-3 mr-3 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    template
                                                                        .theme
                                                                        .accentColor,
                                                            }}
                                                        />
                                                        <span className="font-medium">
                                                            {module}
                                                        </span>
                                                        <Badge
                                                            variant="flat"
                                                            className="ml-auto text-xs"
                                                        >
                                                            Module {module}
                                                        </Badge>
                                                    </div>
                                                ),
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-4 border-t bg-grey-darken">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{template.sections.length} sections</span>
                        <span>
                            {template.sections.reduce(
                                (acc, section) => acc + section.modules.length,
                                0,
                            )}{" "}
                            modules au total
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
