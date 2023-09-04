const carData = [
  { tata: ["ta", "tb"] },
  { maruti: ["ma", "mb"] },
  { cdi: ["ca", "cb"] },
  { tata: ["tc"] },
]

function combineValuesByKeys(arr) {
  return arr.reduce((result, obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (result.hasOwnProperty(key)) {
          // If the key already exists in the result object, push the value to the array
          result[key].push(obj[key])
        } else {
          // If the key doesn't exist, create a new array with the value
          result[key] = [obj[key]]
        }
      }
    }
    return result
  }, {})
}

const resultObj = combineValuesByKeys(carData)
console.log(resultObj)
