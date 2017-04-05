import React, { Component } from 'react'

import './styles.scss'

class SelectInput extends Component {

  handleUserInput = () => {
    this.props.onUserInput(this.select.value)
  }

  render() {
    let options = []

    this.props.options.forEach(option => {
      options.push(<option value={ option } key={ option }>{ option }</option>)
    })

    return (
      <div className="select-input">
        <select required="required" ref={ select => this.select = select }>
          <option value={ -1 }>{ `Continents (All)` }</option>
          { options }
        </select>
      </div>
    )
  }
}

SelectInput.defaultProps = {
  options: []
}

SelectInput.propTypes = {
  onUserInput: React.PropTypes.func,
  options: React.PropTypes.array
}

export default SelectInput
