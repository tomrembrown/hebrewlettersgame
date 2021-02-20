import React from 'react'
import TableCell from './TableCell'

const TableDataRow = ({ columnInfoArray, rowSpan, letter }) => {
  return (
    <tr key={letter.id}>
      {columnInfoArray.map((columnInfo) => (
        <TableCell
          key={columnInfo.columnName}
          columnInfo={columnInfo}
          rowSpan={rowSpan[columnInfo.columnName]}
          letter={letter}
        />
      ))}
    </tr>
  )
}

export default TableDataRow
