function isValidIsraeliID(id) {
    // Check if the ID is a 9-digit number
    if (!/^\d{9}$/.test(id)) {
      return false;
    }
  
    // Calculate the verification digit
    const sum = id.split('').map(Number).reduce((acc, digit, index) => {
      const multiplier = index % 2 === 0 ? 1 : 2;
      const product = digit * multiplier;
      return acc + (product > 9 ? product - 9 : product);
    }, 0);
  
    // Check if the sum is divisible by 10
    return sum % 10 === 0;
  }
  
export default isValidIsraeliID;
  