export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const isGreater = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  return date1 > date2;
};

export const isDay = (dateString, day) => {
  const date = new Date(dateString);
  return date.getDay() === day;
};

export const convertDateByFormat = (dateString, format) => {
  //parse the input date
  const date = new Date(dateString);

  //extract the parts of the date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  //replace the month
  format = format.replace("MM", month.toString().padStart(2, "0"));

  //replace the year
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }

  //replace the day
  format = format.replace("dd", day.toString().padStart(2, "0"));

  return format;
};

export const convertDateByFormatEdit = (dateString, format) => {
  const day = dateString.substr(0, 2);
  const month = dateString.substr(3, 2);
  const year = dateString.substr(6, 4);
  // console.log(day);
  // console.log(month);
  // console.log(year);
  format = format.replace("MM", month.toString().padStart(2, "0"));
  // console.log(format);
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }
  // console.log(format);
  format = format.replace("dd", day.toString().padStart(2, "0"));
  // console.log(format);
  return format;
};
