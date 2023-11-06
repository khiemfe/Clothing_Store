import React from "react";
import ProductDetailsComponents from "../components/ProductDetailsComponents";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  console.log("params", id); //id product

  return (
    <div className="produc-details">
      <ProductDetailsComponents idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;
