import React, { useEffect, useState } from "react";
import libphonenumber from "google-libphonenumber";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export default function PhoneNumberModal({sendPhoneInfoToOAuth, closeModalFromChild}) {

  const [countriesList, setCountriesList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    telephone: "",
    countryCode: "BJ"
  })

  useEffect(() => {
    const fetchCountries = async () => {
      fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((countries) => {
        const sortedCountries = countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountriesList(sortedCountries)
      });
    } 

    fetchCountries();
  }, [])

    const validatePhoneNumber = (phoneNumber, countryCode) => { 
      try {
        const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
        return phoneUtil.isValidNumber(parsedNumber);
      } catch (error) {
        return false;
      }
    };
  
    const handleChange = (event) => {
      setFormData({
        ...formData, 
        [event.target.id === "modalCountryCode" ? "countryCode" : "telephone"] : event.target.value.replace(/\s+/g, "")
      });
    }

    const handleSubmit = async (e) => {
      setLoading(true);
  
      if(!validatePhoneNumber(formData.telephone, formData.countryCode)){
        setError("Numéro de télépone invalide");
        return;
      }

      if(formData.telephone && formData.countryCode){
        sendPhoneInfoToOAuth(formData);
      }
      
      else{
        return;
      }
      closeModalFromChild();
    }


  return (
    <div className="fixed flex items-center bg-black bg-opacity-60 justify-center mx-auto inset-0 z-50">

        <div className="p-5 flex flex-col bg-secondary sm:p-10 rounded-lg relative">

          <div onClick={closeModalFromChild} className="text-white text-lg absolute right-5 top-6 sm:right-10 sm:top-10 bg-black px-2 py-1 rounded-md flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </div>

            <h2 className="text-xl sm:text-2xl text-black text-center mb-5 w-[80%] mx-auto">Nous avons besoin de votre numéro de téléphone</h2>

            <div>

                <div className="w-full mb-8 flex gap-2">
                        <select className="text-black max-w-[12%]" id="modalCountryCode" onChange={handleChange} value={formData.countryCode}>
                            {countriesList.map((country) => (
                            <option value={country.cca2} key={country.cca2}>
                                {country.name.nativeName?.fra?.common || country.name.common}
                            </option>
                            ))}
                        </select>

                        <input onChange={handleChange} value={formData.telephone}
                        type="tel" id="modalTelephone" className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]" required placeholder="Téléphone *"/>
                </div>

                {error && <p className="mb-2 text-red-400">{error}</p>}

                <button 
                onClick={handleSubmit}
                type="button" className="w-full bg-primary text-white py-3 rounded-lg text-xl hover:opacity-85">
                   Se Connecter 
                </button>
                
            </div>
        </div>
    </div>
   )
}