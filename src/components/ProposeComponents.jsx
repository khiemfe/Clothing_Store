import React from 'react'
import CardProposeComponents from './CardProposeComponents'
// import CameraComponents from './CameraComponents'
import { linkSrc } from '../components/CameraComponents'

const ProposeComponents = () => {
    console.log(linkSrc)
    
    return (
        <div className='card-propose'>
            <h2>Sản phẩm đề xuất cho bạn</h2>
            <img className='img-propose' src='https://img.trolymuasam.com/wp-content/uploads/2022/07/07e358b0e79c6cd146ae18b0fddc0e13.jpg' alt="" />

            <CardProposeComponents />
        </div>
    )
}

export default ProposeComponents

