import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/signup-signin.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSucces,
  signInFailure,
} from "../../redux/user/userSlice.js";
import OAuth from "../Components/OAuth.jsx";
import libphonenumber from "google-libphonenumber";

export default function SignIn() {
  const [formData, setFormData] = useState({
    identifiant: "",
    password: "",
    countryCode: "BJ",
  });

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [connexionMethod, setConnexionMethod] = useState("telephone");
  const [countriesList, setCountriesList] = useState([]);
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

  
  const handleChange = (event) => {

    if(event.target.id === "email" || event.target.id === "telephone"){
      setFormData({
        ...formData,
        identifiant: event.target.value
      })
    }

    else{
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleConnexionMethod = () => {
    connexionMethod === "telephone"
      ? setConnexionMethod("email")
      : setConnexionMethod("telephone");
  };

  const validatePhoneNumber = (phoneNumber, countryCode) => {
    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (error) {
      return false;
    }
  };

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());


    try {

      if(!formData.identifiant.includes("@")){
        if(!validatePhoneNumber(formData.identifiant, formData.countryCode)){
          dispatch(signInFailure("Numéro de téléphone invalide !"));
          return;
      }
      }
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          identifiant: formData.identifiant.replace(/\s+/g, "").includes("@") ? formData.identifiant.replace(/\s+/g, "") : (formData.countryCode === "BJ" ? (formData.identifiant.replace(/\s+/g, "").startsWith("01") ? formData.identifiant.replace(/\s+/g, "") : `01${formData.identifiant.replace(/\s+/g, "")}`) : formData.identifiant.replace(/\s+/g, ""))
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSucces(data.user));
      navigate("/profile");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <main className="min-h-[100vh]">
      <div className="flex flex-col justify-center sm:flex-row sm:px-14 sm:py-10 sm:bg-[#7c3914]">
        <section
          className="hidden sm:block sm:w-[50%] shadow-sm shadow-black rounded-l-lg"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></section>

        <section className="py-6 px-6 md:px-12 sm:w-[50%] bg-white sm:rounded-r-lg">
          <div className="flex flex-col items-start ">
            <Link to={"/"}>
              <h1 className="text-5xl font-island text-third mb-4">
                BeninDelice
              </h1>
            </Link>

            <h2 className="text-xl mb-2 font-bold">Heureux de vous revoir</h2>

            <h3 className="text-sm opacity-70 mb-5">
              Et bénéficiez d'offres exclusives
            </h3>

            <form className="w-full" onSubmit={handleSubmit}>
              <h2 className="text-[#555] mb-2">
                Choisissez votre méthode de connexion (email ou téléphone)
              </h2>

              <select
                id="connexionMethod"
                className="p-1 mb-6 rounded-md border-[1px] border-black"
                onChange={handleConnexionMethod}
              >
                <option value="telephone">Téléphone</option>
                <option value="email">Email</option>
              </select>

              <div className="flex">
                <div
                  className={`w-full flex-1 mb-8 ${
                    connexionMethod === "email" ? "hidden" : ""
                  }`}
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-2">
                    <select className="text-black rounded-md p-1 border-black border-[1px] sm:w-[50%]" id="countryCode" onChange={handleChange} value={formData.countryCode}>
                          {countriesList.map((country) => (
                            <option value={country.cca2} key={country.cca2}>
                              {country.name.nativeName?.fra?.common || country.name.common}
                            </option>
                          ))}
                    </select>

                    <input
                      onChange={handleChange}
                      value={formData.telephone}
                      required = {connexionMethod === "telephone"}
                      type="tel"
                      id="telephone"
                      className="outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555] sm:w-[50%]"
                      placeholder="Numéro de téléphone *"
                    />
                  </div>
                  
                </div>

                <div
                  className={`w-full flex-1 mb-8 ${
                    connexionMethod === "telephone" ? "hidden" : ""
                  }`}
                >
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    type="email"
                    required = {connexionMethod === "email"}
                    id="email"
                    className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]"
                    placeholder="Email *"
                  />
                </div>
              </div>

              <div className="w-full mb-8">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                  id="password"
                  className="w-full outline-none border-b-[1px] border-[#a3a3a3] py-1 bg-transparent placeholder:text-[#555]"
                  required
                  placeholder="Mot de passe *"
                />
              </div>

              {error && <p className="mb-2 text-red-400">{error}</p>}

              <button
                disabled={loading}
                className="w-full bg-[#7c3914] text-white py-3 rounded-lg text-xl hover:opacity-85"
              >
                Connexion
              </button>

              <p className="text-center">ou</p>

              <OAuth>Connexion avec Google</OAuth>
            </form>

            <div className="text-center mt-4 flex flex-col mx-auto">
              Vous n'avez pas encore un compte ?
              <br />
              <Link to={"/signup"} className="text-primary font-bold">
                Inscrivez-vous
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
