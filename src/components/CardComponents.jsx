import React from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi";

const CardComponents = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://img.trolymuasam.com/wp-content/uploads/2022/07/07e358b0e79c6cd146ae18b0fddc0e13.jpg" />
            <Card.Body>
                <Card.Title>Áo Thun Tay Ngắn Nam In Hình Quý Mão Form Loose</Card.Title>
                <div className='price-heart'>
                    <h3>199.000 đ</h3>
                    <FiHeart/>
                </div>
                {/* <Button variant="primary">Mua</Button> */}
            </Card.Body>
        </Card>
    )
}

export default CardComponents