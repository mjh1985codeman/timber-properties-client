import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComp({ unavailableDates, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Convert YYYY-MM-DD strings to local Date objects for the date picker.
  // Using the (year, month, day) constructor creates local midnight,
  // which is what react-datepicker compares against.
  const disabledDates = useMemo(
    () =>
      unavailableDates.map((dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      }),
    [unavailableDates]
  );

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <DatePicker
      onChange={handleSelectedDate}
      selected={selectedDate}
      excludeDates={disabledDates}
      minDate={new Date()}
      withPortal
      disabledKeyboardNavigation
    />
  );
}