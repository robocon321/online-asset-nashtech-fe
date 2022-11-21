export const validateFirstName = (value) => {  
  var re = /^[A-Z]$|^[A-Z][a-z]+$/;
  return re.test(value) ;
}

export const validateLastname = (value) => {
  var re = /^([A-Z]$|^[A-Z][a-z]{1,})([ ]([A-Z]$|[A-Z][a-z]{1,})){0,}$/;
  return re.test(value);
}

export const validatePassword = (value) => {
  var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return re.test(value);
}