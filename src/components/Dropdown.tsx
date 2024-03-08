// // Dropdown.js

// import React, { useState } from 'react';
// import { IoMdArrowDropdown } from "react-icons/io";


// const Dropdown = ({ options, selectedOption, onOptionChange }:any) => {
  //   const [isOpen, setIsOpen] = useState(false);
  
  //   const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option:any) => {
  //     onOptionChange(option);
  //     setIsOpen(false);
  //   };
  
  //   return (
    //     <div className="relative inline-block text-left">
    //       <div>
    //         <button
    //           type="button"
    //           onClick={toggleDropdown}
//           className="inline-flex justify-center items-center w-full p-2 border rounded-md shadow-sm text-sm  bg-white text-shade8 font-Poppins font-semibold hover:text-tint7 hover:bg-shade4"
//         >
//           {selectedOption.label}
//           <IoMdArrowDropdown />
//         </button>
//       </div>

//       {isOpen && (
  //         <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
  //           <div className="py-1">
  //             {options.map((option:any) => (
    //               <button
    //                 key={option.value}
//                 onClick={() => handleOptionClick(option)}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;

'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ options, onSelect }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({'label':null});

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownClasses = classNames(
    'origin-top-right right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5',
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


