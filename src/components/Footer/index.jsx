import style from "./style.module.css";
import React from "react";
import { GithubLogo, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer>
      <div className={style.icons}>
        <a href="https://www.linkedin.com/in/-paulolemes/" target="blank">
          <LinkedinLogo size={32} />
        </a>
        <a href="https://github.com/paulo-lemes" target="blank">
          <GithubLogo size={32} />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=5511993385824&text&type=phone_number&app_absent=0"
          target="blank"
        >
          <WhatsappLogo size={32} />
        </a>
      </div>
      <div className={style.line}> </div>
      <div className={style.footerText}>
        <p className={style.footerText}>
          Projeto Módulo Front End React I - Programa Vem Ser Tech iFood - Ada
          Tech
        </p>
      </div>
    </footer>
  );
};

export default Footer;
