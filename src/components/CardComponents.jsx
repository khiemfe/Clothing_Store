import React from 'react'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi"

const CardComponents = (props) => {

    const { key, countInstock, description, image, name, price, rating, type, discount, selled } = props

    return (
        <Card style={{ width: '18rem' }} key={key}>
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
            </Card.Body>
        </Card>
    )
}

export default CardComponents