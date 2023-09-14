// import React from 'react';
// import { Fade } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
// import {
//     MDBBtn,
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBCardText,
//     MDBCol,
//     MDBContainer,
//     MDBIcon,
//     MDBInput,
//     MDBRow,
//     MDBTypography,
//     } from "mdb-react-ui-kit";

// const ProductDetailsComponents = ({arrImages}) => {
//     const fadeImages = [
//         {
//           url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//           caption: 'First Slide'
//         },
//         {
//           url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
//           caption: 'Second Slide'
//         },
//         {
//           url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//           caption: 'Third Slide'
//         },
//       ];
//     return (
//         <div>
//             <div className="slide-container">
//       <Fade>
//         {fadeImages.map((fadeImage, index) => (
//           <div key={index}>
//             <img style={{ width: '100%' }} src={fadeImage.url} />
//             <h2>{fadeImage.caption}</h2>
//           </div>
//         ))}
//       </Fade>
//     </div>
//             {/* <div>
//                 <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
//                     <MDBContainer className="py-5 h-100">
//                         <MDBRow className="justify-content-center align-items-center h-100">
//                         <MDBCol size="12">
//                             <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
//                             <MDBCardBody className="p-0">
//                                 <MDBRow className="g-0">
//                                 <MDBCol lg="8">
//                                     <div className="p-5">
//                                     <div className="d-flex justify-content-between align-items-center mb-5">
//                                         <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
//                                         Shopping Cart
//                                         </MDBTypography>
//                                         <MDBTypography className="mb-0 text-muted">
//                                         3 items
//                                         </MDBTypography>
//                                     </div>

//                                     <hr className="my-4" />

//                                     <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
//                                         <MDBCol md="2" lg="2" xl="2">
//                                         <MDBCardImage
//                                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
//                                             fluid className="rounded-3" alt="Cotton T-shirt" />
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="3" xl="3">
//                                         <MDBTypography tag="h6" className="text-muted">
//                                             Shirt
//                                         </MDBTypography>
//                                         <MDBTypography tag="h6" className="text-black mb-0">
//                                             Cotton T-shirt
//                                         </MDBTypography>
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
//                                         <MDBBtn color="link" className="px-2">
//                                             <MDBIcon fas icon="minus" />
//                                         </MDBBtn>

//                                         <MDBInput type="number" min="0" defaultValue={1} size="sm" />

//                                         <MDBBtn color="link" className="px-2">
//                                             <MDBIcon fas icon="plus" />
//                                         </MDBBtn>
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="2" xl="2" className="text-end">
//                                         <MDBTypography tag="h6" className="mb-0">
//                                             € 44.00
//                                         </MDBTypography>
//                                         </MDBCol>
//                                         <MDBCol md="1" lg="1" xl="1" className="text-end">
//                                         <a href="#!" className="text-muted">
//                                             <MDBIcon fas icon="times" />
//                                         </a>
//                                         </MDBCol>
//                                     </MDBRow>

//                                     <hr className="my-4" />

//                                     <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
//                                         <MDBCol md="2" lg="2" xl="2">
//                                         <MDBCardImage
//                                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp"
//                                             fluid className="rounded-3" alt="Cotton T-shirt" />
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="3" xl="3">
//                                         <MDBTypography tag="h6" className="text-muted">
//                                             Shirt
//                                         </MDBTypography>
//                                         <MDBTypography tag="h6" className="text-black mb-0">
//                                             Cotton T-shirt
//                                         </MDBTypography>
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
//                                         <MDBBtn color="link" className="px-2">
//                                             <MDBIcon fas icon="minus" />
//                                         </MDBBtn>

//                                         <MDBInput type="number" min="0" defaultValue={1} size="sm" />

//                                         <MDBBtn color="link" className="px-2">
//                                             <MDBIcon fas icon="plus" />
//                                         </MDBBtn>
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="2" xl="2" className="text-end">
//                                         <MDBTypography tag="h6" className="mb-0">
//                                             € 44.00
//                                         </MDBTypography>
//                                         </MDBCol>
//                                         <MDBCol md="1" lg="1" xl="1" className="text-end">
//                                         <a href="#!" className="text-muted">
//                                             <MDBIcon fas icon="times" />
//                                         </a>
//                                         </MDBCol>
//                                     </MDBRow>

//                                     <hr className="my-4" />

