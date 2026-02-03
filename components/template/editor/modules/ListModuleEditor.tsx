'use client';

import { ListModuleConfig } from '@/types/template/modules/list';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface ListModuleEditorProps {
  config: ListModuleConfig;
  onChange: (config: ListModuleConfig) => void;
}

export function ListModuleEditor({ config, onChange }: ListModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [...config.values, ''],
    });
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...config.values];
    newValues[index] = value;
    onChange({ ...config, values: newValues });
  };

  const removeValue = (index: number) => {
    onChange({
      ...config,
      values: config.values.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={config.label || ''}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          placeholder="Nom de la liste"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Options</Label>
          <Button type="button" size="sm" onClick={addValue}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {config.values.map((value, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => updateValue(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeValue(index)}
                disabled={config.values.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="defaultValue">Valeur par défaut</Label>
        <Input
          id="defaultValue"
          value={
            Array.isArray(config.defaultValue)
              ? config.defaultValue.join(', ')
              : config.defaultValue || ''
          }
          onChange={(e) => onChange({ ...config, defaultValue: e.target.value })}
          placeholder="Valeur initiale"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isMultiple"
          checked={config.isMultiple ?? false}
          onCheckedChange={(checked: boolean) =>
            onChange({ ...config, isMultiple: checked })
          }
        />
        <Label htmlFor="isMultiple" className="cursor-pointer">
          Sélection multiple
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isVisible"
          checked={config.isVisible ?? true}
          onCheckedChange={(checked: boolean) =>
            onChange({ ...config, isVisible: checked })
          }
        />
        <Label htmlFor="isVisible" className="cursor-pointer">
          Visible
        </Label>
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
