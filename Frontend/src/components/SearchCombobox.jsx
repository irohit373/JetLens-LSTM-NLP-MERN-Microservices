import { Combobox } from '@headlessui/react';
import { Virtuoso } from 'react-virtuoso';
import { ChevronUpDownIcon, GlobeAltIcon, CalendarIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline';


export const SearchCombobox = ({
  airports,
  selected,
  onSelect,
  query,
  onQueryChange,
  label,
  icon,
  loading = false
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
        {icon}
        {label}
      </label>
      <Combobox value={selected} onChange={onSelect}>
        {({ open }) => (
          <div className="relative">
            <Combobox.Input
              className="w-full pl-10 pr-4 py-3 border-none bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              displayValue={(airport) => 
                airport ? `${airport.city} (${airport.code})` : ''
              }
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="City or airport"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
            </Combobox.Button>
            
            {open && (
              <Combobox.Options 
                className="absolute z-20 mt-2 w-full max-h-[300px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5"
                static
              >
                {loading ? (
                  <div className="px-4 py-2 text-gray-500">Searching...</div>
                ) : airports.length === 0 ? (
                  <div className="px-4 py-2 text-gray-500">No airports found</div>
                ) : (
                  <Virtuoso
                    data={airports}
                    itemContent={(index, airport) => (
                      <Combobox.Option
                        key={airport.code}
                        value={airport}
                        className={({ active }) => 
                          `px-4 py-3 ${active ? 'bg-blue-50' : 'text-gray-900'} cursor-pointer transition-colors`
                        }
                      >
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-gray-900">
                            {airport.city}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-medium text-blue-600">
                              {airport.code}
                            </span>
                            <span className="text-sm text-gray-500 truncate">
                              {airport.name}
                            </span>
                          </div>
                        </div>
                      </Combobox.Option>
                    )}
                    totalCount={airports.length}
                    overscan={20}
                    style={{ height: '300px' }}
                  />
                )}
              </Combobox.Options>
            )}
          </div>
        )}
      </Combobox>
    </div>
  );
};