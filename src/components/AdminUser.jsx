import React from 'react'
import { Button } from 'react-bootstrap'
import { GrAdd } from "react-icons/gr"
import TabelComponents from './TabelComponents'

const AdminUser = () => {
    return (
        <>
            <h1>Quản lí người dùng</h1>
            <div>
                <Button style={{backgroundColor: '#fff', width: '150px', height: '150px', fontSize:'40px'}}>
                    <GrAdd />
                </Button>
                <div>
                    <TabelComponents />
                </div>
                
            </div>
        </>
    )
}

export default AdminUser