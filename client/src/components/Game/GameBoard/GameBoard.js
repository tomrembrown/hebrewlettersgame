import React from 'react'
import './GameBoard.css'
import columnInfoArray from '../../../data/columnInfo.json'

const GameBoard = ({ gameDataUnique, randomDataColumn, clickLetterButton }) => {
  if (gameDataUnique === [] || randomDataColumn === '') return ''
  else {
    const columnInfo = columnInfoArray.filter(
      (column) => column.columnName === randomDataColumn
    )[0]

    return (
      <section id="game-question">
        <div id="question">What is the {randomDataColumn} for this letter?</div>
        <div id="options">
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
