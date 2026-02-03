// Simple wrappers pour compatibilité avec HeroUI
export { Button } from '@heroui/button';
export { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
export { Input } from '@heroui/input';
export { Tabs, Tab as TabsTrigger } from '@heroui/tabs';

// Composants personnalisés simples
export const Label = ({ htmlFor, children, className = '', ...props }: any) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);

export const TabsContent = ({ value, children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const TabsList = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const Checkbox = ({ checked, onCheckedChange, id, ...props }: any) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
    className="w-4 h-4 rounded border-gray-300"
    {...props}
  />
);

export const Select = ({ value, onValueChange, children, ...props }: any) => (
  <select
    value={value}
    onChange={(e) => onValueChange?.(e.target.value)}
    className="w-full px-3 py-2 border rounded-md"
    {...props}
  >
    {children}
  </select>
);

export const SelectTrigger = ({ children, ...props }: any) => <>{children}</>;
export const SelectValue = () => null;
export const SelectContent = ({ children, ...props }: any) => <>{children}</>;
export const SelectItem = ({ value, children, ...props }: any) => (
  <option value={value} {...props}>
    {children}
  </option>
);

export const Badge = ({ children, variant = 'default', className = '', ...props }: any) => {
  const variants: any = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-700',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
