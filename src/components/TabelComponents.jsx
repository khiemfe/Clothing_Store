import React from 'react'
import { Table } from 'antd'
import LoadingComponents from './LoadingComponents'

const TabelComponents = (props) => {
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  }

  const {selectionType = 'checkbox', dataTable=[], columns=[], products=[], isLoading=false } = props

  return (
      <>

        {/* <Divider /> */}
        <div className='loading'>
        <LoadingComponents isLoading={isLoading}>
          </LoadingComponents>
        </div>
        <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataTable}
        />
      </>
    )
}

export default TabelComponents