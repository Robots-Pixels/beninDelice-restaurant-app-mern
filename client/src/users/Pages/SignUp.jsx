import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/signup-signin.jpg"  
import { useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { useSelector, useDispatch } from "react-redux";
import { signUpSucces, signUpFailure, signUpStart } from "../../redux/user/userSlice";

import libphonenumber from "google-libphonenumber";
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export default function SignUp() {
  const {loading, error} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
  nom: '',
  prenom: '',
  countryCode: 'BJ',
  telephone: '',
  email: '',
  password: ''
  });
  const [countriesList, setCountriesList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpStart());

    if(!validatePhoneNumber(formData.telephone, formData.countryCode)){
      dispatch(signUpFailure("Numéro de téléphone invalide !"))
      return;
    }

    try{
      const res = await fetch("/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            email: formData.email.replace(/\s+/g, "") || undefined,
            telephone: formData.countryCode === "BJ" ? ( formData.telephone.replace(/\s+/g, "").startsWith("01") ? formData.telephone.replace(/\s+/g, "") : `01${formData.telephone.replace(/\s+/g, "")}`) : formData.telephone.replace(/\s+/g, "")
          })
        }
      );

      const data = await res.json();

      if(data.success === false){
          dispatch(signUpFailure(data.message))
          return;
      }

      dispatch(signUpSucces());
      navigate("/signin");
    }
    catch(error){
      dispatch(signUpFailure(error.message))
    }

  }

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
      [event.target.id] : event.target.value
    })
  }

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

  return (
    <main className="min-h-[100vh]">
      <div className="flex flex-col justify-center sm:flex-row sm:px-14 sm:py-10 sm:bg-[#7c3914]">
        <section className="hidden sm:block sm:w-[50%] shadow-sm shadow-black rounded-l-lg" style={{backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center"}}>
        </section>

        <section className="py-6 px-6 md:px-12 sm:w-[50%] bg-white sm:rounded-r-lg">
          <div className="flex flex-col items-start ">
            <Link to={"/"}>
              <h1 className="text-5xl font-island text-third mb-4">
                BeninDelice
              </h1>
            </Link>

            <h2 className="text-xl mb-2 font-bold">
                Créez un compte gratuit
            </h2>

            <h3 className="text-sm opacity-70 mb-5">
                Et bénéficiez d'offres exclusives
            </h3>

            <form className="w-full" onSubmit={handleSubmit}>

                <div className="w-full mb-8">
                    <input onChange={handleChange} value={formData.prenom}
                     type="text" id="prenom" className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]" required placeholder="Prénom *"/>
                </div>

                <div className="w-full mb-8">
                    <input onChange={handleChange} value={formData.nom}
                     type="text" id="nom" className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]" placeholder="Nom"/>
                </div>

                
                <div className="w-full mb-8 flex gap-2">
                    <select className="text-black w-[8rem] rounded-md px-1 border-black border-[1px]" id="countryCode" onChange={handleChange} value={formData.countryCode}>
                        {countriesList.map((country) => (
                          <option value={country.cca2} key={country.cca2}>
                            {country.name.nativeName?.fra?.common || country.name.common}
                          </option>
                        ))}
                    </select>
                    <input onChange={handleChange} value={formData.telephone}
                     type="tel" id="telephone" className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]" required placeholder="Téléphone *"/>
                </div>
                
                <div className="w-full mb-8"> 
                    <input onChange={handleChange} value={formData.email}
                     type="email" id="email" className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]" placeholder="Email"/>
                </div>
                
                <div className="w-full mb-8">
                    <input onChange={handleChange} value={formData.password}
                     type="password" id="password" className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]" required placeholder="Créez un mot de passe *"/>
                </div>

                {error && <p className="mb-4 text-red-400">{error}</p>}
                
                <button disabled={loading} className="w-full bg-[#7c3914] text-white py-3 rounded-lg text-xl hover:opacity-85">
                    S'inscrire
                </button>


                <p className="text-center">ou</p>


                <OAuth>
                  S'inscrire avec Google
                </OAuth>
                
            </form>

            <div className="text-center mt-4 flex flex-col mx-auto">
                Vous avez deja un compte ? 
                <br />
                <Link to={"/signin"} className="text-primary font-bold">Connectez-vous</Link>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
