import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingComponents = ({ children, isLoading, delay = 200 }) => {
    return (
        <div>
             <ClipLoader
                // color={color}
                loading={isLoading}
                // cssOverride={override}
                size={50}
                // aria-label="Loading Spinner"
                // data-testid="loader"
                delay={delay}
            />
            {children}
        </div>
    )
}

export default LoadingComponents