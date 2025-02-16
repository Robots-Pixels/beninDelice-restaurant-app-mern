import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../../firebase.js";
import PhoneNumberModal from "./PhoneNumberModal.jsx";
import { useSelector, useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSucces } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

export default function OAuth({ children }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const openModal = () => {
    setModalData(null);
    setModalOpened(true);
  };

  useEffect(() => {
    const signInWithGoogle = async () => {
      
      if (modalData?.telephone && modalData?.countryCode) {
        dispatch(signInStart());
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const idToken = await result.user.getIdToken();

        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
            telephone: modalData?.telephone,
            countryCode: modalData?.countryCode,
          }),
        });

        const data = await res.json();

        if (data.success === false) {
          dispatch(signInFailure(data.message || "Erreur lors de la connexion."));
          return;
        }
        dispatch(signInSucces(data.user));
        navigate("/profile");
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
      }
    }

    signInWithGoogle();
  }, [modalData]
  );

  return (
    <div>
      {modalOpened && (
        <PhoneNumberModal
          sendPhoneInfoToOAuth={(data) => setModalData(data)}
          closeModalFromChild={() => setModalOpened(false)}
        />
      )}

      <button
        onClick={openModal}
        type="button"
        disabled={loading}
        className={`w-full bg-[#D3D3D3] text-black py-3 rounded-lg text-xl flex items-center justify-center gap-4 hover:opacity-85 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {children} <FaGoogle className="inline text-third" />
      </button>
    </div>
  );
}

