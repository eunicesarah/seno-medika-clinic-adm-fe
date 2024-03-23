'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ options, onSelect }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>([]);

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownClasses = classNames(
    'origin-top-right right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute ',
    {
      'max-h-60 overflow-y-auto': options.length > 10,
    }
  );

  return (
    <div className="relative inline-block text-left w-full">
      <button
        type="button"
        className="inline-flex justify-between h-12 items-center w-full p-2 border rounded-md shadow-sm text-sm  bg-white text-shade8 font-Poppins font-semibold hover:text-tint7 hover:bg-shade4"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="dropdown-button"
      >
        {selectedOption ? selectedOption.label : 'Select an option'}
        <IoMdArrowDropdown />
      </button>

      {isOpen && (
        <div className={dropdownClasses} style={{ zIndex: 1000 }}>
          <div className="py-1 w-full">
            {options.map((option:any) => (
              <button
                key={option.value}
                className={classNames(
                  'flex flex-col w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  { 'bg-gray-100': option === selectedOption }
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;