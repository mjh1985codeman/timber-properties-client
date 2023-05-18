class Validator {
    notEmpty(obj) {
      const objValues = Object.values(obj);
      const noEmptyValues = objValues.every(val => val !== "" && val !== null);
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

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    validateEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    validateName(name) {
      let re = /^[a-zA-Z" ".]{1,50}$/;
      return re.test(String(name));
    };

    validateMessage(message) {
      let re = /^.{1,1000}$/;
      return re.test(String(message));
    };
  }
  
  const validator = new Validator();

  export default validator;