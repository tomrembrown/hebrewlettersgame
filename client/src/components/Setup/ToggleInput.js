import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const ToggleInput = ({ display, name, changeSetup, isChecked }) => {
  return (
    <div onClick={() => changeSetup(name)} className="toggle-input">
      <label>
        <button>
          <FontAwesomeIcon icon={isChecked ? faToggleOn : faToggleOff} />
        </button>
        {display}
      </label>
    </div>
  )
}

export default ToggleInput
