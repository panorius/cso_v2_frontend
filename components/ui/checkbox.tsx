import React from 'react';

export const Checkbox = ({ checked, onCheckedChange, id, className = '', ...props }: any) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
    className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer ${className}`}
    {...props}
  />
);

// Re-export from the checkbox folder
export { ClassicCheckbox } from './checkbox/ClassicCheckbox';
