import React from 'react'
import { useRef, useState, useEffect } from "react"
import CardProposeComponents from './CardProposeComponents'

const ProposeComponents = () => {
    const countRef = useRef()
    useEffect(() => {
        console.log(countRef.current) 
    })
    return (
        <div className='card-propose'>
            <h2>Sản phẩm đề xuất cho bạn</h2>
            <img ref={countRef} className='img-propose' src="" alt="" />
            <CardProposeComponents />
        </div>
    )
}

export default ProposeComponents

