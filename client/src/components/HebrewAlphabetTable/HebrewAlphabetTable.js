import React, { Component } from 'react'
import hebrewAlphabetData from '../../data/hebrewAlphabet.json'
import TableDataRow from './TableDataRow'
import {
  convertObjectToArray,
  convertArrayToObject,
} from '../../utils/arrayManipulation'
import columnInfoArray from '../../data/columnInfo.json'
import buildRowSpanObject from './buildRowSpanObject'
import sortData from './sortData'
import TableHeader from './TableHeader'

class HebrewAlphabetTable extends Component {
  constructor() {
    super()
    this.state = {
      sortColumn: 'position',
      isAscending: true,
    }
  }

  changeSortColumn = (newColumn) => {
    if (newColumn === this.state.sortColumn) {
      this.setState({ isAscending: !this.state.isAscending })
    } else {
      this.setState({ sortColumn: newColumn })
      this.setState({ isAscending: true })
    }
  }

  render() {
    const { sortColumn, isAscending } = this.state

    const hebrewAlphabetDataSorted = sortData(
      hebrewAlphabetData,
      sortColumn,
      isAscending
    )

    const hebrewAlphabetObject = convertArrayToObject(hebrewAlphabetDataSorted)

    const rowSpanObject = buildRowSpanObject(hebrewAlphabetObject)

    const rowSpanArray = convertObjectToArray(rowSpanObject)

    return (
      <main id="hebrew-alphabet">
        <h2>The Hebrew Alphabet</h2>
        <table className="alphabet-table">
          <caption>
            Paleo-Hebrew, Aramaic-Biblical, and Modern Cursive characters for
            Hebrew Alphabet, with letter values, names, meaning,
            transliteration, and pronunciation
          </caption>
          <colgroup span="4"></colgroup>
          <colgroup span="1"></colgroup>
          <colgroup span="1"></colgroup>
          <colgroup span="1"></colgroup>
          <colgroup span="1"></colgroup>
          <colgroup span="1"></colgroup>
          <colgroup span="1"></colgroup>
          <colgroup span="1"></colgroup>
          <TableHeader changeSortColumn={this.changeSortColumn} />
          <tbody>
            {hebrewAlphabetDataSorted.map((letter, index) => (
              <TableDataRow
                key={letter.id.toString()}
                columnInfoArray={columnInfoArray}
                rowSpan={rowSpanArray[index]}
                letter={letter}
              />
            ))}
          </tbody>
        </table>
      </main>
    )
  }
}

export default HebrewAlphabetTable
