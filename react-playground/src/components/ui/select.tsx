import * as React from "react";

/**
 * Native HTML select-based implementation
 * For a more advanced dropdown with portal, install @radix-ui/react-select
 */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const Select = ({ value, onValueChange, children, ...props }: SelectProps) => {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLSelectElement, SelectTriggerProps>(
  ({ className = "", children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    
    return (
      <select
        ref={ref}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
        value={context.value}
        onChange={(e) => context.onValueChange?.(e.target.value)}
        {...props}
      >
        {children}
      </select>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  // This is a no-op for native select, placeholder handled via option
  return null;
};

interface SelectContentProps {
  children: React.ReactNode;
}

const SelectContent = ({ children }: SelectContentProps) => {
  // Native select handles content inline
  return <>{children}</>;
};

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: React.ReactNode;
}

const SelectItem = ({ value, children, ...props }: SelectItemProps) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };

