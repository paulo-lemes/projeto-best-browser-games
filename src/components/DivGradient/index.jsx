import "../../App.css";

const DivGradient = (props) => {
  const { width, classCSS } = props;
  return <div className={`divGradient ${classCSS}`} width={width}></div>;
}

export default DivGradient