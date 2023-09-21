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
import { useQuery } from '@tanstack/react-query'
import * as ProductServices from '../services/ProductServices'
import LoadingComponents from '../components/LoadingComponents'

const HomePage = () => {

    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct()
        return res
    }
    console.log(useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 }))
    const {isLoading, data: product} = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })
    console.log('data', product)
   
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
                        <LoadingComponents isLoading={isLoading}>
                            <Row>
                                {product?.data?.map((product) => {
                                    return (
                                        <Col xxl={3} xl={3} key={product._id} >
                                            <a href="/product-details">
                                                <CardComponents 
                                                    countInstock={product.countInstock}
                                                    description={product.description}
                                                    image={product.image}
                                                    name={product.name}
                                                    price={product.price}
                                                    rating={product.rating}
                                                    type={product.type}
                                                    discount={product.discount}
                                                    selled={product.selled}
                                                />
                                            </a>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </LoadingComponents>
                        </div>
                        <div className='see-more'>
                            <Button variant="outline-primary">Xem thêm</Button>{' '}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomePage