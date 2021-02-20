export default function determineRowSpan(
  outerRowCounter,
  numRows,
  columnData,
  positionData
) {
  if (
    outerRowCounter > 0 &&
    columnData[outerRowCounter] === columnData[outerRowCounter - 1] &&
    positionData[outerRowCounter] === positionData[outerRowCounter - 1]
  )
    return 0
  else {
    let rowSpan = 1
    let innerRowCounter = outerRowCounter + 1
    while (
      columnData[innerRowCounter] === columnData[outerRowCounter] &&
      positionData[innerRowCounter] === positionData[outerRowCounter] &&
      innerRowCounter < numRows
    ) {
      innerRowCounter++
      rowSpan++
    }
    return rowSpan
  }
}
