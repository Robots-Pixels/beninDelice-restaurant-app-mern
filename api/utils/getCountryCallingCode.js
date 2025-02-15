import libphonenumber from "google-libphonenumber";
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const getCountryCallingCode = (countryCode) => {
    try{
        return "+" + phoneUtil.getCountryCodeForRegion(countryCode.toUpperCase());
    }
    catch(error){
        console.log("Erreur lors de la récupération du code de pays", error);
    }
}