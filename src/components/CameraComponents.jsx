import React, { useEffect } from 'react'
import Webcam from 'react-webcam'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FiCamera } from "react-icons/fi"
import { useWebcam } from "react-webcam";

// const CameraComponents = () => {
//     const webcamRef = React.useRef(null)
//     const [imgSrc, setImgSrc] = React.useState(null)
  
//     const capture = React.useCallback(() => {
//       const imageSrc = webcamRef.current.getScreenshot()
//       setImgSrc(imageSrc)
//     }, [webcamRef, setImgSrc])

//     const close = () => {

//     }
  
//     return (
//       <div className='webcam'>
//           <Webcam className='cam'
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//           />
//           <button onClick={capture}>Capture photo</button>
//           {imgSrc && (
//             <img
//               src={imgSrc}
//             />
//           )}
//           <button onClick={close}>Close</button>
//       </div>
//     )
// }


// export let linkSrc

const CameraComponents = () => {
  
  const webcamRef = React.useRef(null)
  const [show, setShow] = React.useState(false)
  const [showClose, setShowClose] = React.useState(false)
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setShow(imageSrc)
  }, [webcamRef, setShow])
  
  const handleShow = React.useCallback(() => setShow(true), [setShow])
  
  const handleClose = React.useCallback(
    () => {
      setShow(false)
      setShowClose(false)
    },
    [setShow, setShowClose]
    )
    const handleOnUserMedia = React.useCallback(() => setShowClose(true), [
      setShowClose
    ])

    if(show && show !== false && show !== true) {
      localStorage.setItem('img', JSON.stringify(show))
    }

    return (
      <>
        <Button variant="" onClick={handleShow} className='btn-camera'>
            <FiCamera className='icon camera' />
        </Button>
        {/* <img ref={countRefHidden} src={linkSrc} className='img-propose hidden' alt="" /> */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton={showClose}>
            <Modal.Title>
              CAMERA
              <span style={{display: 'block', fontStyle: 'italic'}}>*Lưu ý: Quý khách nên chụp hình từ bụng trở lên để được kết quả đề xuất chuẩn xác hơn</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Webcam
              mirrored={true}
              audio={false}
              onUserMedia={handleOnUserMedia}
              onUserMediaError={handleOnUserMedia}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </Modal.Body>
          
          <button className='btn-capture' onClick={capture}>Capture photo</button>
            {show!==true && (
                <>
                  <div style={{padding: '10px'}}>
                    <img 
                      alt=''
                      // ref={countRef}
                      src={show.toString()}
                    />
                  </div>
                  <Modal.Footer>
                      {showClose && (
                        <a href="/propose">
                          <Button className='ok-pripose' variant="secondary" onClick={handleClose}>
                              OK
                          </Button>
                        </a>
                      )}
                  </Modal.Footer>
                </>
            )}

        </Modal>
      </>
    )
  }

export default CameraComponents