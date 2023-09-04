export function getCurrentActiveDisplay() {
  // Get the mouse pointer's coordinates
  const screens = window.screen || {}
  const screenArray = Array.isArray(screens) ? screens : [screens]

  return screenArray.map((screen, index) => ({
    index: index,
    width: screen.width,
    height: screen.height,
    orientation: screen.orientation,
  }))
}

// Example usage
