import React from 'react'
import { ClipLoader, PuffLoader  } from 'react-spinners'
import { Alert, Space, Spin } from 'antd';

const LoadingComponents = ({ children, isLoading, delay = 200 }) => {
    return (
        <div >
             <span className='loading-component'>
                <ClipLoader className='loading'
                    color='#36d7b7'
                    loading={true}
                    // CSSProperties={override}
                    size={30}
                    // aria-label="Loading Spinner"
                    // data-testid="loader"
                    delay={delay}
                />
                {/* <Spin tip={isLoading} delay={delay}>
                    <div className="content" />
                </Spin> */}
             </span>
            {children}
        </div>
    )
}

export default LoadingComponents



