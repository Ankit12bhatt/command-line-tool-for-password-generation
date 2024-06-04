export const generatePassword = ({ caseType, length, special, number }) => {
  let characters = "";

  if (caseType === "lowerCase") {
    characters += "abcdefghijklmnopqrstuvwxyz";
  } else if (caseType === "upperCase") {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else {
    characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (special === "yes") {
    characters += "[!@#$%^&*()-_=+]";
  }

  if (number === "yes") {
    characters += "0123456789";
  }

  let generatedPassword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    generatedPassword += characters.charAt(randomIndex);
  }

  return generatedPassword;
};
