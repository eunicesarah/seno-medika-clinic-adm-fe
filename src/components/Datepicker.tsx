// DatePicker.js
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineCalendarMonth } from "react-icons/md";


const CustomDatePicker = ({ selectedDate, onDateChange }:any) => {
  return (
      <div className="relative flex items-center w-full">
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="hh/bb/tttt"
          className="w-full h-12 pl-7 pr-72 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
        />

        <MdOutlineCalendarMonth 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none h-8 w-auto"/>
      </div>
  );
};

export default CustomDatePicker;
