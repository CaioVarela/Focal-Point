import React from "react";
import Image from "next/image";
import logoFull from "../../../public/logofull.svg";
import style from "./header.module.scss";

const Header = () => {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className={style.headerContainer}>
      <div className={style.logoHeaderContainer}>
        <Image
          src={logoFull}
          alt="FocalPoint Logo"
          className={style.headerLogoShape}
        />
      </div>
      <h1 className={style.headerTitle}>Bem-vindo de volta, Marcus</h1>
      <span className={style.headerSubtitle}>{today}</span>
    </header>
  );
};

export default Header;
