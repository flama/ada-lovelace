import React, { Component } from 'react'

import './styles.scss'

class SelectInput extends Component {
  render() {
    return (
      <div className="select-input">
        <select required="required">
          <option value="-1">Continents (All)</option>
        </select>
      </div>)
  }
}

export default SelectInput
