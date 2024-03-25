import style from "./style.module.css";
import { useEffect, useRef } from "react";

const Dialog = ({ closeDialog, textDialog, confirm, handleClick }) => {
  const dialogRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (!dialogRef.current) return;
    if (!dialogRef.current.contains(event.target)) closeDialog();
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  let Btn = (
    <button onClick={closeDialog} className={style.close}>
      Fechar
    </button>
  );

  if (confirm) {
    Btn = (
      <div className={style.divBtns}>
        <button onClick={handleClick} className={style.btnContinue}> 
          Continuar
        </button>
        <button onClick={closeDialog} className={style.btnGoCart}>
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={style.overlay}>
        <div ref={dialogRef} className={style.alert}>
          <h4 className={style.text}>{textDialog}</h4>
          {Btn}
        </div>
      </div>
    </>
  );
};

export default Dialog;
