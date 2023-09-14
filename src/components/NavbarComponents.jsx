import React from 'react'
import Nav from 'react-bootstrap/Nav'

const NavbarComponents = () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href='/quan-jean' eventKey="link-1">Quần Jean</Nav.Link>
            <Nav.Link eventKey="link-2">Áo thun</Nav.Link>
            <Nav.Link eventKey="link-2">Áo ấm nam</Nav.Link>
            <Nav.Link eventKey="link-2">Quần</Nav.Link>
            <Nav.Link eventKey="link-2">áo thể thao </Nav.Link>
            <Nav.Link eventKey="link-2">quần thể thao</Nav.Link>
            <Nav.Link eventKey="link-2">quàn thun nữ</Nav.Link>
            <Nav.Link eventKey="link-2">áo ấm nữ</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav>
    )
}

export default NavbarComponents