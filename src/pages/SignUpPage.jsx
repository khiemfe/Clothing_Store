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
import LoadingComponents from '../components/LoadingComponents'
import { useMutationHook } from '../hooks/useMutationHook'
import { useNavigate } from 'react-router-dom'
import { success, error, warning } from '../components/Message'




const SignUpPage = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const mutation = useMutationHook(data => UserServcie.signupUser(data))
    const { data, isLoading, isSuccess, isError } = mutation
    console.log(mutation)
    useEffect(() => {
      if(isSuccess && data?.status !== 'ERR') {
        success()
        handleNavigateSignIn()
      }
      else if(isError) {
        error()
        console.log('er')
      }
    }, [isSuccess, isError])

    const handleOnChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const handleOnChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleOnChangeConfirmPassword = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
    }

    const handleSignUp = () => {
        mutation.mutate({
          email,
          password,
          confirmPassword
        })
        console.log('sign-up', email, password, confirmPassword)
    }

    const navigate = useNavigate()
    const handleNavigateSignIn = () => {
      navigate('/sign-in')
    }

    return (
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                    {/* <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg"/> */}
                    <MDBInput wrapperClass='mb-4' onChange={handleOnChangeEmail} label='Email address' id='formControlLg' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4' onChange={handleOnChangePassword} label='Password' id='formControlLg' type='password' size="lg"/>
                    <MDBInput wrapperClass='mb-4' onChange={handleOnChangeConfirmPassword} label='Confirm Password' id='formControlLg' type='password' size="lg"/>
                  { data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span> }
                  <LoadingComponents isLoading={isLoading}>
                    <MDBBtn disabled={!email || !password || !confirmPassword} onClick={handleSignUp} className="mb-4 px-5" color='dark' size='lg'>Sign Up</MDBBtn>
                  </LoadingComponents>
                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/sign-in" style={{color: '#393f81'}}>Login</a></p>
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

export default SignUpPage