'use client';

import { useState, useCallback } from 'react';
import { CharacterSheetTemplate, SheetSection, ThemeConfig } from '@/types/template';
import { ModuleDefinition, ModuleCategory } from '@/types/template/modules';

export function useTemplateEditor(initialTemplate?: CharacterSheetTemplate) {
  const [template, setTemplate] = useState<CharacterSheetTemplate>(
    initialTemplate || {
      name: 'Nouveau Template',
      gameSystem: '',
      description: '',
      sections: [],
      theme: {
        primaryColor: '#3b82f6',
        accentColor: '#8b5cf6',
        backgroundColor: '#ffffff',
        headerColor: '#1e40af',
      },
    }
  );

  const [history, setHistory] = useState<CharacterSheetTemplate[]>([template]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateTemplate = useCallback((updates: Partial<CharacterSheetTemplate>) => {
    setTemplate((prev) => {
      const newTemplate = { ...prev, ...updates };
      setHistory((h) => [...h.slice(0, historyIndex + 1), newTemplate]);
      setHistoryIndex((i) => i + 1);
      return newTemplate;
    });
  }, [historyIndex]);

  const updateTheme = useCallback((theme: ThemeConfig) => {
    updateTemplate({ theme });
  }, [updateTemplate]);

  const addSection = useCallback(() => {
    const newSection: SheetSection = {
      id: `section-${Date.now()}`,
      title: 'Nouvelle Section',
      icon: 'star',
      modules: [],
    };
    updateTemplate({
      sections: [...template.sections, newSection],
    });
  }, [template.sections, updateTemplate]);

  const updateSection = useCallback(
    (sectionId: string, updates: Partial<SheetSection>) => {
      updateTemplate({
        sections: template.sections.map((section) =>
          section.id === sectionId ? { ...section, ...updates } : section
        ),
      });
    },
    [template.sections, updateTemplate]
  );

  const deleteSection = useCallback(
    (sectionId: string) => {
      updateTemplate({
        sections: template.sections.filter((section) => section.id !== sectionId),
      });
    },
    [template.sections, updateTemplate]
  );

  const reorderSections = useCallback(
    (oldIndex: number, newIndex: number) => {
      const newSections = [...template.sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);
      updateTemplate({ sections: newSections });
    },
    [template.sections, updateTemplate]
  );

  const addModule = useCallback(
    (sectionId: string, moduleCategory: ModuleCategory) => {
      updateTemplate({
        sections: template.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              modules: [...section.modules, moduleCategory],
            };
          }
          return section;
        }),
      });
    },
    [template.sections, updateTemplate]
  );

  const removeModule = useCallback(
    (sectionId: string, moduleIndex: number) => {
      updateTemplate({
        sections: template.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              modules: section.modules.filter((_, i) => i !== moduleIndex),
            };
          }
          return section;
        }),
      });
    },
    [template.sections, updateTemplate]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
      setTemplate(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      setTemplate(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const exportToJson = useCallback(() => {
    return JSON.stringify(template, null, 2);
  }, [template]);

  const importFromJson = useCallback((json: string) => {
    try {
      const imported = JSON.parse(json);
      setTemplate(imported);
      setHistory([imported]);
      setHistoryIndex(0);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      return false;
    }
  }, []);

  return {
    template,
    updateTemplate,
    updateTheme,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    addModule,
    removeModule,
    undo,
    redo,
    canUndo,
    canRedo,
    exportToJson,
    importFromJson,
  };
}
