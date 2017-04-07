import React, { Component } from 'react'

import './styles.scss'

class SelectInput extends Component {

  handleUserInput = () => {
    this.props.closeBubble()
    this.props.onChange(this.select.value)
  }

  render() {
    let options = []

    this.props.options.forEach(option => {
      options.push(<option value={ option } key={ option }>{ option }</option>)
    })

    return (
      <div className="select-input">
        <select required="required" onChange={ this.handleUserInput }
          ref={ select => this.select = select }>
          <option value="-1">{ `Continents (All)` }</option>
          { options }
        </select>
      </div>
    )
  }
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
