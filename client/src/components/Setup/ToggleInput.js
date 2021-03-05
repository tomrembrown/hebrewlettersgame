import React from 'react'
import './ToggleInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const ToggleInput = ({ display, name, changeSetup, isChecked }) => {
  return (
    <div onClick={() => changeSetup(name)} className="toggle-input">
      <p>
        <button>
          <FontAwesomeIcon icon={isChecked ? faToggleOn : faToggleOff} />
        </button>
        {display}
      </p>
    </div>
  )
}

export default ToggleInput
