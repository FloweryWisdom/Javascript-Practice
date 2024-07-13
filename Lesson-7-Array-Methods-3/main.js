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

// Jorge was born on 1985-09-20 at 11:25:30 
const jorgeBirthdate = new Date("1985-09-20T11:25:30");
// Sergio was born on 1993-10-17 at 15:45:15
const sergioBirthdate = new Date("1993-10-17T15:45:15");

function calculateDateDifference(date1, date2) {
  //Ensure date1 is the earlier date
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  //get their differences 
  let years = date2.getFullYear() - date1.getFullYear();
  let months = date2.getMonth() - date1.getMonth();
  let days = date2.getDate() - date1.getDate();
  let hours = date2.getHours() - date1.getHours();
  let minutes = date2.getMinutes() - date1.getMinutes();
  let seconds = date2.getSeconds() - date1.getSeconds();

  //Adjust seconds, minutes, hours, days and months if they are negative

  //adjust seconds 
  if (seconds < 0) {
    minutes--;
    seconds += 60;
  }

  //adjust minutes
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }

  //adjust hours
  if (hours < 0) {
    days--;
    hours =+ 24;
  }

  //adjust days 
  if (days < 0) {
    months--;
    //get the last day of the previous month
    const lastMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
    days =+ lastMonth.getDate();
  }

  //adjust months 
  if (months < 0) {
    years--;
    months=+ 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

console.log(calculateDateDifference(jorgeBirthdate, sergioBirthdate));


// Class assignment #2: Create a function to obtain the day of the week a person was born given their birthdate.
function getDayOfWeek(birthdate) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[birthdate.getDay()];
}

console.log(getDayOfWeek(jorgeBirthdate));


