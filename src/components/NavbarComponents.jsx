import React from 'react'
import Nav from 'react-bootstrap/Nav'

const NavbarComponents = () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link eventKey="link-1">Quần Jean</Nav.Link>
            <Nav.Link eventKey="link-2">Áo thun</Nav.Link>
            <Nav.Link eventKey="link-2">Áo ấm</Nav.Link>
            <Nav.Link eventKey="link-2">Đồ thể thao </Nav.Link>
            <Nav.Link eventKey="link-2">Áo sơ mi</Nav.Link>
            <Nav.Link eventKey="link-2">Quần đùi nữ</Nav.Link>
            <Nav.Link eventKey="link-2">Quần dài nam</Nav.Link>
      </Nav>
    )
}

export default NavbarComponents