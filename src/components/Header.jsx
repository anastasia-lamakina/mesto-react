import React from "react";
import Logo from "../images/logo.svg";

const Header = () => (
  <header className="header">
    <img className="header__logo" src={Logo} alt="Логотип сайта" />
  </header>
);

export default Header;
