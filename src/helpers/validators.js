class Validator {
    notEmpty(obj) {
      const objValues = Object.values(obj);
      console.log('validator obj: ', obj);
      if (objValues.every(value => value)) {
        return true;
      } else {
        return false;
      }
    }
  
    pwValidator(pw) {
      if (pw.length < 0) {
        return false;
      } else if (pw.length >= 8) {
        return true;
      }
    }
  }
  
  const validator = new Validator();

  export default validator;