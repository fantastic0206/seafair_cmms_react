import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
// export const startDate = new Date(new Date().setMonth(1, 1));
// export const endDate = new Date();
export const startDate = new Date('2019-01-01');
export const endDate = new Date('2019-12-31');

export function getHeatMapData() {
  let dataPoints = {};
  let currDate = startDate;
  while (isBefore(currDate, endDate) || isEqual(currDate, endDate)) {
    const count = pickRandomNumber(10, 1000);
    dataPoints[currDate.getTime() / 1000] = count;
    currDate = addDays(currDate, 1);
  }
  return dataPoints;
}

function pickRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
