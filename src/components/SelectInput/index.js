import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const SelectInput = props => {
  let select

  let handleUserInput = () => {
    props.closeBubble()
    props.onChange(select.value)
  }

  let options = props.options.map(option => {
    return <option value={ option } key={ option }>{ option }</option>
  })

  return (
    <div className="select-input">
      <select required="required"
        onChange={ () => handleUserInput() }
        ref={ s => select = s }>
        <option value="-1">{ `Continents (All)` }</option>
        { options }
      </select>
    </div>
  )
}

SelectInput.defaultProps = {
  options: [],
  onChange: _=>_,
  closeBubble: _=>_
}

SelectInput.propTypes = {
  onChange: PropTypes.func,
  closeBubble: PropTypes.func,
  options: PropTypes.array
}

export default SelectInput
