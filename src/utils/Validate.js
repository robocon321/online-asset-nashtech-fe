export const validateFirstName = (value) => {  
  var re = /^[A-Z]$|^[A-Z][a-z]+$/;
  return re.test(value) ;
}

export const validateLastname = (value) => {
  var re = /^([A-Z]$|^[A-Z][a-z]{1,})([ ]([A-Z]$|[A-Z][a-z]{1,})){0,}$/;
  return re.test(value);
}

