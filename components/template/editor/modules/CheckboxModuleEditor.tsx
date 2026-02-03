'use client';

import { CheckboxModuleConfig } from '@/types/template/modules/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxModuleEditorProps {
  config: CheckboxModuleConfig;
  onChange: (config: CheckboxModuleConfig) => void;
}

export function CheckboxModuleEditor({ config, onChange }: CheckboxModuleEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={config.label || ''}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          placeholder="Texte de la case à cocher"
        />
      </div>

      <div>
        <Label htmlFor="defaultValue">Valeur par défaut</Label>
        <Input
          id="defaultValue"
          value={config.defaultValue || ''}
          onChange={(e) => onChange({ ...config, defaultValue: e.target.value })}
          placeholder="Valeur si cochée"
        />
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
