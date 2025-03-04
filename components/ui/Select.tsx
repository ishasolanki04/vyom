import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function Select({ options, value, onChange, className = '', placeholder }: SelectProps) {
  const selectedOption = options.find(option => option.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative ${className}`}>
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-4 pr-10 text-left border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent hover:border-[#E31B54] transition-colors">
          <span className="block truncate text-gray-700">
            {selectedOption?.label || placeholder || 'Select an option'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active || selected ? 'bg-[#E31B54] bg-opacity-10 text-[#E31B54]' : 'text-gray-700'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#E31B54]">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
} 