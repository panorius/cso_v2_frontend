'use client';

import { TextareaModuleConfig } from '@/types/template/modules/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface TextareaModuleEditorProps {
  config: TextareaModuleConfig;
  onChange: (config: TextareaModuleConfig) => void;
}

export function TextareaModuleEditor({ config, onChange }: TextareaModuleEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={config.label || ''}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          placeholder="Nom du champ"
        />
      </div>

      <div>
        <Label htmlFor="defaultValue">Valeur par défaut</Label>
        <textarea
          id="defaultValue"
          value={config.defaultValue || ''}
          onChange={(e) => onChange({ ...config, defaultValue: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Texte initial"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isReadOnly"
          checked={config.isReadOnly ?? false}
          onCheckedChange={(checked: boolean) =>
            onChange({ ...config, isReadOnly: checked })
          }
        />
        <Label htmlFor="isReadOnly" className="cursor-pointer">
          Lecture seule
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
