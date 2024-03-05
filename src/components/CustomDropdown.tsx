// CustomDropdown.js

import React, { useState } from 'react';
import Select from 'react-select';

const CustomDropdown = ({ options, selectedOption, onChange }:any) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (input:any) => {
    setInputValue(input);
  };

  const handleOptionChange = (selectedOption:any) => {
    setInputValue(''); // Clear the input value when an option is selected
    onChange(selectedOption);
  };

  // Add the input value as a custom option
  const customOption = inputValue && { label: inputValue, value: inputValue };

  return (
    <Select
      options={[...options, customOption].filter(Boolean)} // Filter out undefined values
      value={selectedOption}
      onChange={handleOptionChange}
      onInputChange={handleInputChange}
      isSearchable
      placeholder="Select or type an option..."
      styles={{
        control: (provided:any) => ({
          ...provided,
          borderRadius: '0.375rem',
          borderColor: '#e2e8f0',
        }),
        menu: (provided:any) => ({
          ...provided,
          borderRadius: '0.375rem',
        }),
      }}
    />
  );
};

export default CustomDropdown;