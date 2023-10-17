import React, { useEffect, useRef, useState } from 'react'

const ProductDetailsComponents = () => {
    const [images, setImages] = useState({
        img1 : "https://img.trolymuasam.com/wp-content/uploads/2022/07/07e358b0e79c6cd146ae18b0fddc0e13.jpg",
        img2 : "https://levents.asia/wp-content/uploads/2022/06/POPULAR-LOGO-TEE_W1-1-scaled.jpg",
        img3 : "https://levents.asia/wp-content/uploads/2022/06/BASIC-ID-TEE-D1-1-scaled.jpg",
        img4 : "https://levents.asia/wp-content/uploads/2022/06/BASIC-ID-TEE-D4-1-scaled.jpg"
    })

    console.log(setImages)

    const className = 'w-24 h-24 rounded-md cursor-pointer img-đetails img-3'
    const classNameActive = 'w-24 h-24 rounded-md cursor-pointer img-đetails img-3 active'

    const [activeImg, setActiveImage] = useState(images.img1)

    const [className1, setClassName1] = useState(classNameActive)
    const [className2, setClassName2] = useState(className)
    const [className3, setClassName3] = useState(className)
    const [className4, setClassName4] = useState(className)

    const setClassName = () => {
        setClassName1(className)
        setClassName2(className)
        setClassName3(className)
        setClassName4(className)
    }
    
    const handleImg1 = () => {
        setActiveImage(images.img1)
        setClassName()
        setClassName1(classNameActive)
    }

    const handleImg2 = () => {
        setActiveImage(images.img2)
        setClassName()
        setClassName2(classNameActive)
    }

    const handleImg3 = () => {
        setActiveImage(images.img3)
        setClassName()
        setClassName3(classNameActive)
    }

    const handleImg4 = () => {
        setActiveImage(images.img4)
        setClassName()
        setClassName4(classNameActive)
    }

    const [amount, setAmount] = useState(1)

    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center container'>
            <div className='flex flex-col gap-6 lg:w-2/4 img-main'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl img-đetails img-1'/>
                <div className='flex flex-row justify-between h-24 img-anhphu'>
                    <img src={images.img1} alt="" className={className1} onClick={() => handleImg1()}/>
                    <img src={images.img2} alt="" className={className2} onClick={() => handleImg2()}/>
                    <img src={images.img3} alt="" className={className3} onClick={() => handleImg3()}/>
                    <img src={images.img4} alt="" className={className4} onClick={() => handleImg4()}/>
                </div>
            </div>
            {/* ABOUT */}
            <div className='flex flex-col gap-4 lg:w-2/4 notify'>
                <div>
                    <span className=' text-violet-600 font-semibold tieude'>Special Sneaker</span>
                    <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
                </div>
                <p className='text-gray-700 mota'>
                Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi chilometri, Invincible 3 offre un livello di comfort elevatissimo sotto il piede per aiutarti a dare il massimo oggi, domani e oltre. Questo modello incredibilmente elastico e sostenitivo, è pensato per dare il massimo lungo il tuo percorso preferito e fare ritorno a casa carico di energia, in attesa della prossima corsa.
                </p>
                <h6 className='text-2xl font-semibold gia'>199.000đ</h6>
                <div className='flex flex-row items-center gap-12 choose'>
                    <div className='flex flex-row items-center cangiua'>
                        {amount === 0 ? (
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl congtru'>-</button>
                        ) : (
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl congtru' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        )}
                        <span className='py-4 px-6 rounded-lg number'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl congtru' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full add'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsComponents;
