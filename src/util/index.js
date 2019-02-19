export function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function timeStringToSeconds(time) {
  const [hours, minutes] = time
    .split(":")
    .slice(0, 2)
    .map(x => parseInt(x));

  return hours * 60 + minutes;
}
