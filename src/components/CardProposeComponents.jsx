import React, { useEffect } from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const CardProposeComponents = (props) => {

    const { key, countInstock, description, image, name, price, rating, type, discount, selled, age, bmi } = props
    
    const MaleOrFemale = 'nam'
    const isMaleOrFemale = type.includes(MaleOrFemale)

    const Tuoi = 20
    
    const GiaTriBMI = 'hơi mập'
    const isGiaTriBMI = bmi?.includes(GiaTriBMI)
    return (
       <>
            {isMaleOrFemale && isGiaTriBMI && +age?.split('-')[1] >= Tuoi && Tuoi >= +age?.split('-')[0]  ?
                (
                <Col xxl={3} xl={3}>
                    <a href="/product-details" style={{textDecoration: 'none'}}>
                        <Card style={{ width: '18rem' }}>
                            <div className='image'>
                                <Card.Img variant="top" src={image} />
                            </div>
                            <Card.Body>
                                <Card.Title className='align-items_center'>{name}</Card.Title>
                                <div className='price-heart'>
                                    <div className='transparent'>
                                        <FiHeart/>
                                    </div>
                                    <h3>{price}.000đ</h3>
                                    <FiHeart/>
                                </div>
                                {/* <Button variant="primary">Mua</Button> */}
                            </Card.Body>
                        </Card>
                    </a>
                    
                </Col>
                ) : (undefined)
            }
        </>
    )
}

export default CardProposeComponents