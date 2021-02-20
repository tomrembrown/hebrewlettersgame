import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

const FilterButton = ({ column, changeSortColumn }) => {
  return (
    <button onClick={() => changeSortColumn(column)}>
      <FontAwesomeIcon icon={faSort} />
    </button>
  )
}

export default FilterButton
