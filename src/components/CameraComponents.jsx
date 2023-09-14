import React from 'react'
import Webcam from 'react-webcam';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    const [imgSrc, setImgSrc] = React.useState(null);
    
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
        <Button variant="primary" onClick={handleShow}>
          Launch Modal Webcam
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
          

          {/* <Webcam className='cam'
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          /> */}
          <button className='btn-capture' onClick={capture}>Capture photo</button>
            {show && (
                <img
                src={show}
                />
            )}


            <Modal.Footer>
                {showClose && (
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                )}
            </Modal.Footer>
        </Modal>
      </>
    );
  };

export default CameraComponents