class Formatter {
    showUSDollar(value) {
        const usCost = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
        return usCost;
    }
  }
  
  const formatter = new Formatter();

  export default formatter;