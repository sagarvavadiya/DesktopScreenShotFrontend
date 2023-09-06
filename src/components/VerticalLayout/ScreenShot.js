import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function ScreenShotModel({
  show,
  handleClose,
  handleShow,
  image,
  timestamp,
  memo,
}) {
  const ApiResponse = {
    id: 1,
    screenshot: image,
    description: memo,
    time: timestamp,
  }

  useEffect(() => {
    if (show) {
      console.log(ApiResponse)
    }
  }, [show])
  return (
    <>
      {image ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title onClick={() => console.log(imgArray)}>
              ScreenShot
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div>
              {/* <img style={{ width: `100%` }} src={image[0]} alt="" />
               */}
              <img
                style={{ width: `100%` }}
                src={image[0] ?? image[0]}
                alt=""
              />{" "}
              <br />
              <img
                style={{ width: `100%` }}
                src={image[1] ?? image[1]}
                alt=""
              />
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  )
}

export default ScreenShotModel
