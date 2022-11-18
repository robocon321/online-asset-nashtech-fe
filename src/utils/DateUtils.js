export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export const isGreater = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  return date1 > date2;
}

export const isDay = (dateString, day) => {
  const date = new Date(dateString);
  console.log(date.getDay());
  return date.getDay() === day;
}