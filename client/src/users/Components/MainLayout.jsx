import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";

export default function MainLayout({active, setActive}) {


  return (
    <>
      <div id="header" className="sticky top-0 z-50">
        <Header />
      </div>

      <div
        id="main"
        className={`transition-transform duration-400 ease-in-out overflow-x-hidden ${
          active ? "bg-black bg-opacity-70" : "bg-transparent"
        }`}
        style={{
          transition:
            "transform 0.4s ease-in-out, background-color 0.6s ease-in-out",
        }}
      >
        <Outlet />

        <Footer />
      </div>

      <Sidebar active={active} setActive={setActive} />
    </>
  );
}
