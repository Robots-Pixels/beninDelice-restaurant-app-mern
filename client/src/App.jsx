import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./users/Pages/Accueil";
import Nous from "./users/Pages/Nous";
import Contact from "./users/Pages/Contact";
import Menu from "./users/Pages/Menu";
import Reserver from "./users/Pages/Reserver";
import { useState } from "react";
import SignUp from "./users/Pages/SignUp";
import NotFound from "./users/Pages/NotFound";
import MainLayout from "./users/Components/MainLayout";
import AuthLayout from "./users/Components/AuthLayout";
import SignIn from "./users/Pages/SignIn";


function App() {
  const [active, setActive] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout active={active} setActive={setActive} />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/nous" element={<Nous />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reserver" element={<Reserver />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
