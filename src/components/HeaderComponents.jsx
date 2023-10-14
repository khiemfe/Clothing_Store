import React, { useEffect, useState } from 'react'
import logo from '../public/img/logo2.jpg'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import { FiSearch, FiHeart } from "react-icons/fi"
import { BsCart2 } from "react-icons/bs"
import CameraComponents from './CameraComponents'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import * as UserServcie from '../services/userServices'
import { resetUser } from '../redux/slices/userSlice'
import LoadingComponents from './LoadingComponents'

const HeaderComponents = () => {
    const item = ['nam', 'nữ', 'new', 'best', 'sale đồng giá']

    const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const user = useSelector((state) => state.user)
    console.log('userHeader', user)

    if(user?.email) {
        const dataEmail = user?.email
        localStorage.setItem('email', JSON.stringify(dataEmail))
    }
    let storageEmail = localStorage.getItem('email')
    console.log('storageEmail', storageEmail)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        setLoading(true)
        await UserServcie.logoutUser()
        dispatch(resetUser())
        localStorage.setItem('email', JSON.stringify(false))
        localStorage.setItem('log-out', JSON.stringify(true))
        setLoading(false)
    }

    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    let storageLogOut = localStorage.getItem('log-out')
    console.log('storageLogOut', storageLogOut !== 'true')
 
    const [loadingInfo, setLoadingInfo] = useState(false)

    return (
        <Navbar className=" justify-content-between header ">
            <Toaster />
            <Container>
                <Row className='align-items_center'>
                    <Col xxl={1} xl={1}>
                        <Navbar.Brand href="/">
                            <img src={logo} alt="logo" className='logo' />
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
                                    // type="search"
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
                            <div className='info-user'>
                                <LoadingComponents isLoading={loadingInfo}>
                                    {user?.email && storageLogOut !== 'true' ? (
                                        <Dropdown style={{width: '70px'}}>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    {userAvatar ? (
                                                        <img className='avatar' src={userAvatar} alt='avatar' style={{width: '50px'}} />
                                                        ) : (
                                                                <img className='avatar' src='' alt='' style={{width: '50px'}} />
                                                            )
                                                    }
                                                    <div className='textName'>{ userName || user.email || 'User' }</div>
                                                </Dropdown.Toggle>
                                            <Dropdown.Menu style={{left: '-60%', fontSize: '13px'}}>
                                                <Dropdown.Item href="/profile-user">Thông tin người dùng</Dropdown.Item>
                                                {(user?.isAdmin && 
                                                    <Dropdown.Item href="/system/admin">Trang chủ ADMIN</Dropdown.Item>
                                                )}
                                                <Dropdown.Divider />
                                                <LoadingComponents isLoading={loading}>
                                                    <Dropdown.Item onClick={handleLogout} href="#">Đăng xuất</Dropdown.Item>
                                                </LoadingComponents>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : (
                                        <>
                                            {storageEmail !== 'false' && storageLogOut !== 'true' ? (
                                                <div style={{marginTop: '10px'}}>
                                                    <LoadingComponents isLoading={true}></LoadingComponents>
                                                </div>
                                            ) : (
                                                <Button onClick={handleNavigateLogin} className='btn-sign' variant="">Đăng nhập <br /> Đăng ký</Button>
                                            )}
                                        </>
                                    )}
                                </LoadingComponents>
                            </div>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default HeaderComponents