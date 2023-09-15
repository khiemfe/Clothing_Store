import React from 'react'
import Webcam from 'react-webcam';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiCamera } from "react-icons/fi";


// const CameraComponents = () => {
//     const webcamRef = React.useRef(null);
//     const [imgSrc, setImgSrc] = React.useState(null);
  
//     const capture = React.useCallback(() => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImgSrc(imageSrc);
//     }, [webcamRef, setImgSrc]);

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
//     );
// }

const CameraComponents = () => {

    const webcamRef = React.useRef(null);
    const [show, setShow] = React.useState(false);
    const [showClose, setShowClose] = React.useState(false);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setShow(imageSrc);
    }, [webcamRef, setShow]);
    
    const handleShow = React.useCallback(() => setShow(true), [setShow]);
  
    const handleClose = React.useCallback(
      () => {
        setShow(false);
        setShowClose(false);
      },
      [setShow, setShowClose]
    );
  
    const handleOnUserMedia = React.useCallback(() => setShowClose(true), [
      setShowClose
    ]);
  
    return (
      <>
        <Button variant="" onClick={handleShow} className='btn-camera'>
            <FiCamera className='icon camera' />
        </Button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton={showClose}>
            <Modal.Title>React Webcam Modal Example</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Webcam
              audio={false}
              onUserMedia={handleOnUserMedia}
              onUserMediaError={handleOnUserMedia}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </Modal.Body>
          
          <button className='btn-capture' onClick={capture}>Capture photo</button>
            {show && (
                <div>
                    <img
                    src={show}
                    />
                    <div className='webcam'>
                    <a className='Ok' href="/propose">OK</a>
                  </div>
                </div>
            )}

            <Modal.Footer>
                {showClose && (
                <Button className='close' variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                )}
            </Modal.Footer>
        </Modal>
      </>
    );
  };

export default CameraComponents