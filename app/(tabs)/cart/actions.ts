import React, { MouseEvent } from "react";

const AddToCart = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  alert("item added");
};

export default AddToCart;
