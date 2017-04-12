import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const ALL = "-1"

class Categories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: ALL
    }
  }

  styleButton = index => {
    return `button ${index === this.state.selected? 'selected':''}`
  }

  choose = selected => {
    this.props.closeBubble()

    this.setState({ selected })
    this.props.onChange(selected)
  }

  render() {
    let options = this.props.options.map((option, index) => {
      return (
        <button className={ this.styleButton(index) }
          key={ option }
          onClick={ () => this.choose(index)}
        >
          { option }
        </button>
      )
    })

    return (
      <div className="categories">
        <button className={ this.styleButton(ALL) }
          onClick={ () => this.choose(ALL) }
        >
          { this.props.all }
        </button>
        { options }
      </div>
    )
  }
}

Categories.defaultProps = {
  onChange: _=>_,
  closeBubble: _=>_,
  options: [],
  all: "All",
  titlePosition: "inline"
}

Categories.propTypes = {
  onChange: PropTypes.func,
  closeBubble: PropTypes.func,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  all: PropTypes.string,
  titlePosition: PropTypes.oneOf(['top', 'inline']),
}

export default Categories
