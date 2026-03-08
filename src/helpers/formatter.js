class Formatter {
    showUSDollar(value) {
        const usCost = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
        return usCost;
    }

    // Formats a YYYY-MM-DD string to a localized display string (e.g. "03/15/2024")
    dateFormat(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day).toLocaleDateString('en-US');
    }

    // Formats a GraphQL timestamp (epoch ms string) to a display date.
    // Uses UTC so the stored calendar date is always shown correctly.
    displayDate(timestamp) {
        return new Date(parseInt(timestamp)).toLocaleDateString('en-US', { timeZone: 'UTC' });
    }

    // Converts a local Date object to a YYYY-MM-DD string using local date parts,
    // avoiding the timezone shift that toISOString() can cause.
    toDateString(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
  }
  
  const formatter = new Formatter();

  export default formatter;