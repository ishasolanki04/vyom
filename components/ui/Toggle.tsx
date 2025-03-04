interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export default function Toggle({ checked, onChange, label, className = '' }: ToggleProps) {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E31B54] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31B54]"></div>
      {label && <span className="ml-2 text-sm text-gray-600">{label}</span>}
    </label>
  );
} 