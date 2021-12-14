export const SelectBoxYearMonth = ({ children, id = "", tani = "", value }) => {
  const selectStyle = {
    width: "160px",
    display: "inline-block",
    fontSize: "24px",
  };

  const taniStyle = {
    fontSize: "20px",
    paddingLeft: "8px",
  };

  return (
    <>
      <select
        className="form-control form-control-lg"
        style={selectStyle}
        id={id}
        defaultValue={value}
      >
        {children}
      </select>
      <span style={taniStyle}>{tani}</span>
    </>
  );
};
