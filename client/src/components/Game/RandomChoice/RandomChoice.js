import React from 'react'
import './RandomChoice.css'
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
        <div>
          <div
            id="random-choice"
            className={columnInfo.className}
            dangerouslySetInnerHTML={{ __html: guess }}
          ></div>
          <p className="charactername">{columnInfo.display} Character</p>
        </div>
      )
    } else {
      return (
        <div>
          <div id="random-choice" className={columnInfo.className}>
            {guess}
          </div>
          <p className="charactername">{columnInfo.display} Character</p>
        </div>
      )
    }
  }
}

export default RandomChoice
