import determineRowSpan from './determineRowSpan'

export default function buildRowSpanObject(hebrewAlphabetObject) {
  let rowSpanObject = {}
  const numRows = hebrewAlphabetObject['position'].length

  for (let column in hebrewAlphabetObject) {
    rowSpanObject[column] = []
    for (
      let outerRowCounter = 0;
      outerRowCounter < numRows;
      outerRowCounter++
    ) {
      rowSpanObject[column].push(
        determineRowSpan(
          outerRowCounter,
          numRows,
          hebrewAlphabetObject[column],
          hebrewAlphabetObject['position']
        )
      )
    }
  }

  return rowSpanObject
}
