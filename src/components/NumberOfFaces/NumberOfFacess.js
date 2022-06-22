import React from "react";

function NumberOfFaces({ noOfFaces }) {
  console.log(noOfFaces);
  return (
    <div className="relative">
      <h1>{noOfFaces ? `${noOfFaces} faces` : null}</h1>
    </div>
  );
}

export default NumberOfFaces;
