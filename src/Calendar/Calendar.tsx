import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="flex justify-center p-8">
      <Calendar
        onChange={setValue}
        value={value}
        locale="en-US"
        // calendarType="US"
        nextLabel=">"
        prevLabel="<"
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(_, date) =>
          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][date.getDay()]
        }
      />
    </div>
  );
}

export default MyCalendar;
