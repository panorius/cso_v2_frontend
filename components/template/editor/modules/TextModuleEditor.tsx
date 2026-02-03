'use client';

import { TextModuleConfig } from '@/types/template/modules/text';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface TextModuleEditorProps {
  config: TextModuleConfig;
  onChange: (config: TextModuleConfig) => void;
}

export function TextModuleEditor({ config, onChange }: TextModuleEditorProps) {
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
        <Input
          id="defaultValue"
          value={config.defaultValue || ''}
          onChange={(e) => onChange({ ...config, defaultValue: e.target.value })}
          placeholder="Valeur initiale"
        />
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
