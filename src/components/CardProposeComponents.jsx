import React, { useEffect } from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const CardProposeComponents = (props) => {
    // const arrProduct = [
    //     {
    //         image: "https://img.trolymuasam.com/wp-content/uploads/2022/07/07e358b0e79c6cd146ae18b0fddc0e13.jpg",
    //         title: 'Áo Thun Tay Ngắn Nam In Hình Quý Mão Form Loose',
    //         price: '199.000',
    //     },
    //     {
    //         image: "https://hidanz.com/wp-content/uploads/2021/01/ao-nam-dep.jpg",
    //         title: 'Áo Thun Trơn Tay Ngắn Nam',
    //         price: '159.000',
    //     },
    //     {
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9PLeVb07sffhJbU0Nu45WMaYT_nfenL91YA&usqp=CAU",
    //         title: 'Kiểu Quần Tây Nam Ống Đứng Cao Cấp Công Sở',
    //         price: '399.000',
    //     },
    //     {
    //         image: "https://thoitrangteenthienphuc.vn/upload/hinhthem/quanjoggerkakinamcaocapsieudepsieuben4-138.jpg",
    //         title: 'QUẦN JOGGER KAKI NAM CAO CẤP, SIÊU ĐẸP, SIÊU BỀN',
    //         price: '299.000',
    //     },
    //     {
    //         image: "https://salt.tikicdn.com/cache/w1200/ts/product/52/95/d1/1ebff5540a8e9c5e7b8de5ece97ca5bf.png",
    //         title: 'ÁO THUN SIÊU ĐẸP , SIÊU BỀN , SIÊU CHẮC CHẮN',
    //         price: '150.000',
    //     },
    //     {
    //         image: "https://salt.tikicdn.com/cache/w1200/ts/product/a2/64/94/2a1d74044e880fdb4a04f01452011efe.jpg",
    //         title: 'QUẦN JEANS NGẮN NAM, THOÁNG MÁT, SIÊU BỀN',
    //         price: '300.000',
    //     },
    //     {
    //         image: "https://thoitrangbigsize.vn/wp-content/uploads/2019/09/1-6.jpg",
    //         title: 'ÁO THUN TAY DÀI BIG SIZE',
    //         price: '339.000',
    //     },
    //     {
    //         image: "https://xtee.vn/wp-content/uploads/2020/06/HX044-1.png",
    //         title: 'ÁO HOODIE MICHAVEILLI',
    //         price: '399.000',
    //     },
    // ]

    const { key, countInstock, description, image, name, price, rating, type, discount, selled, age, bmi } = props
    
    const MaleOrFemale = 'nữ'
    const isMaleOrFemale = type.includes(MaleOrFemale)

    const Tuoi = 19
    // if(+age?.split('-')[1] >= Tuoi && Tuoi >= +age?.split('-')[0]) {
    //    console.log('đúng') 
    // }else {
    //     console.log('sai')
    // }
    
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