import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { useDispatch, useSelector } from 'react-redux'
import * as UserServcie from '../services/userServices'
import { useMutationHook } from '../hooks/useMutationHook'
import LoadingComponents from '../components/LoadingComponents'
import { success, error, warning } from '../components/Message'
import { updateUser } from '../redux/slices/userSlice'
import { getBase64 } from '../utils'
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const ProfilePage = () => {
    
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    console.log('aaaaaa', user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHook(
        data => {
            const { id, access_token, ...rest } = data
            UserServcie.updateUser(id, rest, access_token)
        }
    )
    const { data, isLoading, isSuccess, isError } = mutation
    console.log('kkkkkkkkk', data)

    useEffect(() => {
        if(isSuccess && data?.status !== 'ERR') {
          success()
          handleGetDetailsUser(user?.id, user?.access_token)
        }
        else if(isError) {
          error()
          console.log('er')
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserServcie.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
      }
    
    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    const handleOnchangeName = (e) => {
        setName(e.target.value)
    }

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleOnchangePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    console.log(avatar)

    const handleUpdate = () => {
        mutation.mutate({id: user?.id, name, email, phone, address, avatar, access_token: user?.access_token })
        console.log('update', name, email, phone, address, avatar)
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        handleUpdate()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    return (
        <div>
            <h1>Thông tin người dùng</h1>
            <LoadingComponents isLoading={isLoading}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            // required
                            value={name}
                            type="text"
                            onChange={handleOnchangeName}
                            placeholder="Name?"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            // required
                            value={email}
                            type="email"
                            onChange={handleOnchangeEmail}
                            placeholder="email@gmail.com"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Phone</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                value={phone}
                                type="number"
                                onChange={handleOnchangePhone}
                                placeholder="Phone?"
                                // required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            value={address}
                            type="text" 
                            onChange={handleOnchangeAddress}
                            placeholder="Address" 
                            // required 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Avatar</Form.Label>
                        {/* <Form.Control 
                            type="file" 
                            onChange={handleOnchangeAvatar}
                        /> */}
                        <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload> 
                        {avatar && (
                            <img src={avatar} alt="avatar" style={{width: '60px', objectFit: 'cover'}} />
                        )}
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                {/* <Button type="submit">Submit form</Button> */}
                <Button onClick={handleUpdate}>Update form</Button>
                </Form>
            </LoadingComponents>
        </div>
    )
}

export default ProfilePage