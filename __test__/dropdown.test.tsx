import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '@/app/components/dropdown';

describe('Dropdown', () => {
  it('should allow selecting options', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ];

    const onSelect = jest.fn(); // Creating a mock onSelect function

    const { getByText, getByTestId } = render(
      <Dropdown options={options} onSelect={onSelect} /> // Passing onSelect function as prop
    );

    fireEvent.click(getByTestId('dropdown-button'));
    console.log(document.body.innerHTML); // Logging the rendered HTML to see what's being rendered
    fireEvent.click(getByText('Option 2'));

    console.log(document.body.innerHTML); // Logging the rendered HTML again after the click event

    // expect(getByText('Option 2')).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledWith(options[1]); // Verifying onSelect function was called with correct option
  });
});
