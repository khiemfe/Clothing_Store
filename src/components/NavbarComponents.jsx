import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import * as ProductServices from "../services/ProductServices";

const NavbarComponents = (arrType) => {
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {arrType?.arrType?.map((type, index) => {
        return (
          <>
            {type !== "Khác" && (
              <Nav.Link key={index} onClick={() => handleNavigateType(type)}>
                {type}
              </Nav.Link>
            )}
          </>
        );
      })}
      <Nav.Link onClick={() => handleNavigateType("Khác")}>{"Khác"}</Nav.Link>
    </Nav>
  );
};

export default NavbarComponents;
