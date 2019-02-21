// Pad our months for usage with Date string format
export function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

// Convert hours, minutes, seconds into single seconds value
export function timeStringToSeconds(time) {
  const [hours, minutes] = time
    .split(":")
    .slice(0, 2)
    .map(x => parseInt(x));

  return hours * 60 + minutes;
}

// Create list of long and short month names
class MonthList {
  constructor() {
    this.long = [
      null,
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
      "December"
    ];
    this.short = this.long.map(month => (month ? month.substring(0, 3) : null));
  }
}

export const monthList = new MonthList();

export const shortDaysOfWeek = [
  null,
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