//                                     <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
//                                         <MDBCol md="2" lg="2" xl="2">
//                                         <MDBCardImage
//                                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp"
//                                             fluid className="rounded-3" alt="Cotton T-shirt" />
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="3" xl="3">
//                                         <MDBTypography tag="h6" className="text-muted">
//                                             Shirt
//                                         </MDBTypography>
//                                         <MDBTypography tag="h6" className="text-black mb-0">
//                                             Cotton T-shirt
//                                         </MDBTypography>
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
//                                         <MDBBtn color="link" className="px-2">
//                                             <MDBIcon fas icon="minus" />
//                                         </MDBBtn>

//                                         <MDBInput type="number" min="0" defaultValue={1} size="sm" />

//                                         <MDBBtn color="link" className="px-2">
//                                             <MDBIcon fas icon="plus" />
//                                         </MDBBtn>
//                                         </MDBCol>
//                                         <MDBCol md="3" lg="2" xl="2" className="text-end">
//                                         <MDBTypography tag="h6" className="mb-0">
//                                             € 44.00
//                                         </MDBTypography>
//                                         </MDBCol>
//                                         <MDBCol md="1" lg="1" xl="1" className="text-end">
//                                         <a href="#!" className="text-muted">
//                                             <MDBIcon fas icon="times" />
//                                         </a>
//                                         </MDBCol>
//                                     </MDBRow>

//                                     <hr className="my-4" />

//                                     <div className="pt-5">
//                                         <MDBTypography tag="h6" className="mb-0">
//                                         <MDBCardText tag="a" href="#!" className="text-body">
//                                             <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
//                                             to shop
//                                         </MDBCardText>
//                                         </MDBTypography>
//                                     </div>
//                                     </div>
//                                 </MDBCol>
//                                 <MDBCol lg="4" className="bg-grey">
//                                     <div className="p-5">
//                                     <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
//                                         Summary
//                                     </MDBTypography>

//                                     <hr className="my-4" />

//                                     <div className="d-flex justify-content-between mb-4">
//                                         <MDBTypography tag="h5" className="text-uppercase">
//                                         items 3
//                                         </MDBTypography>
//                                         <MDBTypography tag="h5">€ 132.00</MDBTypography>
//                                     </div>

//                                     <MDBTypography tag="h5" className="text-uppercase mb-3">
//                                         Shipping
//                                     </MDBTypography>

//                                     <div className="mb-4 pb-2">
//                                         <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
//                                         <option value="1">Standard-Delivery- €5.00</option>
//                                         <option value="2">Two</option>
//                                         <option value="3">Three</option>
//                                         <option value="4">Four</option>
//                                         </select>
//                                     </div>

//                                     <MDBTypography tag="h5" className="text-uppercase mb-3">
//                                         Give code
//                                     </MDBTypography>

//                                     <div className="mb-5">
//                                         <MDBInput size="lg" label="Enter your code" />
//                                     </div>

//                                     <hr className="my-4" />

//                                     <div className="d-flex justify-content-between mb-5">
//                                         <MDBTypography tag="h5" className="text-uppercase">
//                                         Total price
//                                         </MDBTypography>
//                                         <MDBTypography tag="h5">€ 137.00</MDBTypography>
//                                     </div>

//                                     <MDBBtn color="dark" block size="lg">
//                                         Register
//                                     </MDBBtn>
//                                     </div>
//                                 </MDBCol>
//                                 </MDBRow>
//                             </MDBCardBody>
//                             </MDBCard>
//                         </MDBCol>
//                         </MDBRow>
//                     </MDBContainer>
//                 </section>
//             </div> */}
//         </div>
//     )
// }

import React, { useState } from 'react'

const ProductDetailsComponents = () => {
    const [images, setImages] = useState({
        img1 : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img2 : "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3 : "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4 : "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
    })

    const [activeImg, setActiveImage] = useState(images.img1)

    const [amount, setAmount] = useState(1);


    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                <div className='flex flex-row justify-between h-24'>
                    <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)}/>
                    <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)}/>
                    <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)}/>
                    <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)}/>
                </div>
            </div>
            {/* ABOUT */}
            <div className='flex flex-col gap-4 lg:w-2/4'>
                <div>
                    <span className=' text-violet-600 font-semibold'>Special Sneaker</span>
                    <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
                </div>
                <p className='text-gray-700'>
                Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi chilometri, Invincible 3 offre un livello di comfort elevatissimo sotto il piede per aiutarti a dare il massimo oggi, domani e oltre. Questo modello incredibilmente elastico e sostenitivo, è pensato per dare il massimo lungo il tuo percorso preferito e fare ritorno a casa carico di energia, in attesa della prossima corsa.
                </p>
                <h6 className='text-2xl font-semibold'>$ 199.00</h6>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsComponents;