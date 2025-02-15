import React, { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Navlink from "./Navlink";

export default function Sidebar({ active, setActive }) {

  const handleSideBarToogle = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    const main = document.getElementById("main");
    const sidebar = document.getElementById("sidebar");
    const header = document.getElementById("header");

    if (active) {
      main.classList.add("bg-black");
      main.style.transform = "translateX(-65%)";
      main.style.transition = "transform 0.4s ease-in-out, background-color 0.6s ease-in-out";

      header.style.transform = "translateX(-65%)";
      header.style.transition = "transform 0.4s ease-in-out, background-color 0.6s ease-in-out";

      sidebar.style.transform = "translateX(-105%)";
      sidebar.style.transition = "transform 0.6s ease-in-out"

      // if (!timeoutId.current) {
      //   timeoutId.current = setTimeout(() => {
      //     main.style.backgroundColor = "rgba(0,0,0,0.7)";
      //   }, 600);
      // }
    } else {
      main.classList.remove("bg-black");
      main.style.transform = "translateX(0)";
      main.style.transition = "transform 0.4s ease-in-out, background-color 0.6s ease-in-out";

      header.style.transform = "translateX(0)";
      header.style.transition = "transform 0.4s ease-in-out, background-color 0.6s ease-in-out";

      sidebar.style.transform = "translateX(0)";
      sidebar.style.transition = "transform 0.6s ease-in-out";

      // if (!timeoutId.current) {
      //   timeoutId.current = setTimeout(() => {
      //     main.style.backgroundColor = "rgba(0,0,0,0)";
      //   }, 600);
      // }
    }

  }, [active]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setActive(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <div
        hidden={active}
        className="text-white text-3xl cursor-pointer fixed right-6 top-6 z-[70] sm:top-4 md:hidden"
        onClick={handleSideBarToogle}
      >
        <FaBars className="w-full" />
      </div>

      <div
        hidden={!active}
        className="text-white text-3xl md:hidden cursor-pointer fixed right-6 top-6 sm:top-4 z-[70]"
        onClick={handleSideBarToogle}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>

      <div id="sidebar" className="md:hidden fixed top-0 right-[-75%] w-[70vw] h-screen bg-black z-[69]">
        <div className="flex flex-col items-end absolute right-8 top-16 space-y-5 italic">
          <div className="text-white text-2xl cursor-pointer"
          onClick={handleSideBarToogle}>
            <Navlink to={"/"}>Accueil</Navlink>
          </div>
          <div className="text-white text-2xl cursor-pointer"
          onClick={handleSideBarToogle}>
            <Navlink to={"/nous"}>Nous</Navlink>
          </div>
          <div className="text-white text-2xl cursor-pointer"
          onClick={handleSideBarToogle}>
            <Navlink to={"/menu"}>Menu</Navlink>
          </div>
          <div className="text-white text-2xl cursor-pointer"
          onClick={handleSideBarToogle}>
            <Navlink to={"/contact"}>Contact</Navlink>
          </div>
          <div className="text-white text-2xl cursor-pointer"
          onClick={handleSideBarToogle}>
            <Navlink to={"/reserver"}>Réserver</Navlink>
          </div>
        </div>
      </div>
    </div>
  );
}
