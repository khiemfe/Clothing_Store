import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit'
import * as UserServcie from '../services/userServices'
import { useMutationHook } from '../hooks/useMutationHook'
import LoadingComponents from '../components/LoadingComponents'
import { useNavigate } from 'react-router-dom'
// import * as message from '../components/Message'
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/userSlice'

const SignInPage = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const mutation = useMutationHook(data => UserServcie.loginUser(data))
    console.log('mutation', mutation)

    const { data, isLoading, isSuccess, isError } = mutation
    console.log(data, isLoading)

    useEffect(() => {
      if(isSuccess && data?.status !== 'ERR') {
        // message.success() 
        handleNavigateHome()
        localStorage.setItem('access_token', JSON.stringify(data?.access_token))
        // localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
        if(data?.access_token) {
          const decoded = jwt_decode(data?.access_token)
          console.log('decoded', decoded)
          if(decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.access_token)
          }
        }
      }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
      // const storage = localStorage.getItem('refresh_token')
      // const refreshToken = JSON.parse(storage)
      const res = await UserServcie.getDetailsUser(id, token)
      dispatch(updateUser({...res?.data, access_token: token}))
      console.log('lllllll', token)
      console.log('res', res)
    }

    const handleOnChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const handleOnChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleSignIn = (e) => {
      mutation.mutate({
        email,
        password
      })
      console.log('sign-in', email, password)
    }

    const navigate = useNavigate()
    const handleNavigateHome = () => {
      navigate('/')
    }

    return (
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <MDBCardImage src='https://binbadecor.vn/wp-content/uploads/2022/03/thiet-ke-shop-quan-ao-2.jpg ' alt="login form" className='rounded-start w-100'/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                    <MDBInput wrapperClass='mb-4' onChange={handleOnChangeEmail} label='Email address' id='formControlLg' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4' onChange={handleOnChangePassword} label='Password' id='formControlLg' type='password' size="lg"/>
                  { data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span> }
                  <LoadingComponents isLoading={isLoading}>
                    <MDBBtn disabled={!email || !password} onClick={handleSignIn} className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                  </LoadingComponents>
                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/sign-up" style={{color: '#393f81'}}>Register here</a></p>
                  <div className='d-flex flex-row justify-content-start'>
                    <a href="#!" className="small text-muted me-1">Terms of use.</a>
                    <a href="#!" className="small text-muted">Privacy policy</a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      )
}

export default SignInPage