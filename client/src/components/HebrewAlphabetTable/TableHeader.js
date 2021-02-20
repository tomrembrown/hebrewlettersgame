import React from 'react'
import FilterButton from './FilterButton'

const TableHeader = ({ changeSortColumn }) => {
  return (
    <thead>
      <tr>
        <th colSpan={4}>Character</th>
        <th rowSpan={3}>
          <nobr>
            Power{' '}
            <FilterButton
              column={'power'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3}>
          <nobr>
            Position{' '}
            <FilterButton
              column={'position'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3}>
          <nobr>
            Value{' '}
            <FilterButton
              column={'value'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3}>
          <nobr>
            Name{' '}
            <FilterButton column={'name'} changeSortColumn={changeSortColumn} />
          </nobr>
        </th>
        <th rowSpan={3}>
          <nobr>
            Meaning{' '}
            <FilterButton
              column={'meaning'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3}>
          <nobr>
            Transliteration{' '}
            <FilterButton
              column={'transliteration'}
              changeSortColumn={changeSortColumn}
            />
          </nobr>
        </th>
        <th rowSpan={3}>
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
        <th rowSpan={2}>
          Paleo-
          <br />
          Hebrew
        </th>
        <th colSpan={2}>Aramaic-Biblical</th>
        <th rowSpan={2}>
          Modern
          <br />
          Cursive
        </th>
      </tr>
      <tr>
        <th>Serif</th>
        <th>Sans-serif</th>
      </tr>
    </thead>
  )
}

export default TableHeader
