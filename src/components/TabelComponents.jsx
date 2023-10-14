import React, { useState } from 'react'
import { Table } from 'antd'
import LoadingComponents from './LoadingComponents'

const TabelComponents = (props) => {
  
  const {selectionType = 'checkbox', dataTable=[], columns=[], products=[], isLoading=false, handleDeleteManyProduct } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  console.log('dataTable', dataTable)

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
      console.log(`selectedRowKeys: ${selectedRowKeys}`)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   name: record.name,
    // }),
  }

  const hanleDeleteAll = () => {
    handleDeleteManyProduct(rowSelectedKeys)
  }

  return (
      <>

        {/* <Divider /> */}
        <div className='loading'>
          <LoadingComponents isLoading={isLoading}>
          </LoadingComponents>
        </div>
        {rowSelectedKeys.length > 0 && (
          <div style={{cursor: 'pointer'}} onClick={hanleDeleteAll}>
          Xoá tất cả
        </div>
        )}
        
        <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataTable}
            {...props}
        />
      </>
    )
}

export default TabelComponents