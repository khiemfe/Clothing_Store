import React, { useState } from 'react'
import { getItem } from '../utils'
import { FaRegUser } from "react-icons/fa"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import HeaderComponents from '../components/HeaderComponents'
import LoadingComponents from '../components/LoadingComponents'
import { Menu } from 'antd'
import AdminUser from '../components/AdminUser'
import AdminProduct from '../components/AdminProduct'



const NotFoundPage = () => {

    const items = [
        getItem('Người dùng', 'user', <FaRegUser />),
        getItem('Sản phẩm', 'product', <SiHomeassistantcommunitystore />),
    ]

    // const rootSubmenuKeys = ['user', 'product']
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch(key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <></>
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    console.log('keySelected', keySelected)

    return (
        <div>
            <HeaderComponents />
            <div style={{ display: 'flex',overflowX: 'hidden' }}>
            <Menu
                mode="inline"
                style={{
                    width: 256,
                    boxShadow: '1px 1px 2px #ccc',
                    height: '100vh'
                }}
                items={items}
                onClick={handleOnClick}
                />
            <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                {renderPage(keySelected)}
            </div>
        </div>
        </div>
    )
}

export default NotFoundPage