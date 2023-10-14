import React from 'react'
import SlideComponents from '../components/SlideComponents'
import slide1 from '../public/img/slide1.jpeg'
import slide2 from '../public/img/slide2.jpeg'
import slide3 from '../public/img/slide3.jpeg'
import slide4 from '../public/img/slide4.jpeg'
import CardComponents from '../components/CardComponents'
import NavbarComponents from '../components/NavbarComponents'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useQuery } from '@tanstack/react-query'
import * as ProductServices from '../services/ProductServices'
import LoadingComponents from '../components/LoadingComponents'
import LoadingCardComponent from '../components/LoadingCardComponent'

const HomePage = () => {

    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct()
        return res
    }
    console.log(useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 }))
    const {isLoading, data: products} = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })
    console.log('data', products)

    let lengthProducts = 28
    const arrayProducts = [];

    for (let i = 1; i <= lengthProducts; i++) {
        arrayProducts.push(i);
    }
   
    return (
        <div className='home'>
            <Row className='content'>
                <Col xxl={2} xl={2} className='_navbar'>
                    <NavbarComponents />
                </Col>
                <Col xxl={10} xl={10}>
                    <div className='slide-product'>
                        <div className='slide'><SlideComponents arrImages={[slide1, slide2, slide3, slide4]}/></div>
                        <div className='product'>
                            <LoadingCardComponent isLoading={isLoading} arrayProducts={arrayProducts}>
                                <Row>
                                    {products?.data?.map((product) => {
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
                                                        age={product.age}
                                                        bmi={product.bmi}
                                                    />
                                                </a>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </LoadingCardComponent>
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