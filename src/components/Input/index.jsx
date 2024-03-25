import "../../App.css";

const Input = ({
  type,
  name,
  value,
  handleEvent,
  label,
  classCSS,
  placeholder,
  textarea,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          name={name}
          className={`inputBorderGradient ${classCSS}`}
          onChange={handleEvent}
          placeholder={placeholder}
          defaultValue={value}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          className={`inputBorderGradient ${classCSS}`}
          onChange={handleEvent}
          placeholder={placeholder}
        ></input>
      )}
    </>
  );
};

export default Input;
