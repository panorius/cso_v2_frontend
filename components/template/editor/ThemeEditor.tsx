'use client';

import { ThemeConfig } from '@/types/template';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ThemeEditorProps {
  theme: ThemeConfig;
  onChange: (theme: ThemeConfig) => void;
}

export function ThemeEditor({ theme, onChange }: ThemeEditorProps) {
  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    onChange({ ...theme, [key]: value });
  };

  const colorFields: { key: keyof ThemeConfig; label: string; description: string }[] = [
    {
      key: 'primaryColor',
      label: 'Couleur Principale',
      description: 'Couleur principale du thème',
    },
    {
      key: 'accentColor',
      label: 'Couleur d\'Accentuation',
      description: 'Couleur pour les éléments importants',
    },
    {
      key: 'backgroundColor',
      label: 'Couleur de Fond',
      description: 'Couleur de fond de la fiche',
    },
    {
      key: 'headerColor',
      label: 'Couleur des En-têtes',
      description: 'Couleur des titres et en-têtes',
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Personnalisation du Thème</h3>
      <div className="space-y-6">
        {colorFields.map(({ key, label, description }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{label}</Label>
            <p className="text-sm text-gray-500">{description}</p>
            <div className="flex items-center gap-3">
              <Input
                id={key}
                type="color"
                value={theme[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
              <Input
                type="text"
                value={theme[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="flex-1 font-mono text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        ))}

        {/* Preview */}
        <div className="mt-8 pt-6 border-t">
          <Label>Aperçu des Couleurs</Label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {colorFields.map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <div
                  className="h-20 rounded-lg border-2"
                  style={{ backgroundColor: theme[key] }}
                />
                <p className="text-xs text-center text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Preview */}
        <div className="mt-6 pt-6 border-t">
          <Label>Aperçu de la Fiche</Label>
          <div
            className="mt-4 p-6 rounded-lg border-2"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <div
              className="p-4 rounded-lg mb-4"
              style={{ backgroundColor: theme.headerColor, color: 'white' }}
            >
              <h3 className="text-xl font-bold">Titre de Section</h3>
            </div>
            <div className="space-y-3">
              <div
                className="p-3 rounded"
                style={{ backgroundColor: theme.primaryColor, color: 'white' }}
              >
                <p className="text-sm">Élément avec couleur principale</p>
              </div>
              <div
                className="p-3 rounded"
                style={{ backgroundColor: theme.accentColor, color: 'white' }}
              >
                <p className="text-sm">Élément avec couleur d'accentuation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
