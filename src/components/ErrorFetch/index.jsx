const ErrorFetch = ({ error, classCSS }) => {
  return (
    <span className={`errorDescription ${classCSS}`}>
      {error.length > 0 &&
        error.map((item) => <p key={item.message}>{item.message}</p>)}
    </span>
  );
};

export default ErrorFetch;
