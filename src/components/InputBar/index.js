import React, { Component } from 'react'

import './styles.scss'

class InputBar extends Component {

  constructor(props) {
    super(props)
    this.handleUserInput = this.handleUserInput.bind(this)
  }

  handleUserInput() {
    this.props.onUserInput() {
      this.filterText.value.split(' ')
    }
  }

  render() {
    return (
      <form>
        <input type="text"
               placeholder="Search..."
               ref={(input)=> this.filterText = input}
               onChange={this.handleUserInput}
               />
      </form>
    )
  }
}

export default InputBar
