import { memo } from "react";

export const InputText = memo((props) => {
  const { id, placeholder, onChange, value, children } = props;

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        type="text"
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
