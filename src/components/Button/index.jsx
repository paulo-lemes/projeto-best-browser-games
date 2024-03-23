import "../../App.css"

const Button = (props) => {
  const { text, classCSS, handleEvent } = props;

  return (
    <button type="button" className={classCSS} onClick={handleEvent}>
      {text}
    </button>
  );
}

export default Button