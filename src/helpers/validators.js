class Validator {
    notEmpty(obj) {
      const objValues = Object.values(obj);
      console.log('validator obj: ', objValues);
      const noEmptyValues = objValues.every(val => val !== "" && val !== null);
      console.log('no Empty Values: ' , noEmptyValues);
      if (noEmptyValues) {
        return true;
      } else {
        return false;
      }
    };
  
    pwValidator(pw) {
      if (pw.length < 0) {
        return false;
      } else if (pw.length >= 8) {
        return true;
      }
    };
  }
  
  const validator = new Validator();

  export default validator;