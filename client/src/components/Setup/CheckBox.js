import React from 'react'
import './CheckBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const CheckBox = ({ display, name, changeSetup, isChecked }) => {
  return (
    <div onClick={() => changeSetup(name)}>
      <p>
        <button>
          <FontAwesomeIcon icon={isChecked ? faToggleOn : faToggleOff} />
        </button>
        {display}
      </p>
    </div>
  )
}

export default CheckBox
