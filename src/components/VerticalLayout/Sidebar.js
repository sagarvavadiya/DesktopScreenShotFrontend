import PropTypes from "prop-types"
import React, { useMemo, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.svg"
import logoLightPng from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-light.svg"
import logoDark from "../../assets/images/logo-dark.png"
import html2canvas from "html2canvas"
import axios from "axios"
import { useEffect } from "react"
import ScreenShotModel from "./ScreenShot"
import { getCurrentActiveDisplay } from "./CurrentActiveScreen"

let coort = {
  x: 0,
  y: 0,
}

const Sidebar = props => {
  const [screnshot, setScreenShot] = useState()
  const [screen, setScreen] = useState(localStorage.getItem("screen"))
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(localStorage.getItem("start"))
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleWindowMouseMove = event => {
      // setCoords({
      //   x: event.clientX,
      //   y: event.clientY,
      // })
      coort.x = event.clientX
      coort.y = event.clientY
    }
    window.addEventListener("mousemove", handleWindowMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove)
    }
  }, [coords, show, coort.x])

  // console.log(coords)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  function captureScreen() {
    html2canvas(document.body).then(function (canvas) {
      // Convert the canvas to an image and open it in a new tab
      var screenshot = canvas.toDataURL()
      var link = document.createElement("a")
      link.href = screenshot
      link.target = "_blank"
      link.download = "screenshot.png"
      link.click()
    })
  }

  const canIRun = navigator.mediaDevices.getDisplayMedia

  const takeDesktopScreenShotFromFrontEnd = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource: "screen",
        cursor: "never", // Hide cursor to avoid user interaction
      },
      // preferCurrentTab: true,
    })
    console.log("stream==>", stream)
    const track = stream.getVideoTracks()[0]
    const imageCapture = new ImageCapture(track)
    const bitmap = await imageCapture.grabFrame()
    track.stop()

    const canvas = document.createElement("canvas")
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const context = canvas.getContext("2d")
    context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
    const image = canvas.toDataURL("image/jpeg")

    const res = await fetch(image)
    const buff = await res.arrayBuffer()
    const file = [
      new File([buff], `photo_${new Date()}.jpg`, {
        type: "image/jpeg",
      }),
    ]
    console.log("file", file)
    setScreenShot(file[0])
    return file
  }

  // Call the function to start recording
  const TakeScreenShot = async event => {
    await axios
      .get("http://localhost:5020", {})
      .then(response => {
        localStorage.setItem("bufferImg", response.data.image),
          console.log(response.data)
        switch (screen) {
          case "screen1":
            setScreenShot([response.data.image[1]])
            console.log(screen)
            break
          case "screen2":
            setScreenShot([response.data.image[0]])
            console.log(screen)
            break
          case "all":
            setScreenShot(response.data.image)
            console.log(screen)
            break
          default:
            coort.x < 15
              ? setScreenShot([response.data.image[1]])
              : setScreenShot([response.data.image[0]])

            break
        }
        // setScreenShot(response.data.image)

        localStorage.setItem("image", JSON.stringify(response.data.image))
        setShow(true)
      })
      .catch(error => console.log(error))
  }

  const StartScreenshot = () => { 
    if (start == "off") {
      setStart("on")
      localStorage.setItem("start", "on") 
    } else {
      setStart("off")
      localStorage.removeItem("screen")
      setScreen("")
      localStorage.setItem("start", "off") 
    }
  }

  useEffect(() => {
    let StartFunction
    if (localStorage.getItem("start") == "on") {
      StartFunction = setInterval(() => {
        TakeScreenShot()
      }, 5000)
    }

    return () => {
      clearInterval(StartFunction)
    }
  }, [start])

  if (show) {
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }
  const handleChange = e => {
    setScreen(e.target.name)
    localStorage.setItem("screen", e.target.name)
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          {/* <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="17" />
            </span>
          </Link> */}

          <label
            className="logo logo-light"
            htmlFor="inputPics"
            // onClick={takeDesktopScreenShotFromFrontEnd}
          >
            <span className="logo-sm">
              <img src={logoLightPng} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="19" />
            </span>
            <div>
              <button
                className={`btn ${start == "on" ? "btn-dark" : "btn-success"}`}
                onClick={StartScreenshot}
              >
                {`${start == "on" ? "Stop" : "Start"}`}
              </button>
            </div>
          </label>
          <div className={`${start == "on" ? "displayNone" : ""}`}>
            <div className="flexEvenly mt-2" onClick={handleChange}>
              <div className="flexStart">
                <input
                  type="radio"
                  name="screen1"
                  checked={screen == "screen1"}
                  id=""
                  onChange={handleChange}
                />{" "}
                <span className="text-light">Screen 1</span>
              </div>
              <div className="flexStart">
                <input
                  type="radio"
                  checked={screen == "screen2"}
                  name="screen2"
                  id=""
                  onChange={handleChange}
                />{" "}
                <span className="text-light">Screen 2</span>
              </div>
              <div className="flexStart">
                <input
                  type="radio"
                  checked={screen == "all"}
                  name="all"
                  id=""
                  onChange={handleChange}
                />{" "}
                <span className="text-light">Both</span>
              </div>
            </div>
          </div>
        </div>

        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
      <ScreenShotModel
        image={screnshot}
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
      />
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
