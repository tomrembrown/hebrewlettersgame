import React from 'react'

const TableCell = ({ columnInfo, rowSpan, letter }) => {
  if (rowSpan === 0) return ''
  else {
    if (columnInfo.isImg) {
      return (
        <td rowSpan={rowSpan} className="modernCursiveHebrew">
          <img
            src={`../HebrewCursiveFont/${letter.modernCursive}.png`}
            alt={letter.modernCursive}
          />
        </td>
      )
    } else if (columnInfo.isHTML) {
      return (
        <td
          className={columnInfo.className}
          rowSpan={rowSpan}
          dangerouslySetInnerHTML={{ __html: letter[columnInfo.dataElement] }}
        ></td>
      )
    } else {
      return (
        <td className={columnInfo.className} rowSpan={rowSpan}>
          {letter[columnInfo.dataElement]}
        </td>
      )
    }
  }
}

export default TableCell
