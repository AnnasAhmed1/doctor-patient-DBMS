import React from "react";

const ButtonComp = ({
  text,
  onClick = () => {},
  classname = "",
  type = "",
}) => {
  return (
    <button
      className={`mt-8 bg-blue-500 rounded-md p-1 text-white  w-[100%] mx-auto ${classname}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default ButtonComp;
