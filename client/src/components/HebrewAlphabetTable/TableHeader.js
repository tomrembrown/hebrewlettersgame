import React from 'react'
import FilterButton from './FilterButton'

const TableHeader = ({ changeSortColumn }) => {
  return (
    <thead>
      <tr>
        <th colSpan={4} scope="colgroup">
          Character
        </th>
        <th className="nobreak" rowSpan={3}>
          Power{' '}
          <FilterButton column={'power'} changeSortColumn={changeSortColumn} />
        </th>
        <th className="nobreak" rowSpan={3} scope="col">
          Position{' '}
          <FilterButton
            column={'position'}
            changeSortColumn={changeSortColumn}
          />
        </th>
        <th className="nobreak" rowSpan={3} scope="col">
          Value{' '}
          <FilterButton column={'value'} changeSortColumn={changeSortColumn} />
        </th>
        <th className="nobreak" rowSpan={3} scope="col">
          Name{' '}
          <FilterButton column={'name'} changeSortColumn={changeSortColumn} />
        </th>
        <th className="nobreak" rowSpan={3} scope="col">
          Meaning{' '}
          <FilterButton
            column={'meaning'}
            changeSortColumn={changeSortColumn}
          />
        </th>
        <th className="nobreak" rowSpan={3} scope="col">
          Transliteration{' '}
          <FilterButton
            column={'transliteration'}
            changeSortColumn={changeSortColumn}
          />
        </th>
        <th className="nobreak" rowSpan={3} scope="col">
          Pronunciation{' '}
          <FilterButton
            column={'pronunciation'}
            changeSortColumn={changeSortColumn}
          />
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
