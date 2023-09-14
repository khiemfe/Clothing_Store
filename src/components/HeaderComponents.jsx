import React from 'react'
import logo from '../public/img/logo.png'

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
// import Dropdown from 'react-bootstrap/Dropdown';

import { FiSearch, FiHeart } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import CameraComponents from './CameraComponents';
// import { FaRegUser } from "react-icons/fa";

const HeaderComponents = () => {
    const item = ['nam', 'nữ', 'new', 'best', 'sale đồng giá']
    return (
        <Navbar className=" justify-content-between header ">
            <Container>
                <Row className='align-items_center'>
                    <Col xxl={1} xl={1}>
                        <Navbar.Brand href="/">
                            <img src={logo} alt="logo" className='logo' />
                            {/* logo */}
                        </Navbar.Brand>
                    </Col>
                    <Col xxl={5} xl={5} className='center align-items_center'>
                        <Nav className="me-auto">
                            {item.map((i, index) => {
                                return <Nav.Link key={index} className='item' href="/nam">{i}</Nav.Link>
                            })}
                            {/* <Nav.Link className='item' href="/nu">Nữ</Nav.Link>
                            <Nav.Link className='item' href="/new">New</Nav.Link>
                            <Nav.Link className='item' href="/best">Best</Nav.Link>
                            <Nav.Link className='item color-red' href="/sale">Sale đồng giá</Nav.Link> */}
                        </Nav>
                    </Col>
                    <Col xxl={6} xl={6} className='right '>
                        <Form className="d-flex form align-items_center">
                            <CameraComponents />
                            <div className='search'>
                                <Form.Control
                                    type="search"
                                    placeholder="Tìm kiếm sản phẩm"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success" className='align-items_center'>
                                    <FiSearch />
                                </Button>
                            </div>
                            <FiHeart className='icon heart'/>
                            <Button className='btn-cart'>
                                <Badge bg="warning">9</Badge>
                                <BsCart2 className='icon cart'/>
                            </Button>
                            <Button className='btn-sign' variant="">Đăng nhập <br /> Đăng ký</Button>{' '}
                            {/* <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <FaRegUser className='icon'/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#/action-3">Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default HeaderComponents