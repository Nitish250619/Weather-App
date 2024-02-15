const { useState } = require("react");

function useDateBuilder(func) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");

  useState(() => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    setDay(days[func.getDay()]);
    setMonth(months[func.getMonth()]);
    setDate(func.getDate());
    setYear(func.getFullYear());
  }, []);

  return `${day}, ${date} ${month} ${year}`;
}

export default useDateBuilder;
