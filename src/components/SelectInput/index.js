import React, { Component } from 'react'

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
  onChange: React.PropTypes.func,
  closeBubble: React.PropTypes.func,
  options: React.PropTypes.array
}

export default SelectInput
