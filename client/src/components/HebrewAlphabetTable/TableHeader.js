import React from 'react'
import FilterButton from './FilterButton'

const TableHeader = ({ changeSortColumn }) => {
  return (
    <thead>
      <tr>
        <th colSpan={4} scope="colgroup">
          Character
        </th>
        <th rowSpan={3}>
          <nobr>
            Power{' '}
            <FilterButton
              column={'power'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3} scope="col">
          <nobr>
            Position{' '}
            <FilterButton
              column={'position'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3} scope="col">
          <nobr>
            Value{' '}
            <FilterButton
              column={'value'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3} scope="col">
          <nobr>
            Name{' '}
            <FilterButton column={'name'} changeSortColumn={changeSortColumn} />
          </nobr>
        </th>
        <th rowSpan={3} scope="col">
          <nobr>
            Meaning{' '}
            <FilterButton
              column={'meaning'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3} scole="col">
          <nobr>
            Transliteration{' '}
            <FilterButton
              column={'transliteration'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3} scope="col">
          <nobr>
            Pronunciation{' '}
            <FilterButton
              column={'pronunciation'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
      </tr>
      <tr>
        <th rowSpan={2} scope="col">
          Paleo-
          <br />
          Hebrew
        </th>
        <th colSpan={2} scope="col">
          Aramaic-Biblical
        </th>
        <th rowSpan={2} scope="col">
          Modern
          <br />
          Cursive
        </th>
      </tr>
      <tr>
        <th scope="col">Serif</th>
        <th scope="col">Sans-serif</th>
      </tr>
    </thead>
  )
}

export default TableHeader
