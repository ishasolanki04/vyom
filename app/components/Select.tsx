import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: Option;
  onChange: (value: Option) => void;
  options: Option[];
  label?: string;
  className?: string;
}

export default function Select({ value, onChange, options, label, className = '' }: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        {label && (
          <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </Listbox.Label>
        )}
        <Listbox.Button className={`relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent sm:text-sm ${className}`}>
          <span className="block truncate">{value.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-[#E31B54] bg-opacity-10 text-[#E31B54]' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#E31B54]">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
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