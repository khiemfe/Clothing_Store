import React from "react";
import Nav from "react-bootstrap/Nav";

const NavbarComponents = (arrType) => {
  console.log("arrType", arrType?.arrType);
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {arrType?.arrType.map((type) => {
        return <Nav.Link>{type}</Nav.Link>;
      })}
    </Nav>
  );
};

export default NavbarComponents;
