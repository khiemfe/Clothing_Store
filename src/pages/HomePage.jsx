import React from 'react'
import SlideComponents from '../components/SlideComponents'
import slide1 from '../public/img/slide1.jpg'
import slide2 from '../public/img/slide2.jpg'
import slide3 from '../public/img/slide3.jpg'
import CardComponents from '../components/CardComponents'
import NavbarComponents from '../components/NavbarComponents'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const HomePage = () => {
    return (
        <div className='home'>
            <Row className='content'>
                <Col xxl={2} xl={2} className='_navbar'>
                    <NavbarComponents />
                </Col>
                <Col xxl={10} xl={10}>
                    <div className='slide-product'>
                        <div className='slide'><SlideComponents arrImages={[slide1, slide2, slide3]}/></div>
                        <div className='product'>
                            <Row>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                                <Col xxl={3} xl={3}>
                                    <CardComponents/>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Col>
            </Row>
            <div className='see-more'>
                <Button variant="outline-primary">Xem thêm</Button>{' '}
            </div>
        </div>
    )
}

export default HomePage