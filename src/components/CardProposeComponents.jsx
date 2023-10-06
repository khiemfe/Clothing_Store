import React from 'react'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi"
import Col from 'react-bootstrap/Col'

const CardProposeComponents = (props) => {

    let { result_age, result_bmi, result_gender, key, countInstock, description, image, name, price, rating, type, discount, selled, age, bmi } = props
    
    // result_age = '36-50'
    // result_bmi = 'Beo'
    // result_gender = 'Nu'

    let MaleOrFemale 
    MaleOrFemale = result_gender.toLowerCase()
    if(result_gender === 'Nu') {
        MaleOrFemale = 'nữ'
    }
    let isMaleOrFemale = type.toLowerCase().includes(MaleOrFemale)
    if(result_gender !== 'Nam' && result_gender !== 'Nu') {
        isMaleOrFemale = true
        result_gender = 'undefined'
    }

    const Tuoi = result_age
    const Tuoi_Tu = Tuoi?.split('-')[0]
    const Tuoi_Den = Tuoi?.split('-')[1]

    const Tuoi_Sp_Tu = age?.split('-')[0]
    const Tuoi_Sp_Den = age?.split('-')[1]

    let isGiaTriTuoi = +Tuoi_Tu == +Tuoi_Sp_Tu || +Tuoi_Tu == +Tuoi_Sp_Den || 
                        +Tuoi_Den == +Tuoi_Sp_Tu || +Tuoi_Den == +Tuoi_Sp_Den ||
                        +Tuoi_Tu < Tuoi_Sp_Tu && +Tuoi_Den > Tuoi_Sp_Tu || 
                        +Tuoi_Sp_Den > +Tuoi_Tu && +Tuoi_Tu > +Tuoi_Sp_Tu
    if(!result_age.includes('-')) {
        isGiaTriTuoi = true
        result_age = 'undefined'
    }
    
    let GiaTriBMI
    if(result_bmi === 'Beo') {
        GiaTriBMI = 'mập'
    }
    if(result_bmi === 'Om') {
        GiaTriBMI = 'ốm'
    }
    let isGiaTriBMI = bmi.toLowerCase()?.includes(GiaTriBMI)
    if(result_bmi !== 'Om' && result_bmi !== 'thuong' && result_bmi !== 'Beo') {
        isGiaTriBMI = true
        result_bmi = 'undefined'
    }

    return (
       <>
            <div className='render_model'>
                <h3>{result_gender}</h3>
                <h3>{result_age}</h3>
                <h3>{result_bmi}</h3>
            </div>
            {Tuoi_Tu<10 ? (
                <h3 className='agenho'>Xin lỗi quý khách, shop chỉ kinh doanh các loại sản phẩm cho trẻ vị thành niên, nên chúng tôi không tìm thấy sản phẩm phù hợp cho bạn. Cảm ơn quý khách!!!</h3>   
            ) : undefined}

            {Tuoi_Tu>60 ? (
                <h3 className='agelon'>Xin lỗi quý khách, shop chỉ chủ yếu kinh doanh các mặc hàng cho giới trẻ, nên chúng tôi không tìm thấy sản phẩm phù hợp cho bạn. Cảm ơn quý khách!!!</h3>   
            ) : undefined}

            {isMaleOrFemale && isGiaTriBMI && isGiaTriTuoi ?
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