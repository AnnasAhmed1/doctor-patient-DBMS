import React from "react";

const InputComp = ({
  type = "text",
  placeholder = "",
  id = "",
  required = true,
  setState = () => {},
  classname = "",
}) => {
  return (
    <div>
      <label className={`block cursor-pointer px-2 mb-1 ${classname}`} htmlFor={id}>
        {id}
      </label>
      <input
        className={`block w-full border border-[#e3e3e3] py-1 px-2 rounded-lg ${classname}`}
        id={id}
        type={type}
        placeholder={`${placeholder}`}
        required={required}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
};

export default InputComp;
