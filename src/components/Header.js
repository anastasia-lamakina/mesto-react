import React from "react";
import logo from "../images/logo.svg";

const Header = () => (
  <header className="header">
    <img className="header__logo" src={logo} alt="Логотип сайта" />
  </header>
);

export default Header;
