import React, { useEffect, useState } from 'react'
import CardProposeComponents from './CardProposeComponents'
import * as ProductServices from '../services/ProductServices'
import { useQuery } from '@tanstack/react-query'
import Row from 'react-bootstrap/Row'
import LoadingComponents from './LoadingComponents'
import axios from 'axios'
import agetxt from './age.txt'
import bmitxt from './bmi.txt'
import gendertxt from './gender.txt'
import isLoadingtxt from './isLoading.txt'

const ProposeComponents = () => {

    const imgStorage = localStorage.getItem("img");
    const imageBase64 = JSON.parse(imgStorage)
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        if (!isLoaded) {
            axios.post("http://localhost:3001/save", {
                imageBase64,
            })
            .then((res) => {
                console.log('ok', res)
            })
            .catch((err) => {
                console.log('err qua dung luong', err)
            })
            setIsLoaded(true);
        }
    }, [isLoaded])
    
    
    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct()
        return res
    }
    
    const [result_age, set_result_age] = useState('')
    
    
    useEffect(()=>{
        axios(agetxt)
        .then(res => res.data)
        .then(data => {
            set_result_age(data)
        })
    },[agetxt])

    const [result_bmi, set_result_bmi] = useState('')
    useEffect(()=>{
        axios(bmitxt)
        .then(res => res.data)
        .then(data => set_result_bmi(data))
    },[bmitxt])
    
    const [result_gender, set_result_gender] = useState('')
    useEffect(()=>{
        axios(gendertxt)
        .then(res => res.data)
        .then(data => set_result_gender(data))
    },[gendertxt])

    let {isLoading, data: product} = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })
    console.log('loading', isLoading)

    const [checkLoad, setCheckLoad] = useState(false)
    useEffect(()=>{
        axios(isLoadingtxt)
        .then(res => res.data)
        .then(data => {
            console.log('dataaaaaaa', data)
            setCheckLoad(data)
        })
    })

    if(checkLoad === true) {
        isLoading = true
        product = undefined
    } 

    console.log('age', result_age)
    console.log('bmi', result_bmi)
    console.log('gender', result_gender)
    
    return (
        <div className='card-propose'>
            {/* <DuDoan /> */}
            <h2>Sản phẩm đề xuất cho bạn</h2>
            <img className='img-propose' src={imageBase64} alt="" />

            {/* <CardProposeComponents /> */}
            <div className="products">
                <LoadingComponents isLoading={isLoading}>
                    <Row>
                        {product?.data?.map((product, index) => {
                            return (
                                // <span key={index}>
                                    <CardProposeComponents className='card_Propose'
                                        // countInstock={product.countInstock}
                                        // description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        // rating={product.rating}
                                        type={product.type}
                                        // discount={product.discount}
                                        // selled={product.selled}
                                        age={product.age}
                                        bmi={product.bmi}
                                        result_age={result_age}
                                        result_bmi={result_bmi}
                                        result_gender={result_gender}
                                    />
                                // </span>
                            )
                        })}
                    </Row>
                </LoadingComponents>
            </div>
        </div>
    )
}

export default ProposeComponents