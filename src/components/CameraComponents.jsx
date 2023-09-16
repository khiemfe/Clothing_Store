import React from 'react'
import Webcam from 'react-webcam';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiCamera } from "react-icons/fi";
import { useRef } from "react"



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

export let linkSrc

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

    const countRef = useRef() 
    linkSrc = countRef.current ? countRef.current.src : undefined

    const countRefHidden = useRef() 
    const handleRemoveHidden = () => {
      handleClose()
      countRefHidden.current.classList.remove("hidden");
    }

    const handleAddHidden = () => {
      handleClose()
      countRefHidden.current.classList.add("hidden");
    }

    const handleShowAddHidden = () => {
      handleShow()
      countRefHidden.current.classList.add("hidden");
    }

    return (
      <>
        <Button variant="" onClick={handleShowAddHidden} className='btn-camera'>
            <FiCamera className='icon camera' />
        </Button>
        <img ref={countRefHidden} src={linkSrc} className='img-propose hidden' alt="" />
        <Modal show={show} onHide={handleAddHidden} size="lg">
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
            {show!=true && (
                <div>
                    <img 
                      ref={countRef}
                      src={show.toString()}
                    />
                </div>
            )}

            <Modal.Footer>
                {showClose && (
                <Button className='ok-pripose' variant="secondary" onClick={handleRemoveHidden}>
                    <a href="/propose">Ok</a>
                </Button>
                )}
            </Modal.Footer>
        </Modal>
      </>
    );
  };

export default CameraComponents