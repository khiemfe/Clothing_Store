import React from 'react'
import CardProposeComponents from './CardProposeComponents'
// import CameraComponents from './CameraComponents'
// import { linkSrc } from '../components/CameraComponents'

const ProposeComponents = () => {

    const imgStorage = localStorage.getItem("img");
    const imageCamera = JSON.parse(imgStorage)
    
    return (
        <div className='card-propose'>
            <h2>Sản phẩm đề xuất cho bạn</h2>
            <img className='img-propose' src={imageCamera} alt="" />

            <CardProposeComponents />
        </div>
    )
}

export default ProposeComponents

