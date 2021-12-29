import { memo } from "react";

export const InputText = memo((props) => {
  const { id, type="text", placeholder, onChange, value, children } = props;

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </>
  );
});
