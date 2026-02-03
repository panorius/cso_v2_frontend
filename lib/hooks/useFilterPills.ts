import { useMemo, useState } from "react";

export interface FilterPill {
    id: string;
    label: string;
    count: number;
}

export interface UseFilterPillsConfig<T> {
    items: T[];
    extractTags: (item: T) => string[];
    customPills?: FilterPill[];
    customFilter?: (item: T, selectedFilters: string[]) => boolean;
}

export function useFilterPills<T>({
    items,
    extractTags,
    customPills = [],
    customFilter,
}: UseFilterPillsConfig<T>) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    // Agréger tous les tags uniques
    const pills = useMemo(() => {
        const tagCounts = new Map<string, number>();

        items.forEach((item) => {
            const tags = extractTags(item);
            tags.forEach((tag) => {
                tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            });
        });

        const tagPills: FilterPill[] = Array.from(tagCounts.entries()).map(
            ([tag, count]) => ({
                id: tag,
                label: tag,
                count,
            })
        );

        return [...customPills, ...tagPills];
    }, [items, extractTags, customPills]);

    // Filtrer les items selon les filtres sélectionnés
    const filteredItems = useMemo(() => {
        if (selectedFilters.length === 0) {
            return items;
        }

        return items.filter((item) => {
            // Si un filtre custom est fourni, l'utiliser
            if (customFilter) {
                return customFilter(item, selectedFilters);
            }

            // Sinon, vérifier si l'item a au moins un tag sélectionné
            const tags = extractTags(item);
            return selectedFilters.some((filter) => tags.includes(filter));
        });
    }, [items, selectedFilters, extractTags, customFilter]);

    const toggleFilter = (pillId: string) => {
        setSelectedFilters((prev) =>
            prev.includes(pillId)
                ? prev.filter((id) => id !== pillId)
                : [...prev, pillId]
        );
    };

    const clearFilters = () => setSelectedFilters([]);

    const isFilterActive = (pillId: string) => selectedFilters.includes(pillId);

    return {
        pills,
        selectedFilters,
        filteredItems,
        toggleFilter,
        clearFilters,
        isFilterActive,
    };
}
