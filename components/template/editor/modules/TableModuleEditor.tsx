'use client';

import { TableModuleConfig, TableRow } from '@/types/template/modules/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface TableModuleEditorProps {
  config: TableModuleConfig;
  onChange: (config: TableModuleConfig) => void;
}

export function TableModuleEditor({ config, onChange }: TableModuleEditorProps) {
  const addHeader = () => {
    onChange({
      ...config,
      headers: [...config.headers, 'Nouvelle colonne'],
      rows: config.rows.map((row) => ({
        cells: [...row.cells, ''] as string[],
      })),
    });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...config.headers];
    newHeaders[index] = value;
    onChange({ ...config, headers: newHeaders });
  };

  const removeHeader = (index: number) => {
    onChange({
      ...config,
      headers: config.headers.filter((_, i) => i !== index),
      rows: config.rows.map((row) => ({
        cells: row.cells.filter((_, i) => i !== index) as string[],
      })),
    });
  };

  const addRow = () => {
    onChange({
      ...config,
      rows: [
        ...config.rows,
        { cells: config.headers.map(() => '') },
      ],
    });
  };

  const updateCell = (rowIndex: number, cellIndex: number, value: string | number | boolean) => {
    const newRows = [...config.rows];
    const newCells = [...newRows[rowIndex].cells];
    newCells[cellIndex] = value;
    newRows[rowIndex] = { cells: newCells as string[] | number[] | boolean[] };
    onChange({ ...config, rows: newRows });
  };

  const removeRow = (index: number) => {
    onChange({
      ...config,
      rows: config.rows.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Titre du tableau</Label>
        <Input
          id="title"
          value={config.title || ''}
          onChange={(e) => onChange({ ...config, title: e.target.value })}
          placeholder="Titre"
        />
      </div>

      <div>
        <Label htmlFor="rollDiceFormula">Formule de dé</Label>
        <Input
          id="rollDiceFormula"
          value={config.rollDiceFormula || ''}
          onChange={(e) => onChange({ ...config, rollDiceFormula: e.target.value })}
          placeholder="Ex: 1d20"
        />
      </div>

      {/* Headers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Colonnes</Label>
          <Button type="button" size="sm" onClick={addHeader}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter colonne
          </Button>
        </div>
        <div className="space-y-2">
          {config.headers.map((header, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={header}
                onChange={(e) => updateHeader(index, e.target.value)}
                placeholder={`Colonne ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeHeader(index)}
                disabled={config.headers.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Lignes</Label>
          <Button type="button" size="sm" onClick={addRow}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter ligne
          </Button>
        </div>
        <div className="space-y-3">
          {config.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ligne {rowIndex + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRow(rowIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${config.headers.length}, 1fr)` }}>
                {row.cells.map((cell, cellIndex) => (
                  <Input
                    key={cellIndex}
                    value={cell as string}
                    onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
                    placeholder={config.headers[cellIndex]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasSumRow"
          checked={config.hasSumRow ?? false}
          onCheckedChange={(checked: boolean) => onChange({ ...config, hasSumRow: checked })}
        />
        <Label htmlFor="hasSumRow" className="cursor-pointer">
          Ligne de somme
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasCheckboxColumn"
          checked={config.hasCheckboxColumn ?? false}
          onCheckedChange={(checked: boolean) =>
            onChange({ ...config, hasCheckboxColumn: checked })
          }
        />
        <Label htmlFor="hasCheckboxColumn" className="cursor-pointer">
          Colonne de cases à cocher
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
