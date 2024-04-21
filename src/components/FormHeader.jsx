import React from "react";

const FormHeader = ({ Title, Subtitle }) => {
  return (
    <div>
      <h1 className="text-center font-semibold text-3xl">{Title}</h1>
      <p className="text-center">{Subtitle}</p>
    </div>
  );
};

export default FormHeader;
