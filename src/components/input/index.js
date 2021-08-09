import React from "react";

const CustomInput = ({ type, placeholder, name ,onChange,value}) => {
  return (
    <div className="category_input">
      <input type={type || "text"} placeholder={placeholder} name={name} onChange={onChange} value={value} />
    </div>
  );
};

export default CustomInput;
