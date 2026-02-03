import React, { useEffect, useState } from "react";
import patternStandard from "@/assets/images/patterns/standard.png";
import { Title } from "@/components/ui/Title";
import { Card, CardBody, Spinner } from "@heroui/react";
import TemplateList from "./TemplateList";
import { Template, TemplateService } from "@/lib/services/TemplateService";
import { useFilterPills } from "@/lib/hooks/useFilterPills";
import FilterPills from "@/components/ui/FilterPills";

export default function TemplatesSection() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

    const { pills, selectedFilters, filteredItems, toggleFilter } =
        useFilterPills({
            items: templates,
            extractTags: (template) => template.props.tags || [],
        });

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        setIsLoadingTemplates(true);
        try {
            const result = await TemplateService.getUserTemplates();
            if (result.success && result.data) {
                console.log(result.data);
                setTemplates(result.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des templates:", error);
        } finally {
            setIsLoadingTemplates(false);
        }
    };

    return (
        <section className="flex flex-col gap-10">
            <div className="flex items-center gap-3">
                <i className="icon-scroll" />
                <Title withDecorations level="h2" className="">
                    MODÈLES DE FICHES{" "}
                    <span className="ml-2 font-medium text-slate-500 opacity-70">
                        ({filteredItems.length}/999)
                    </span>
                </Title>
            </div>

            <FilterPills
                pills={pills}
                selectedFilters={selectedFilters}
                onToggle={toggleFilter}
            />

            {isLoadingTemplates ? (
                <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                </div>
            ) : templates.length === 0 ? (
                <Card>
                    <CardBody className="py-8 text-center">
                        <p className="text-default-500">
                            Vous n'avez pas encore de template. Créez-en un ou
                            utilisez un template public !
                        </p>
                    </CardBody>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <a
                            href="/template"
                            className="h-[300px] flex flex-col items-center justify-center gap-6 bg-[#f59e0b] rounded-xl cursor-pointer hover:bg-[#fbbf24] transition-all group shadow-xl"
                        >
                            <div className="flex items-center justify-center w-16 h-16 transition-transform border-4 border-white rounded-full group-hover:scale-110">
                                <i className="icon-plus" />
                            </div>
                            <span className="text-xl font-black tracking-widest text-white uppercase">
                                CRÉER
                            </span>
                        </a>
                        <TemplateList templates={filteredItems} />
                    </div>
                </>
            )}
        </section>
    );
}
