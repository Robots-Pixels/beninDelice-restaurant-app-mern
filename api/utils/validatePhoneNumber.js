import libphonenumber from "google-libphonenumber";
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const validatePhoneNumber = (phoneNumber, countryCode) => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
      return phoneUtil.isValidNumber(number); // Retourne true si le numéro est valide
    } catch (error) {
      console.error("Numéro invalide :", error);
      return false;
    }
};