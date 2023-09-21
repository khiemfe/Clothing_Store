import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import LoadingComponents from './LoadingComponents';



const TabelComponents = (props) => {
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const {selectionType = 'checkbox', dataTable=[], columns=[], products=[], isLoading=false } = props

  return (
      <LoadingComponents isLoading={isLoading}>
        {/* <Divider /> */}

        <Table
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={dataTable}
        />
      </LoadingComponents>
    )
}

export default TabelComponents