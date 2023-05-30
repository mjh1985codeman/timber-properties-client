import React, { useState, useEffect, useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComp({ unavailableDates, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const takenDatesRef = useRef([]);

  const timeZoneOffset = -5; // UTC-5 for Central Daylight Time

  // Use useMemo to compute the takenDates array only when the unavailableDates prop changes
  const takenDates = useMemo(
    () =>
      unavailableDates.map((date) => {
        const [year, month, day] = date.split("-");
        return new Date(
          Date.UTC(year, month - 1, day, 0, 0, 0) - timeZoneOffset * 60 * 60 * 1000
        );
      }),
    [unavailableDates, timeZoneOffset]
  );

  useEffect(() => {
    takenDatesRef.current = takenDates;
    setDisabledDates(takenDates);
  }, [takenDates]);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <>
      <DatePicker
        onChange={handleSelectedDate}
        selected={selectedDate}
        excludeDates={disabledDates}
        minDate={new Date()}
        withPortal
      />
    </>
  );
}