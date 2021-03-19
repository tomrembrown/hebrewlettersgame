import React from 'react'
import columnInfoArray from '../../../data/columnInfo.json'

const RandomChoice = ({
  dataSetChosen,
  randomLetterIndex,
  randomCharacterColumn,
}) => {
  if (
    randomLetterIndex < 0 ||
    randomCharacterColumn === '' ||
    dataSetChosen === []
  )
    return ''
  else {
    const guess = dataSetChosen[randomLetterIndex].guess
    const columnInfo = columnInfoArray.filter(
      (column) => column.columnName === randomCharacterColumn
    )[0]
    if (columnInfo.isImg) {
      return (
        <div>
          <div id="random-choice" className="modernCursiveHebrew">
            <img src={`../HebrewCursiveFont/${guess}.png`} alt={guess} />
          </div>
          <p className="charactername">{columnInfo.display} Character</p>
        </div>
      )
    } else if (columnInfo.isHTML) {
      return (
        <section id="random-choice">
          <div
            id="guess"
            className={columnInfo.className}
            dangerouslySetInnerHTML={{ __html: guess }}
          ></div>
          <p className="font-name">{columnInfo.display} Character</p>
        </section>
      )
    } else {
      return (
        <section id="random-choice">
          <div id="guess" className={columnInfo.className}>
            {guess}
          </div>
          <p className="font-name">{columnInfo.display} Character</p>
        </section>
      )
    }
  }
}

export default RandomChoice
