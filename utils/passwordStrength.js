export const passwordStrength = (password) => {
  let strength = 0;

  // Check for mixed case
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    console.log("mixed strength checked")
    strength += 25;
  }

  // Check for numbers
  if (/\d/.test(password)) {
    console.log("number strength checked")
    strength += 25;
  }

  // Check for symbols
  if (/[!@#$%^&*()-_=+]/.test(password)) {
    console.log("symobl strength checked")
    strength += 25;
  }

  // Check for length
  if (password.length >= 8) {
    console.log("lengthb  strength checked")
    strength += 25;
  }

  return strength;
};
