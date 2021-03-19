import React from 'react'
import ToggleInput from './ToggleInput'
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
    <main id="setup">
      <ErrorModal
        exitErrorModal={exitErrorModal}
        isErrorModalShown={isErrorModalShown}
      >
        <p>{setupErrorMessage}</p>
      </ErrorModal>

      <h2>Setup</h2>
      <p>Points for Correct Answer: {baseScoreUnit}</p>
      <p>Penalty for Wrong Answer: {baseScoreUnit / 2}</p>

      <div className="layout">
        <section className="groupboxes data">
          <h3>Data Columns</h3>
          {columnInfoArray
            .filter((columnInfo) => columnInfo.columnType === 'data')
            .map((columnInfo) => (
              <ToggleInput
                key={columnInfo.columnName}
                display={columnInfo.display}
                name={columnInfo.columnName}
                changeSetup={changeSetup}
                isChecked={dataColumnsInTest.includes(columnInfo.columnName)}
              />
            ))}
        </section>
        <section className="groupboxes">
          <h3>Character Styles</h3>
          {columnInfoArray
            .filter((columnInfo) => columnInfo.columnType === 'character')
            .map((columnInfo) => (
              <ToggleInput
                key={columnInfo.columnName}
                display={columnInfo.display}
                name={columnInfo.columnName}
                changeSetup={changeSetup}
                isChecked={characterColumnsInTest.includes(
                  columnInfo.columnName
                )}
              />
            ))}
        </section>

        <section className="groupboxes">
          <h3>Randomize Board?</h3>
          <ToggleInput
            display={'Randomize'}
            name={'randomTest'}
            changeSetup={changeSetup}
            isChecked={randomTest}
          />
        </section>
      </div>
    </main>
  )
}

export default Setup
