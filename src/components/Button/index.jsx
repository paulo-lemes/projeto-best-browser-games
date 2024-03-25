import "../../App.css";

const Button = ({ text, classCSS, handleEvent, type = "button" }) => {
  return (
    <button type={type} className={classCSS} onClick={handleEvent}>
      {text}
    </button>
  );
};

export default Button;
