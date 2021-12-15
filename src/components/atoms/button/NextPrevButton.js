import {memo} from 'react'

export const NextPrevButton = memo(({ children, onClick, className = "" }) => {

  const buttonStyle = {
    fontWeight: "900",
    fontSize: "1rem",
    margin: "1rem 0",
    padding: "0.2rem 1.5rem",
  };

  return (
    <button
      id=""
      className={`btn btn-primary btn-sm ${className}`}
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
