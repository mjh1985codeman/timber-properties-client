import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComp({unavailableDates, onDateSelect}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [disabledDates, setDisabledDates] = useState([]);

    // Set the time zone offset
    const timeZoneOffset = -5; // UTC-5 for Central Daylight Time

    // Convert each date in unavailableDates to the disabledDates time zone
    const takenDates = unavailableDates.map(date => {
    // Split the date string into year, month, and day components
    const [year, month, day] = date.split('-');
    // Create a new date object with the same year, month, and day,
    // and a time of 0 hours, 0 minutes, and 0 seconds using the specified timeZoneOffset.
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - (timeZoneOffset * 60 * 60 * 1000));
  });
  
    useEffect(() => {
      setDisabledDates(takenDates);
    },[takenDates]);

    const handleSelectedDate = (date) => {
      setSelectedDate(date);
      onDateSelect(date);
    }
  

  return (
    <>
    <DatePicker
    onChange={handleSelectedDate}
    selected={selectedDate}
    excludeDates={disabledDates}
    minDate={new Date()}
    //{...rest}
  />
  </>
  )
}