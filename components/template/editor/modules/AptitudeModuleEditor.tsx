'use client';

import { AptitudeModuleConfig, AptitudeValue } from '@/types/template/modules/aptitude';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface AptitudeModuleEditorProps {
  config: AptitudeModuleConfig;
  onChange: (config: AptitudeModuleConfig) => void;
}

export function AptitudeModuleEditor({ config, onChange }: AptitudeModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [...(config.values || []), { name: '', description: '' }],
    });
  };

  const updateValue = (index: number, updates: Partial<AptitudeValue>) => {
    const newValues = [...(config.values || [])];
    newValues[index] = { ...newValues[index], ...updates };
    onChange({ ...config, values: newValues });
  };

  const removeValue = (index: number) => {
    onChange({
      ...config,
      values: config.values?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={config.title || ''}
          onChange={(e) => onChange({ ...config, title: e.target.value })}
          placeholder="Titre du module"
        />
      </div>

      <div>
        <Label htmlFor="labelName">Label nom</Label>
        <Input
          id="labelName"
          value={config.labelName}
          onChange={(e) => onChange({ ...config, labelName: e.target.value })}
          placeholder="Nom"
        />
      </div>

      <div>
        <Label htmlFor="labelDescription">Label description</Label>
        <Input
          id="labelDescription"
          value={config.labelDescription}
          onChange={(e) => onChange({ ...config, labelDescription: e.target.value })}
          placeholder="Description"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Aptitudes pré-définies</Label>
          <Button type="button" size="sm" onClick={addValue}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {(config.values || []).map((value, index) => (
            <div key={index} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Aptitude {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeValue(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                value={value.name}
                onChange={(e) => updateValue(index, { name: e.target.value })}
                placeholder="Nom de l'aptitude"
              />
              <textarea
                value={value.description}
                onChange={(e) => updateValue(index, { description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="Description"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="required"
          checked={config.required ?? false}
          onCheckedChange={(checked: boolean) => onChange({ ...config, required: checked })}
        />
        <Label htmlFor="required" className="cursor-pointer">
          Obligatoire
        </Label>
      </div>
    </div>
  );
}
