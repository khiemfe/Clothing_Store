import React from 'react'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'

const CardComponents = (props) => {

    const { id, key, countInstock, description, image, name, price, rating, type, discount, selled } = props

    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    // const nameThuong = name.toLowerCase()

    return (
        <Card style={{ width: '18rem' }} key={key} onClick={() => handleDetailsProduct(id)}>
            <div className='image'>
                <Card.Img variant="top" src={image} />
            </div>
            <Card.Body>
                <Card.Title className='align-items_center'>{name}</Card.Title>
                <div className='price-heart'>
                    <div className='transparent'>
                    <FiHeart/>
                    </div>
                    {/* toLocaleString (đơn vị tiền) */}
                    <h3>{price}.000đ</h3> 
                    <FiHeart/>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardComponents