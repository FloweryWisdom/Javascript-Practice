//Example of switch statement provided in class by the instructor

const testSwitch = (number) => {
    switch (true) {
      case number % 2 === 0:
        console.log("The number is even.");
        break;
  
      case number % 2 !== 0:
        console.log("The number is odd.");
        break;

      default: 
        console.log("Not a number.");
    }
  }
  
let result = testSwitch(10);

// Class assignment #1: Get the exact difference in days, months and years between the following two birthdates. (I added hours and seconds as well.)
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function countLeapDays(date1, date2) {
  let count = 0;
  for (let year = date1.getFullYear(); year <= date2.getFullYear(); year++) {
    if (isLeapYear(year)) {
      let leapDay = new Date(year, 1, 29); // February 29
      if (leapDay >= date1 && leapDay < date2) {
        count++;
      }
    }
  }
  return count;
}

function calculateDateDifference(date1, date2) {
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  let years = date2.getFullYear() - date1.getFullYear();
  let months = date2.getMonth() - date1.getMonth();
  let days = date2.getDate() - date1.getDate();
  let hours = date2.getHours() - date1.getHours();
  let minutes = date2.getMinutes() - date1.getMinutes();
  let seconds = date2.getSeconds() - date1.getSeconds();

  if (seconds < 0) { minutes--; seconds += 60; }
  if (minutes < 0) { hours--; minutes += 60; }
  if (hours < 0) { days--; hours += 24; }
  if (days < 0) {
    months--;
    let previousMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
    days += previousMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  let leapDays = countLeapDays(date1, date2);
  days += leapDays;

  // Adjust for edge cases explicitly
  if (date1.getMonth() === 1 && date1.getDate() === 29) { // If date1 is Feb 29
    if (!isLeapYear(date2.getFullYear()) && date2.getMonth() > 1) { // and date2 is after Feb in a non-leap year
      days--; // Adjust days since Feb 29 doesn't exist in a non-leap year
    }
  }

  return { years, months, days, hours, minutes, seconds };
}

// Example usage
const jorgeBirthdate = new Date("1955-08-26");
const sergioBirthdate = new Date("1993-10-27");
console.log(calculateDateDifference(jorgeBirthdate, sergioBirthdate));


// Class assignment #2: Create a function to obtain the day of the week a person was born given their birthdate.
function getDayOfWeek(birthdate) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[birthdate.getDay()];
}

console.log(getDayOfWeek(jorgeBirthdate));
console.log(4*8)
