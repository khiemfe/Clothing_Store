import React from 'react'
import CardProposeComponents from './CardProposeComponents'
import * as ProductServices from '../services/ProductServices'
import { useQuery } from '@tanstack/react-query'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingComponents from './LoadingComponents'

const ProposeComponents = () => {

    const imgStorage = localStorage.getItem("img");
    const imageCamera = JSON.parse(imgStorage)

    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct()
        return res
    }

    const {isLoading, data: product} = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })
    console.log('qqqqqqqqqqqqqqq', product)
    return (
        <div className='card-propose'>
            <h2>Sản phẩm đề xuất cho bạn</h2>
            <img className='img-propose' src={imageCamera} alt="" />

            {/* <CardProposeComponents /> */}
            <div className="products">
                <LoadingComponents isLoading={isLoading}>
                    <Row>
                        {product?.data?.map((product, index) => {
                            return (
                                // <Col xxl={3} xl={3} key={product._id} >
                                //     <a href="/product-details" style={{textDecoration: 'none'}}>
                                        <span key={index}>
                                            <CardProposeComponents
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
                                        </span>
                                //     </a>
                                // </Col>
                            )
                        })}
                    </Row>
                </LoadingComponents>
            </div>
        </div>
    )
}

 const imgStorage = localStorage.getItem("img");
 export const imageCamera = JSON.parse(imgStorage)

export default ProposeComponents

