import React from 'react'
import './Setup.css'
import CheckBox from './CheckBox'
import columnInfoArray from '../../data/columnInfo.json'
import ErrorModal from './ErrorModal/ErrorModal'

const Setup = ({
  baseScoreUnit,
  changeSetup,
  characterColumnsInTest,
  dataColumnsInTest,
  randomTest,
  exitErrorModal,
  isErrorModalShown,
  setupErrorMessage,
}) => {
  return (
    <div id="setup">
      <ErrorModal
        exitErrorModal={exitErrorModal}
        isErrorModalShown={isErrorModalShown}
      >
        <p>{setupErrorMessage}</p>
      </ErrorModal>

      <h1>Setup</h1>
      <p>Points for Correct Answer: {baseScoreUnit}</p>
      <p>Penalty for Wrong Answer: {baseScoreUnit / 2}</p>

      <div className="layout">
        <div className="groupboxes data">
          <h2>Data Columns</h2>
          {columnInfoArray
            .filter((columnInfo) => columnInfo.columnType === 'data')
            .map((columnInfo) => (
              <CheckBox
                key={columnInfo.columnName}
                display={columnInfo.display}
                name={columnInfo.columnName}
                changeSetup={changeSetup}
                isChecked={dataColumnsInTest.includes(columnInfo.columnName)}
              />
            ))}
        </div>
        <div className="groupboxes">
          <h2>Character Styles</h2>
          {columnInfoArray
            .filter((columnInfo) => columnInfo.columnType === 'character')
            .map((columnInfo) => (
              <CheckBox
                key={columnInfo.columnName}
                display={columnInfo.display}
                name={columnInfo.columnName}
                changeSetup={changeSetup}
                isChecked={characterColumnsInTest.includes(
                  columnInfo.columnName
                )}
              />
            ))}
        </div>

        <div className="groupboxes">
          <h2>Randomize Board?</h2>
          <CheckBox
            display={'Randomize'}
            name={'randomTest'}
            changeSetup={changeSetup}
            isChecked={randomTest}
          />
        </div>
      </div>
    </div>
  )
}

export default Setup
