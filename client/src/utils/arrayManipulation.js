export function convertArrayToObject(myArray) {
  let myObject = {}
  let arrayOfColumnNames = []

  for (let column in myArray[0]) {
    myObject[column] = []
    arrayOfColumnNames.push(column)
  }

  for (let tableRow of myArray) {
    for (let tableColumn of arrayOfColumnNames) {
      myObject[tableColumn].push(tableRow[tableColumn])
    }
  }

  return myObject
}

export function convertObjectToArray(myObject) {
  let myArray = []

  for (let column in myObject) {
    for (let index = 0; index < myObject[column].length; index++) {
      if (typeof myArray[index] === 'undefined') myArray[index] = {}
      myArray[index][column] = myObject[column][index]
    }
  }

  return myArray
}

export function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
