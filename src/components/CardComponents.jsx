import React from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CardComponents = (props) => {

    const { key, countInstock, description, image, name, price, rating, type, discount, selled } = props

    return (
        <Card style={{ width: '18rem' }}>
            <div className='image'>
                <Card.Img variant="top" src='https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/Ao_thun_oversize_84RISING_ICONIC_LOGOshadow6.jpg' />
            </div>
            <Card.Body>
                <Card.Title className='align-items_center'>{name}</Card.Title>
                <div className='price-heart'>
                    <div className='transparent'>
                    <FiHeart/>
                    </div>
                    <h3>{price}đ</h3>
                    <FiHeart/>
                </div>
                {/* <Button variant="primary">Mua</Button> */}
            </Card.Body>
        </Card>
    )
}

export default CardComponents