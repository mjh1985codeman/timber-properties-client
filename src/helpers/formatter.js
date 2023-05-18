class Formatter {
    showUSDollar(value) {
        const usCost = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
        return usCost;
    }

    dateFormat(date) {
        const parts = date.split('-');
        const formattedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
        return formattedDate;
    }
  }
  
  const formatter = new Formatter();

  export default formatter;