
const timesBase = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const timesAppend = [":00", ":15", ":30", ":45"];
let timesBaseCounter = 0;
let timesAppendCounter = 0;

const timesArr = Array.from({length: 96}, (_, index) => {
  let timesJoin = "";

  timesJoin += timesBase[timesBaseCounter];

  timesJoin += timesAppend[timesAppendCounter];
  timesAppendCounter++;

  if (timesAppendCounter === 4) {
    timesAppendCounter = 0;
    timesBaseCounter++;
  }

  if (index < 48) timesJoin += "am";
  else timesJoin += "pm";

  return timesJoin;
});

const roundUpTo = roundTo => x => Math.ceil(x / roundTo) * roundTo;

const roundUpTo15Minutes = roundUpTo(1000 * 60 * 15);

const getDefaultStartTime = () => {
  let temp = roundUpTo15Minutes(new Date());
  let d = new Date(temp);

  return `${timesBase[d.getHours()]}:${d.getMinutes() < 1 ? "00" : d.getMinutes()}${d.getHours() < 13 ? "am" : "pm"}`
}

const getDefaultEndTime = () => {
  let temp = getDefaultStartTime();
  let hourCheck = temp.split(":");

  hourCheck[0] = parseInt(hourCheck[0]);

  if (hourCheck[0] < 12) hourCheck[0]++;
  else hourCheck[0] = 1;

  return `${hourCheck.join(":")}`
}

export { timesArr, getDefaultStartTime, getDefaultEndTime };