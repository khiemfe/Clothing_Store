import React from 'react'
import Nav from 'react-bootstrap/Nav'

const NavbarComponents = () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href='/quan-jean' eventKey="link-1">Quần Jean</Nav.Link>
            <Nav.Link eventKey="link-2">Áo thun</Nav.Link>
            <Nav.Link eventKey="link-2">Áo ấm nam</Nav.Link>
            <Nav.Link eventKey="link-2">Áo ấm nữ</Nav.Link>
            <Nav.Link eventKey="link-2">áo thể thao </Nav.Link>
            <Nav.Link eventKey="link-2">quần thể thao</Nav.Link>
            <Nav.Link eventKey="link-2">Áo sơ mi nam</Nav.Link>
            <Nav.Link eventKey="link-2">Quần đùi nữ</Nav.Link>
            <Nav.Link eventKey="link-2">Quần dài nam</Nav.Link>
      </Nav>
    )
}

export default NavbarComponents