'use client';

import { useState } from 'react';
import { SheetSection } from '@/types/template';
import { ModuleDefinition } from '@/types/template/modules';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { GripVertical, Trash2, ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface SectionEditorProps {
  section: SheetSection;
  onUpdate: (updates: Partial<SheetSection>) => void;
  onDelete: () => void;
  onAddModule: (module: ModuleDefinition) => void;
}

function SortableModule({ 
  module, 
  index, 
  onDelete 
}: { 
  module: string; 
  index: number; 
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `module-${index}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white p-3 rounded border">
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:bg-gray-100 p-1 rounded"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <span className="text-sm font-medium flex-1">{module}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

interface SectionEditorProps {
  section: SheetSection;
  onUpdate: (updates: Partial<SheetSection>) => void;
  onDelete: () => void;
  onAddModule: (module: ModuleDefinition) => void;
}

export function SectionEditor({ section, onUpdate, onDelete, onAddModule }: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `section-drop-${section.id}`,
    data: { type: 'section', sectionId: section.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleModuleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(String(active.id).replace('module-', ''));
    const newIndex = parseInt(String(over.id).replace('module-', ''));

    if (oldIndex !== newIndex) {
      const newModules = [...section.modules];
      const [removed] = newModules.splice(oldIndex, 1);
      newModules.splice(newIndex, 0, removed);
      onUpdate({ modules: newModules });
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className={`${isOver ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-100 p-1 rounded"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>

          <div className="flex-1 grid grid-cols-2 gap-2">
            <div>
              <Input
                value={section.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Titre de la section"
                className="font-medium"
              />
            </div>
            <div>
              <Input
                value={section.icon}
                onChange={(e) => onUpdate({ icon: e.target.value })}
                placeholder="Icône (ex: star)"
                className="text-sm"
              />
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Section Content */}
        {isExpanded && (
          <div ref={setDroppableRef} className="space-y-3 min-h-[100px] p-3 bg-gray-50 rounded-lg">
            {section.modules.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Glissez des modules ici</p>
                <p className="text-xs mt-1">ou cliquez sur le bouton ci-dessous</p>
              </div>
            ) : (
              <DndContext 
                collisionDetection={closestCenter} 
                onDragEnd={handleModuleDragEnd}
              >
                <SortableContext
                  items={section.modules.map((_, i) => `module-${i}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {section.modules.map((module, index) => (
                      <SortableModule
                        key={`module-${index}`}
                        module={module}
                        index={index}
                        onDelete={() => {
                          const newModules = section.modules.filter((_, i) => i !== index);
                          onUpdate({ modules: newModules });
                        }}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
