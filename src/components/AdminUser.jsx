import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import TabelComponents from './TabelComponents'
import { Form } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { getBase64 } from '../utils'
import * as userServices from '../services/userServices'
import { useMutationHook } from '../hooks/useMutationHook'
import LoadingComponents from '../components/LoadingComponents'
import { success, error, warning } from '../components/Message'
import { useQuery } from '@tanstack/react-query'
import { MdDeleteOutline } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"
import DrawerComponent from './DrawerComponent'
import ModelBodyUserComponent from './ModelBodyUserComponent'
import { useSelector } from 'react-redux'
import ModelComponent from './ModelComponent'
import { Input } from 'antd'
import { Space } from 'antd'
// import { getAllUser } from '../services/userServices'

const AdminUser = () => {
    // const [form] = Form.useForm()
    const [formUpdate] = Form.useForm()
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const user = useSelector((state) => state?.user)
    const [isModelOpenDelete, setIsModelOpenDelete] = useState(false)
    const searchInput = useRef(null)
    
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
        address: '',
      })
  
    const mutationUpdate = useMutationHook(
      (data) => {
        console.log('dataUpdate: ', data)
        const { id, token, ...rest } = data
        const res = userServices.updateUser(id, {...rest}, token)
        console.log('resssss', res)
        return res
      }
    )

    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    console.log('mutationUpdate', mutationUpdate)
  
    const mutationDelete = useMutationHook(
        (data) => {
            const { id, token} = data
            const res = userServices.deleteUser(id, token)
            return res
        }
    )

    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDelete

    const mutationDeleteMany = useMutationHook(
        (data) => {
          const { token, ...ids} = data
          const res = userServices.deleteManyUser(ids, token)
          return res
        }
      )
    
      const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeleteMany
    
      const handleDeleteManyUser = (ids) => {
        console.log(ids) // ids là tất cả các id mà muốn xoá
        mutationDeleteMany.mutate({ids: ids, token: user?.access_token}, {
          //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
            onSettled: () => {
            queryUser.refetch()
          }
        })
      }

    useEffect(() => {
        if(isSuccessUpdated && dataUpdated?.status === 'OK') {
        success()
        onCloseDrawer()
        } else if(isErrorUpdated) {
        error()
        }
    }, [isSuccessUpdated])

    useEffect(() => {
        if(isSuccessDeleted && dataDeleted?.status === 'OK') {
        success()
        handleCanelDelete()
        } else if(isErrorDeleted) {
      error()
    }
  }, [isSuccessDeleted])

    useEffect(() => {
        if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
        success()
        // onClose()
        } else if(isErrorDeletedMany) {
        error()
        }
    }, [isSuccessDeletedMany])

    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateUserDetails({
            ...stateUserDetails,
            image: file.preview
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    // --------------


    const getAllUsers = async () => {
        const res = await userServices.getAllUser()
        return res
      }
  
      const queryUser = useQuery(['user'], getAllUsers)
      const { data:dataUser, isLoading:isLoadingUser } = queryUser
  
      const fetchGetDetailsUser = async (rowSelected) => {
        const res = await userServices.getDetailsUser(rowSelected)
        if(res?.data) {
          setStateUserDetails({
            name: res?.data?.name,
            email: res?.data?.email,
            isAdmin: res?.data?.isAdmin,
            phone: res?.data?.phone,
            address: res?.data?.address,
          })
        }
        setIsLoadingUpdate(false)
      }
  
      console.log('stateUserDetails', stateUserDetails)
  
      useEffect(() => {
        if(rowSelected && isOpenDrawer) { //khi có id và mở drawer ra
          fetchGetDetailsUser(rowSelected) //nếu có nó mới gọi, để khi click lần đầu là đc luôn
        }
      }, [rowSelected, isOpenDrawer])
  
      // hiển thị value trong thẻ input khi bấm vào sửa
      useEffect(() => {
        // setIsLoadingUpdate(true)
        if (formUpdate.__INTERNAL__.name) {
          formUpdate.setFieldsValue(stateUserDetails)
        }
      }, [formUpdate, stateUserDetails])
  
      const handleDetailsUser = () => {
        if(rowSelected) {
          setIsLoadingUpdate(true)
          // fetchGetDetailsUser(rowSelected)
        }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
      }
  
      const onUpdateUser = () => {
        //...stateUserDetails nó mới cập nhật lại thành công
        mutationUpdate.mutate({id: rowSelected, ...stateUserDetails, token: user?.access_token}, { 
          //onSettled & queryUser.refetch() nó mới cập nhật lại không cần load lại trang
          onSettled: () => {
            queryUser.refetch()
          }
        })
        console.log('stateUserDetailss', stateUserDetails)
      }
  
      const onCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateUserDetails({
          name: '',
          email: '',
          isAdmin: false,
          phone: '',
          address: '',
        })
        formUpdate.resetFields()
    }
  
      const handleCanelDelete = () => {
        setIsModelOpenDelete(false)
      }
  
      const handleDeleteUser = () => {
        mutationDelete.mutate({id: rowSelected, token: user?.access_token}, {
           //onSettled & queryUser.refetch() nó mới cập nhật lại không cần load lại trang
           onSettled: () => {
            queryUser.refetch()
          }
        })
      }
  
      const renderAction = () => {
        return (
            <div>
              <AiOutlineEdit style={{cursor: 'pointer', fontSize: '24px'}} onClick={handleDetailsUser}/>
              <MdDeleteOutline style={{cursor: 'pointer', fontSize: '24px'}} onClick={() => {
                  setIsModelOpenDelete(true)
                  console.log('da ok')
                }}
              />
            </div>
        )
      }
  
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        // setSearchText(selectedKeys[0])
        // setSearchedColumn(dataIndex)
      }
  
      const handleReset = (clearFilters) => {
        clearFilters()
        // setSearchText('')
      }
  
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close()
                }}
              >
                <CloseOutlined />
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100)
          }
        },
      })
  
      const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                  text: 'True',
                  value: 'TRUE',
                },
                {
                  text: 'False',
                  value: 'FALSE',
                }
              ],
              onFilter: (value, record) => record.isAdmin.includes(value),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            ...getColumnSearchProps('address')
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
      ]
      const dataTable = dataUser?.data?.length && dataUser?.data?.map((user) => {
        return {...user, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE', key: user._id}
      })
    return (
        <>
            <h1 style={{textTransform: 'uppercase', margin: '10px 0 20px 0'}}>Quản lí người dùng</h1>
            <div className='adminProduct'>
                <div className='body-product'>
                    <TabelComponents 
                      handleDeleteManyProduct={handleDeleteManyUser} 
                      columns={columns} dataTable={dataTable} 
                      products={dataUser?.data} 
                      isLoading={isLoadingUser} 
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: () => {
                            setRowSelected(record._id)
                          }
                        }
                      }}
                    />
                </div>
                <div>
                  <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                    <LoadingComponents isLoading={isLoadingUpdate}>
                      <ModelBodyUserComponent 
                        stateUser={stateUserDetails} 
                        form={formUpdate} 
                        handleOnchange={handleOnchangeDetails} 
                        handleOnchangeAvatar={handleOnchangeAvatarDetails} 
                        onFinish={onUpdateUser} 
                        isLoading={isLoadingUpdated}
                        title='Update'
                      />
                    </LoadingComponents>
                  </DrawerComponent>
                </div>
                <div>
                  <ModelComponent title='Xoá người dùng' isModalOpen={isModelOpenDelete} onCancel={handleCanelDelete} onOk={handleDeleteUser}>
                    <LoadingComponents isLoading={isLoadingDeleted}>
                      <div>Bạn có chắc muốn xoá người dùng này không?</div>
                    </LoadingComponents>
                  </ModelComponent>
                </div>
                
            </div>
        </>
    )
}

export default AdminUser