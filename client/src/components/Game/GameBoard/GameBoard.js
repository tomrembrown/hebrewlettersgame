import React from 'react'
import columnInfoArray from '../../../data/columnInfo.json'

const GameBoard = ({ gameDataUnique, randomDataColumn, clickLetterButton }) => {
  if (gameDataUnique === [] || randomDataColumn === '') return ''
  else {
    const columnInfo = columnInfoArray.filter(
      (column) => column.columnName === randomDataColumn
    )[0]

    return (
      <section id="game-question">
        <p>What is the {randomDataColumn} for this letter?</p>
        <div id="game-options">
          {gameDataUnique.map((letter) => {
            return (
              <button
                key={letter.id}
                onClick={() => clickLetterButton(letter.id)}
                className={columnInfo.className}
              >
                {letter.board}
              </button>
            )
          })}
        </div>
      </section>
    )
  }
}

export default GameBoard
