import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FiHeart } from "react-icons/fi";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
// import agetxt from './age.txt'
// import bmitxt from './bmi.txt'
// import gendertxt from './gender.txt'
import base64 from './base64.txt'
import { saveAs } from 'file-saver';

const CardProposeComponents = (props) => {

    // axios.post(`http://127.0.0.1:8080/`, formData)
    // .then(res => {
    //   const persons = res.data;
    // //   this.setState({ persons });
    //     console.log(persons)
    // })
    // .catch(error => console.log(error));
    // const api = 'http://127.0.0.1:5000'
    // fetch(api, {
    //     mode: 'no-cors',
    // })
    //     .then(response => {
    //         console.log('ok', response)
    //         // return response.json()
    //     })
    //     // .then(data => {
    //     //     console.log('ok', data)
    //     //     // return data
    //     // })
    //     .catch(rejected => {
    //         console.log('error', rejected);
    //     })


    // fetch('txt')
    // .then(function(response){
    //     return response.text()
    // })
    // .then(function (data) {
    //     console.log(data);
    // })
    // .catch(rejected => {
    //     console.log('error', rejected);
    // })

    // useEffect(() => {
    //     const file = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
    //     console.log(file)
    //     saveAs(file, base64);
    // }, [])
    
    // const [result_age, set_result_age] = useState('')
    // useEffect(()=>{
    //     axios(agetxt)
    //     .then(res => res.data)
    //     .then(data => set_result_age(data))
    // },[agetxt])
    // const [result_bmi, set_result_bmi] = useState('')
    // useEffect(()=>{
    //     axios(bmitxt)
    //     .then(res => res.data)
    //     .then(data => set_result_bmi(data))
    // },[bmitxt])
    // const [result_gender, set_result_gender] = useState('')
    // useEffect(()=>{
    //     axios(gendertxt)
    //     .then(res => res.data)
    //     .then(data => set_result_gender(data))
    // },[gendertxt])

    // console.log('age', result_age)
    // console.log('bmi', result_bmi)
    // console.log('gender', result_gender)

    // return <p>/* code */</p>


    const { result_age, result_bmi, result_gender, key, countInstock, description, image, name, price, rating, type, discount, selled, age, bmi } = props
    
    const MaleOrFemale = result_gender.toLowerCase()
    const isMaleOrFemale = type.includes(MaleOrFemale)
    console.log('Giới tính: ',isMaleOrFemale)
    const Tuoi = result_age
    const Tuoi_Tu = Tuoi?.split('-')[0]
    const Tuoi_Den = Tuoi?.split('-')[1]
    console.log('tuổi 1: ',Tuoi?.split('-')[0])
    console.log('tuổi 2: ',Tuoi?.split('-')[1])

    const Tuoi_Sp_Tu = age?.split('-')[0]
    const Tuoi_Sp_Den = age?.split('-')[1]
    console.log('tuổi sp 1', age?.split('-')[0])
    console.log('tuổi sp 2', age?.split('-')[1])

    console.log('Tuoi 1111' ,+Tuoi_Tu>=+Tuoi_Sp_Tu)
    console.log('Tuoi 2222' ,+Tuoi_Den<=+Tuoi_Sp_Den)
    const isGiaTriTuoi = +Tuoi_Tu>=+Tuoi_Sp_Tu || +Tuoi_Den<=+Tuoi_Sp_Den
    console.log('Giá trị tuổi', isGiaTriTuoi)
    // let sortAge = []
    // sortAge.push(age?.split('-')[1])
    // console.log(sortAge)
    let GiaTriBMI
    if(result_bmi === 'Beo') {
        GiaTriBMI = 'mập'
    }
    const isGiaTriBMI = bmi?.includes(GiaTriBMI)
    console.log('BMI: ',isGiaTriBMI)

    return (
       <>
            <div className='render_model'>
                <h3>{result_gender}</h3>
                <h3>{result_age}</h3>
                <h3>{result_bmi}</h3>
            </div>
            {Tuoi_Tu<10 ? (
                <h3 className='agenho'>Xin lỗi quý khách, shop chỉ kinh doanh các loại sản phẩm cho trẻ vị thành niên, nên chúng tôi không tìm thấy sản phẩm phù hợp. Cảm ơn quý khách!!!</h3>   
            ) : undefined}

            {Tuoi_Den>60 ? (
                <h3 className='agelon'>Xin lỗi quý khách, shop chỉ chủ yếu kinh doanh các mặc hàng cho giới trẻ, nên chúng tôi không tìm thấy sản phẩm phù hợp. Cảm ơn quý khách!!!</h3>   
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