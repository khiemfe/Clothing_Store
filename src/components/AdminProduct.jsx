import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { GrAdd } from "react-icons/gr"
import TabelComponents from './TabelComponents'
import Modal from 'react-bootstrap/Modal';
import { Form, Input, Upload } from 'antd';
import { getBase64 } from '../utils';
import { UploadOutlined } from '@ant-design/icons';
import * as ProducttServcie from '../services/ProductServices'
import { useMutationHook } from '../hooks/useMutationHook'
import LoadingComponents from '../components/LoadingComponents'
import { success, error, warning } from '../components/Message'
import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"


function MyVerticallyCenteredModal(props) {

  const [form] = Form.useForm();
  const [isModelOpen, setIsModalOpen] = useState(false)
  const [stateProduct, setStateProduct] = useState({
    name: '',
          image: '',
          type: '',
          price: '',
          age: '',
          bmi: '',
        })
      
      const mutation = useMutationHook(
        (data) => {
        console.log(data)
        const { name, image, type, price, age, bmi } = data
        const res = ProducttServcie.createProduct({ name, image, type, price, age, bmi })
        return res
      }
    )

    const { data, isLoading, isSuccess, isError } = mutation 
    useEffect(() => {
      if(isSuccess && data?.status === 'OK') {
        success()
        onClose()
      } else if(isError) {
        error()
      }
    }, [isSuccess])
    
        const handleOnchangeAvatar = async ({fileList}) => {
            const file = fileList[0]
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateProduct({
                ...stateProduct,
                image: file.preview
            })
        }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const onFinish = () => {
        if(stateProduct.name !== '' && stateProduct.image !== '' && stateProduct.type !== '' && stateProduct.price !== '' && stateProduct.age !== '' && stateProduct.bmi !== '') {
            console.log('Success:', stateProduct);
        } else {
            console.log('err stateProduct');
        }
        
        mutation.mutate(stateProduct)
    };

    const onClose = () => {
        // setIsModalOpen(false);
        setStateProduct({
            image: '', //xóa image
        })
        form.resetFields() //xóa các label
        props.onHide() //đóng form
    }
      
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // open={isModelOpen}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tạo sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
          //   onFinish={onFinish}
          // //   onFinishFailed={onFinishFailed}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input onChange={handleOnchange}  name='name'/>
            </Form.Item>
            {/* name, image, type, price, countInStock, rating, description */}
            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your type!',
                },
              ]}
            >
              <Input onChange={handleOnchange} name='type'/>
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <Input onChange={handleOnchange}  name='price'/>
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: 'Please input your age!',
                },
              ]}
            >
              <Input onChange={handleOnchange}  name='age'/>
            </Form.Item>

            <Form.Item
              label="BMI"
              name="bmi"
              rules={[
                {
                  required: true,
                  message: 'Please input your bmi!',
                },
              ]}
            >
              <Input onChange={handleOnchange}  name='bmi'/>
            </Form.Item>

            <Form.Item
              label="Upload"
              name="upload"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: stateProduct?.image ? '' : 'Please input your image!',
                },
              ]}
            >
            <Upload name='image' onChange={handleOnchangeAvatar} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload> 
              {stateProduct?.image && (
                  <img src={stateProduct?.image} alt="image" style={{width: '60px', objectFit: 'cover'}} />
              )}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={onFinish} type='submit' >
                Submit
              </Button>
            </Form.Item>
          </Form>
            <div className='loading'>
              <LoadingComponents isLoading={isLoading}></LoadingComponents>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} aria-label="Close">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const AdminProduct = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const getAllProducts = async () => {
      const res = await ProducttServcie.getAllProduct()
      return res
    }
    const { data, isLoading } = useQuery(['products'], getAllProducts, )
    console.log('data', data)

    const renderAction = () => {
      return (
          <div>
            <AiOutlineEdit style={{cursor: 'pointer', fontSize: '24px'}}/>
            <MdDeleteOutline style={{cursor: 'pointer', fontSize: '24px'}} />
          </div>
      )
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'BMI',
        dataIndex: 'bmi',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: renderAction,
      },
    ];
    const dataTable = data?.data?.length && data?.data?.map((product) => {
      console.log(product?.price + '.000đ')
      return {...product, price: product?.price + '.000đ', key: product._id}
    })

    return (
        <>
            <h1>Quản lí sản phẩm</h1>
            <div className='adminProduct'>
                <Button onClick={() => setModalShow(true)} style={{backgroundColor: '#fff', width: '150px', height: '150px', fontSize:'40px'}}>
                    <GrAdd />
                </Button>
                <div className='body-product'>
                    <TabelComponents columns={columns} dataTable={dataTable} products={data?.data} isLoading={isLoading} />
                </div>
                <div className='createProduct'>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </>
    )
}

export default AdminProduct