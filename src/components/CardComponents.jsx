import React from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CardComponents = () => {
    const arrProduct = [
        {
            image: "https://img.trolymuasam.com/wp-content/uploads/2022/07/07e358b0e79c6cd146ae18b0fddc0e13.jpg",
            title: 'Áo Thun Tay Ngắn Nam In Hình Quý Mão Form Loose',
            price: '199.000',
        },
        {
            image: "https://hidanz.com/wp-content/uploads/2021/01/ao-nam-dep.jpg",
            title: 'Áo Thun Trơn Tay Ngắn Nam',
            price: '159.000',
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9PLeVb07sffhJbU0Nu45WMaYT_nfenL91YA&usqp=CAU",
            title: 'Kiểu Quần Tây Nam Ống Đứng Cao Cấp Công Sở',
            price: '399.000',
        },
        {
            image: "https://thoitrangteenthienphuc.vn/upload/hinhthem/quanjoggerkakinamcaocapsieudepsieuben4-138.jpg",
            title: 'QUẦN JOGGER KAKI NAM CAO CẤP, SIÊU ĐẸP, SIÊU BỀN',
            price: '299.000',
        },
    ]
    return (
        <Row>
            {arrProduct.map((product, index) => {
                return (
                    <Col xxl={3} xl={3}>
                        <Card style={{ width: '18rem' }}>
                            <div className='image'>
                                <Card.Img variant="top" src={product.image} />
                            </div>
                            <Card.Body>
                                <Card.Title className='align-items_center'>{product.title}</Card.Title>
                                <div className='price-heart'>
                                    <div className='transparent'>
                                    <FiHeart/>
                                    </div>
                                    <h3>{product.price}</h3>
                                    <FiHeart/>
                                </div>
                                {/* <Button variant="primary">Mua</Button> */}
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

export default CardComponents